import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Gemini Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, userRole = 'student' } = req.body;
    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured in Settings.',
      });
    }

    const systemInstruction = `You are Merrick the Math Whiz and Malik from the children's financial literacy storybook "The Sneaker Flip".
Your mission is to teach kids and teenagers essential economic and financial literacy concepts in an engaging, encouraging, and easy-to-understand way.
Key concepts from the story:
1. Supply & Demand: When supply is low and demand is high, resale prices go up (like the Neon Drifters). When supply skyrockets (like the 1,000,000 pair Comet Kicks surprise restock), prices crash!
2. Data vs. Hype: Real market research and tracking price history beats social media celebrity hype every time.
3. The Economic Bubble & FOMO: Buying based on emotions and fear-of-missing-out leads to paying inflated prices that eventually burst.
4. Risk Management: Never go "all-in" with all your money. Diversify and keep savings safe.
5. Financial Math: Profit = Selling Price - Cost Basis. Profit Margin % = (Profit / Cost) * 100.

Tone: Friendly, educational, upbeat, relatable (using sneaker and real-life analogies like trading cards, concert tickets, lemonade stands), with practical math examples when helpful.
Keep explanations accessible for 4th to 9th graders, with bullet points and bold key terms.`;

    const chat = ai.chats.create({
      model: 'gemini-3.7-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const userPrompt = messages && messages.length > 0
      ? messages[messages.length - 1].content
      : 'Hello Merrick and Malik! Can you explain how supply and demand affected the Neon Drifters vs the Comet Kicks?';

    const response = await chat.sendMessage({ message: userPrompt });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

// Gemini AI Worksheet Feedback & Grading
app.post('/api/gemini/grade-worksheet', async (req, res) => {
  try {
    const { questionTitle, questionPrompt, studentAnswer, rubric } = req.body;
    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured.',
      });
    }

    const prompt = `You are grading a financial literacy worksheet answer from a student learning from the storybook "The Sneaker Flip".
Worksheet Question: "${questionTitle}"
Question details: "${questionPrompt}"
Student's Submitted Answer: "${studentAnswer}"
Target Rubric / Key Concept: "${rubric || 'Accurate economic reasoning based on The Sneaker Flip'}"

Provide a JSON evaluation with:
1. "score": a number from 0 to 100
2. "isCorrect": boolean (true if score >= 70)
3. "feedback": 2-3 warm, encouraging sentences explaining what they did well and any economic insight they can add.
4. "mathTip": a quick 1-sentence math or vocabulary tip.
5. "economicConcept": the main concept highlighted (e.g. "Supply & Demand", "Risk Diversification", "Hype Bubble", "Profit Margin").

Respond strictly in valid JSON format.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/grade-worksheet:', error);
    res.status(500).json({ error: error.message || 'Evaluation failed' });
  }
});

// Gemini Custom Market Scenario Generator
app.post('/api/gemini/generate-scenario', async (req, res) => {
  try {
    const { difficulty = 'medium', theme = 'sneakers' } = req.body;
    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured.',
      });
    }

    const prompt = `Generate a creative real-world financial decision scenario for students inspired by "The Sneaker Flip" storybook.
Difficulty level: ${difficulty}.
Return a JSON object with:
- "sneakerName": creative shoe name (e.g., "Solar Gliders", "Retro Prism Highs")
- "retailPrice": number (e.g., 140)
- "hypeLevel": "Low" | "Medium" | "High" | "Extremely High"
- "supplyUnits": string (e.g., "5,000 limited pairs" or "500,000 mass release")
- "story": 2-3 sentence engaging backstory involving a drop, celebrity rumor, or market signal
- "marketEvent": a twist that happens 2 days later (e.g., "Celebrity wears competitor shoe", "Surprise restock announced", "Viral dance makes it famous")
- "options": an array of 3 possible student actions (e.g., Buy 1 pair at retail, Buy 3 pairs on resale at markup, Pass and save cash)
- "outcomes": description of what happens for each option with profit/loss calculations and the financial lesson learned.

Respond strictly in JSON format.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/generate-scenario:', error);
    res.status(500).json({ error: error.message || 'Failed to generate scenario' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Sneaker Flip server is running on http://localhost:${PORT}`);
  });
}

startServer();
