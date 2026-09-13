const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: message
        });

        res.json({
            reponse: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            reponse: "Erreur avec le serveur."
        });
    }
});

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
