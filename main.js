#!/usr/bin/env node

const axios = require("axios");
const parseStreamingResponse = require("./streamParser");
const question = require("./ask");

const URL = "http://localhost:11434/api/generate";

const output = async (llm, prompt) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const payload = {
      model: llm,
      prompt: prompt,
    };

    const response = await axios.post(URL, payload, {
      headers,
      responseType: "stream",
    });

    console.log("\n--- LLM Response ---\n");

    return await parseStreamingResponse(response);
  } catch (e) {
    console.error("Error:", e.message);
    if (e.response) {
      console.error("Response status:", e.response.status);
      console.error("Response data:", e.response.data);
    }
  }
};

const run = async () => {
  try {
    const result = await question();
    const response = await output(result.llm, result.prompt);
    console.log("\n\n--- Response Complete ---");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

run();
