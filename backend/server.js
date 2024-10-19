const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

// Create an Express server
const app = express();
const port = 5000;

// Serve static files from the 'public' directory (for your Web App)
app.use(express.static(path.join(__dirname, "public")));

// Set up the Telegram bot
const bot = new TelegramBot("7153875194:AAEqxRUjNQAXRZbfmaxXeddzrs2bXcQDl_0", {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send a message with a button to open the Web App
  bot.sendMessage(
    chatId,
    "Welcome! Click the button below to open the Web App:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open Web App",
              // URL to open the Web App
              web_app: { url: "https://hackaton-bnb.vercel.app/" },
              // web_app: { url: "http://localhost:5000" }, // Update to localhost:5000 (or your hosted app)
            },
          ],
        ],
      },
    }
  );
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const data = msg?.web_app_data?.data || "No data"; // Make sure to check for web_app_data

  bot.sendMessage(chatId, `Received data: ${data}`);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
