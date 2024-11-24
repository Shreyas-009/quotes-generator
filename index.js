const express = require("express");
const PORT = 8080;
const rateLimit = require("express-rate-limit");
const quotes = require("./quotes.json");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Rate limit exceeded. Try again later." },
});

app.use(limiter);

app.get("/", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { type, ...quoteWithoutType } = quotes[randomIndex];
  res.json(quoteWithoutType);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 
