// Take html string and extract out every piece of text with element tags stripped out
// Connect text string with element
// Store in vector shit or something
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { JSDOM } from "jsdom";
import dotenv from "dotenv";
dotenv.config();

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo-0125",
});

export function extractBodyContent(htmlDocument: string): string {
  // Parse the HTML document with jsdom
  const dom = new JSDOM(htmlDocument);
  // Get the content inside the <body> tag
  const bodyContent = dom.window.document.body.innerHTML;

  return bodyContent;
}

export const extractWeData = async (prompt: string, bodyContent: string) => {
  const messages = [
    new SystemMessage(
      "You are an expert webscraping assistant. You'll receive html bodys and extract data based on users request. If you cannot find the specified data, respond that you do not have the right info"
    ),
    new HumanMessage(
      `Based on the following html body: ${bodyContent}, answer the following question: ${prompt}`
    ),
  ];

  const res = await chatModel.invoke(messages);
  return res.content;
};
