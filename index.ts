import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { extractBodyContent, extractWeData } from "./service/scraperService";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.post("/scrape", async (req, res) => {
  try {
    const { url, prompt } = req.body;

    const response = await axios.get(url);
    const text = response.data;
    const ai_response = await extractWeData(prompt, text);
    return res.json({ text, ai_response });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
