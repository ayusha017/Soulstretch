const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());


app.use(express.json());

const prompts = {
    "hello": "Hi! Please tell me your problem",
    "why is yoga important": "Yoga is important because it offers numerous physical and mental health benefits, including improved flexibility, strength, balance, reduced stress and anxiety, enhanced mental clarity, and better sleep, promoting overall well-being",
    "okay": "Thank you!"
};

app.post('/chat', (req, res) => {
    if (!req.body.message) {
        return res.status(400).json({ reply: "Error: No message received." });
    }

    const userMessage = req.body.message.toLowerCase();
    let reply = "I didn't understand that. Please drop a mail.";

    for (const prompt in prompts) {
        if (userMessage.includes(prompt)) {
            reply = prompts[prompt];
            break;
        }
    }

    res.json({ reply });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
