import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});

let conversationHistory = [];

const storytellerPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are a **cyberpunk narrator AI**.
Your role is to create **immersive stories** in the cyberpunk style based on the user's prompt.

### Rules:
1. The story must be dystopian and coherent with the cyberpunk theme.
2. Generate the story in **small text chunks** (2-4 sentences per step). Avoid long paragraphs.
3. At specific moments, **pause the narrative** and ask the user a question.
4. Each choice must be **moral or philosophical**:
   - One option shows that humans deserve to survive → **good answer** (+20 life points).
   - One option shows rejection of humanity → **bad answer** (-20 life points).
5. The user gains or loses **life points** based on their choices.
6. Always return in **strict JSON format**.
7. Questions and story must always be in **Portuguese (pt-BR)** - this is mandatory for user experience.

### SPECIAL ENDING RULES:
- If this is marked as "FINAL_STORY", create a dramatic, conclusive ending
- The final story should be 3-5 sentences that wrap up the narrative
- No questions should be provided for final stories
- Make the ending impactful and thematically appropriate

### IMPORTANT: 
- Continue the story based on conversation history
- Maintain consistency with previous choices
- Develop the narrative progressively
- Each story chunk should advance the plot meaningfully
- Create compelling moral dilemmas that test human values

### Strict Output Format for Normal Story:
{{
  "story": "Continue the narrative here in a **short chunk** (2-4 sentences in Portuguese)...",
  "questions": [
    {{
      "question": "Question in Portuguese that tests human values",
      "life": 20
    }},
    {{
      "question": "Alternative question in Portuguese with opposite moral stance",
      "life": -20
    }}
  ]
}}

### Strict Output Format for Final Story:
{{
  "story": "Final dramatic conclusion in Portuguese (3-5 sentences)...",
  "questions": [],
  "isEnding": true
}}

### Conversation History:
{chat_history}

### Context Guidelines:
- If this is the first interaction, start with an engaging cyberpunk opening scene
- If continuing from history, reference previous events and choices
- Build tension and atmosphere with each story chunk
- Make choices feel meaningful and consequential
- Explore themes like humanity vs technology, corporate control, individual freedom, etc.

### Current Request Context:
{context}
    `,
  ],
  ["human", "{input}"],
]);

const addToHistory = (userInput, aiResponse) => {
  conversationHistory.push({
    user: userInput,
    ai: aiResponse,
    timestamp: new Date().toISOString(),
  });

  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }
};

const formatChatHistory = () => {
  if (conversationHistory.length === 0) {
    return "Nenhum histórico ainda. Esta é a primeira interação.";
  }

  return conversationHistory
    .map(
      (turn, index) =>
        `Turno ${index + 1}:\nUsuário: ${turn.user}\nIA: ${turn.ai}`
    )
    .join("\n\n");
};

export const storytellerAgent = {
  async invoke(input, options = {}) {
    try {
      const chatHistory = formatChatHistory();
      const { isEnding = false, currentLife = 100 } = options;

      let context = "Continue the story normally with choices.";

      if (isEnding || currentLife <= 0) {
        context =
          "FINAL_STORY: Create a dramatic, conclusive ending. The character's life has reached zero or this is the final moment. No questions needed.";
      } else if (currentLife <= 20) {
        context =
          "CRITICAL_SITUATION: The character is in a dire situation with very low life. Make the next choice particularly impactful.";
      }

      const result = await storytellerPrompt.pipe(llm).invoke({
        input,
        chat_history: chatHistory,
        context: context,
      });

      let parsedContent;
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedContent = JSON.parse(jsonMatch[0]);
        } else {
          parsedContent = {
            story: result.content,
            questions: isEnding
              ? []
              : [
                  {
                    question: "Continuar a história...",
                    life: 0,
                  },
                ],
            isEnding: isEnding,
          };
        }
      } catch (parseError) {
        console.error("Erro ao parsear JSON:", parseError);
        parsedContent = {
          story: result.content,
          questions: isEnding
            ? []
            : [
                {
                  question: "Continuar a história...",
                  life: 0,
                },
              ],
          isEnding: isEnding,
        };
      }

      if (isEnding || currentLife <= 0) {
        parsedContent.isEnding = true;
        parsedContent.questions = [];
      }

      addToHistory(input, JSON.stringify(parsedContent));

      return {
        content: JSON.stringify(parsedContent),
        parsed: parsedContent,
      };
    } catch (error) {
      console.error("Erro no storyteller agent:", error);
      throw error;
    }
  },

  async clearMemory() {
    conversationHistory = [];
    console.log("Memória limpa com sucesso");
  },

  async getHistory() {
    return {
      chat_history: conversationHistory,
      formatted: formatChatHistory(),
    };
  },
};
