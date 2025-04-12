// streamParser.js
/**
 * Parses a streaming NDJSON response from the Ollama API
 * @param {Object} response - Axios response object with responseType: 'stream'
 * @returns {Promise<string>} - Promise resolving to the complete message
 */

const parseStreamingResponse = (response) => {
  let completeMessage = "";

  return new Promise((resolve, reject) => {
    let buffer = "";

    response.data.on("data", (chunk) => {
      const chunkString = chunk.toString();
      buffer += chunkString;

      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.trim() === "") continue;

        try {
          const jsonObject = JSON.parse(line);

          if (jsonObject.response) {
            completeMessage += jsonObject.response;
            process.stdout.write(jsonObject.response);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error, "Line:", line);
        }
      }
    });

    response.data.on("end", () => {
      resolve(completeMessage);
    });

    response.data.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = parseStreamingResponse;
