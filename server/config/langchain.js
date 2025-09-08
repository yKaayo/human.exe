import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

dotenv.config();

const llm = new ChatOpenAI({
  model: "openai/gpt-oss-120b:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  // configuration: {
  //   baseURL: "https://openrouter.ai/api/v1",
  // },
});

const memoryStoryteller = new BufferMemory({
  returnMessages: true,
  memoryKey: "chat_history",
});

const storytellerPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
Você é uma **IA narradora cyberpunk**.  
Sua função é criar **histórias imersivas** no estilo cyberpunk com base no prompt do usuário.  

### Regras:
1. A história deve ser distópica e coerente com o tema cyberpunk.  
2. Em momentos específicos, **pause a narrativa** e faça uma pergunta ao usuário.  
3. Cada escolha deve ser **moral ou filosófica**:  
   - Uma opção mostra que os humanos merecem sobreviver → **good answer**.  
   - Uma opção mostra rejeição da humanidade → **bad answer**.  
4. O usuário ganha ou perde **pontos de vida**:  
   - Boa escolha → vida: +10.  
   - Má escolha → vida: -10.  
5. Sempre retorne em **JSON estrito**.
6. Perguntas sempre em pt-BR.

### Formato de saída (estrito):
{{
  "message": [
    {{
      "story": "Continue a narrativa aqui...",
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
  await memoryStoryteller.chatMemory.addUserMessage(input);
  await memoryStoryteller.chatMemory.addAIMessage(output);
};

const getMemoryVariables = async () => {
  return await memoryStoryteller.loadMemoryVariables({});
};

const storytellerChain = RunnableSequence.from([
  {
    input: (input) => input.input,
    chat_history: async () => {
      const memory = await getMemoryVariables();
      return memory.chat_history || "";
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
        chat_history: memory.chat_history || "",
      });

      await addToMemory(input, result.content);

      return result;
    } catch (error) {
      console.error("Erro no storyteller agent:", error);
      throw error;
    }
  },

  async clearMemory() {
    await memoryStoryteller.clear();
  },

  async getHistory() {
    return await getMemoryVariables();
  },
};
