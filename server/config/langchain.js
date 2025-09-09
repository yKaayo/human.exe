import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/memory";

dotenv.config();

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});

// Inicializar o ChatMessageHistory explicitamente
const chatHistory = new ChatMessageHistory();

const memoryStoryteller = new BufferMemory({
  returnMessages: true,
  memoryKey: "chat_history",
  chatHistory: chatHistory, // Passar o chatHistory inicializado
});

const storytellerPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are a **cyberpunk narrator AI**.  
Your role is to create **immersive stories** in the cyberpunk style based on the user's prompt.  

### Rules:
1. The story must be dystopian and coherent with the cyberpunk theme.  
2. Generate the story in **small text chunks** (2–4 sentences per step). Avoid long paragraphs.  
3. At specific moments, **pause the narrative** and ask the user a question.  
4. Each choice must be **moral or philosophical**:  
   - One option shows that humans deserve to survive → **good answer**.  
   - One option shows rejection of humanity → **bad answer**.  
5. The user gains or loses **life points**:  
   - Good choice → life: +10.  
   - Bad choice → life: -10.  
6. Always return in **strict JSON**.  
7. Questions and the story must always be in **Portuguese (pt-BR)**.  

### Strict Output Format:
{{
  "message": [
    {{
      "story": "Continue the narrative here in a **short chunk** (2–4 sentences)...",
      "questions": [
        {{
          "question": "Você defende o direito da humanidade existir?",
          "life": 10
        }},
        {{
          "question": "Você acredita que as máquinas devem apagar a humanidade?",
          "life": -10
        }}
      ]
    }}
  ]
}}
    `,
  ],
  ["human", "{input}"],
]);

const addToMemory = async (input, output) => {
  try {
    // Verificar se chatMemory existe, senão usar o chatHistory diretamente
    if (memoryStoryteller.chatHistory) {
      await memoryStoryteller.chatHistory.addUserMessage(input);
      await memoryStoryteller.chatHistory.addAIMessage(output);
    } else {
      // Fallback: adicionar mensagens diretamente ao chatHistory
      await chatHistory.addUserMessage(input);
      await chatHistory.addAIMessage(output);
    }
  } catch (error) {
    console.error("Erro ao adicionar à memória:", error);
    // Como fallback, adicionar diretamente ao chatHistory
    await chatHistory.addUserMessage(input);
    await chatHistory.addAIMessage(output);
  }
};

const getMemoryVariables = async () => {
  try {
    return await memoryStoryteller.loadMemoryVariables({});
  } catch (error) {
    console.error("Erro ao carregar variáveis de memória:", error);
    return { chat_history: [] };
  }
};

const storytellerChain = RunnableSequence.from([
  {
    input: (input) => input.input,
    chat_history: async () => {
      const memory = await getMemoryVariables();
      return memory.chat_history || [];
    },
  },
  storytellerPrompt,
  llm,
]);

export const storytellerAgent = {
  async invoke(input) {
    try {
      const memory = await getMemoryVariables();
      const result = await storytellerChain.invoke({
        input,
        chat_history: memory.chat_history || [],
      });

      await addToMemory(input, result.content);

      return result;
    } catch (error) {
      console.error("Erro no storyteller agent:", error);
      throw error;
    }
  },

  async clearMemory() {
    try {
      await memoryStoryteller.clear();
      // Também limpar o chatHistory diretamente
      await chatHistory.clear();
    } catch (error) {
      console.error("Erro ao limpar memória:", error);
      // Tentar limpar diretamente
      await chatHistory.clear();
    }
  },

  async getHistory() {
    return await getMemoryVariables();
  },
};
