# Ollama CLI Tool

A command-line interface tool for interacting with locally running Ollama models.

## Overview

This tool provides an interactive CLI experience for generating text with Ollama's local large language models. It supports different work modes including React development, backend development, and UI/UX design, with customized prompting for each purpose.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Ollama](https://ollama.ai/download) must be installed and running on your machine

## Installation

### Local Installation

1. Clone this repository or download the source files
```bash
git clone https://github.com/photomanai/ollama-cli-tool.git
cd ollama-cli-tool
```

2. Install dependencies
```bash
npm install
```

3. Make the main script executable (on Unix-based systems)
```bash
chmod +x main.js
```

### Global Installation (Linux, macOS, WSL)

You can install the tool globally to use the `ai` command from anywhere:

1. Clone and navigate to the repository
```bash
git clone https://github.com/photomanai/ollama-cli-tool.git
cd ollama-cli-tool
```

2. Install dependencies
```bash
npm install
```

3. Create a global symlink
```bash
npm link
```

Now you can run the tool from anywhere using:
```bash
ai
```

## Usage

If installed locally, start the tool by running:
```bash
./main.js
```

Or:
```bash
node main.js
```

If installed globally, simply use:
```bash
ai
```

Follow the interactive prompts to:
1. Select an LLM model
2. Choose the type of work you want to do 
3. Enter your prompt/request
4. Answer additional questions based on your work type
5. See the generated response stream in real-time

## Features

- Real-time streaming response display
- Multiple LLM model support (llama3.2, deepseek-r1:7b, phi3:14b, mixtral, gemma2:9b)
- Specialized modes:
  - React Developer: Generate React components with customizable language and styling options
  - Backend Developer: Create backend code with selectable technology stack and database
  - UI/UX Designer: Get design descriptions with different style approaches
  - Question Answering: Get answers with adjustable response styles
- Adjustable temperature (creativity) settings
- Modular design for easy extension
- Global command-line access with `ai` command (when installed globally)

## Project Structure

- `main.js` - The entry point for the application
- `question.js` - Contains the interactive CLI question logic
- `streamParser.js` - Handles streaming response parsing from Ollama API
- `package.json` - Contains project configuration including the `bin` field for global command

## Setting Up as a Global Command

To enable the global `ai` command, make sure your `package.json` includes:

```json
{
  "name": "ollama-cli-tool",
  "bin": {
    "ai": "./main.js"
  },
  "dependencies": {
    ...
  }
}
```

## Extending the Tool

To add a new work type, update the `workTypes` object in `question.js` with:
1. A new key for your work type
2. `followUpQuestions` array with any additional questions
3. `createPrompt` function to format the final prompt based on answers

## Technical Notes

- The tool communicates with Ollama's API running at http://localhost:11434/api/generate
- Streaming responses are parsed in real-time to show generation progress
- The default endpoint can be configured in `main.js` if necessary

## Requirements

- Ollama must be running on your machine before using this tool
- You must have the models you want to use already pulled in Ollama
- For the global command to work, you need proper permissions to create symlinks

## Troubleshooting

If you encounter issues:

1. Make sure Ollama is running (check with `ps aux | grep ollama`)
2. Verify you have the models installed (run `ollama list`)
3. Check network connectivity to the Ollama API endpoint
4. Look for error messages in the console output
5. If the global command doesn't work, check npm link permissions and Node.js installation

## License

MIT
