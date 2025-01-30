require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
const PORT = 3000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userMessage }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.json({ reply: "Sorry, something went wrong!" });
    }
});

app.listen(PORT, () => {
    console.log(`Chatbot running on http://localhost:${PORT}`);
});

