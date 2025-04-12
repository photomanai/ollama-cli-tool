const inquirer = require("inquirer");

const workTypes = {
  "React developer": {
    followUpQuestions: [
      {
        type: "list",
        name: "lang",
        message: "Which language would you like to use?",
        choices: ["typescript", "javascript"],
      },
      {
        type: "list",
        name: "style",
        message: "Which style want to use?",
        choices: [
          "Styled Components",
          "Emotion",
          "Chakra UI",
          "Ant Design",
          "Bulma",
          "Bootstrap",
          "Tailwind CSS",
          "Material UI",
          "Tachyons",
          "Twin.macro",
          "Just css",
        ],
      },
      {
        type: "confirm",
        name: "useStateManagement",
        message: "Would you like to use state management?",
        default: false,
      },
      {
        type: "list",
        name: "stateManagement",
        message: "Select state management library:",
        choices: ["Redux", "Zustand", "Jotai", "Recoil", "Context API"],
        when: (answers) => answers.useStateManagement,
      },
    ],
    createPrompt: (basePrompt, answers) => {
      let prompt = `You are a professional React developer. You create modern design components with a clean and efficient approach. You use ${answers.lang} and style with ${answers.style}.`;

      if (answers.useStateManagement) {
        prompt += ` You implement state management using ${answers.stateManagement}.`;
      }

      prompt += ` You write only code and remain silent—do not write anything else. Now do this: ${basePrompt}`;
      return prompt;
    },
  },
  "Backend developer": {
    followUpQuestions: [
      {
        type: "list",
        name: "technology",
        message: "Which backend technology would you like to use?",
        choices: [
          "Node.js/Express",
          "Python/Flask",
          "Python/Django",
          "Go",
          "Java/Spring Boot",
          "PHP/Laravel",
          "Ruby on Rails",
        ],
      },
      {
        type: "list",
        name: "database",
        message: "Which database would you like to use?",
        choices: [
          "MongoDB",
          "PostgreSQL",
          "MySQL",
          "SQLite",
          "Redis",
          "Firebase",
        ],
      },
    ],
    createPrompt: (basePrompt, answers) => {
      return `You are a professional backend developer specializing in ${answers.technology} with ${answers.database}. Create clean, efficient, and well-documented code. Focus only on the code implementation. Now do this: ${basePrompt}`;
    },
  },
  "UI/UX designer": {
    followUpQuestions: [
      {
        type: "list",
        name: "designTool",
        message: "Which design tool workflow would you like?",
        choices: ["Figma", "Adobe XD", "Sketch"],
      },
      {
        type: "list",
        name: "style",
        message: "What design style do you prefer?",
        choices: [
          "Minimalist",
          "Material Design",
          "Neumorphism",
          "Glassmorphism",
          "Flat Design",
          "Custom",
        ],
      },
    ],
    createPrompt: (basePrompt, answers) => {
      return `You are a professional UI/UX designer who creates modern interfaces using ${answers.designTool} with a ${answers.style} style approach. Provide detailed design descriptions and considerations. Now design this: ${basePrompt}`;
    },
  },
  "Just ask question": {
    followUpQuestions: [
      {
        type: "list",
        name: "responseStyle",
        message: "How would you like the response?",
        choices: [
          "Detailed explanation",
          "Brief summary",
          "Step-by-step guide",
          "Simple answer",
        ],
      },
    ],
    createPrompt: (basePrompt, answers) => {
      const styleMap = {
        "Detailed explanation":
          "Provide a comprehensive and detailed explanation",
        "Brief summary": "Give a concise summary",
        "Step-by-step guide": "Explain in clear step-by-step instructions",
        "Simple answer": "Answer directly and simply",
      };

      return `${
        styleMap[answers.responseStyle]
      } to the following question: ${basePrompt}`;
    },
  },
};

const question = async () => {
  try {
    const initialAnswers = await inquirer.default.prompt([
      {
        type: "list",
        name: "llm",
        message: "Which LLM model would you like to use?",
        choices: [
          "llama3.2",
          "deepseek-r1:7b",
          "phi3:14b",
          "mixtral",
          "gemma2:9b",
        ],
      },
      {
        type: "list",
        name: "work",
        message: "What would you like to do?",
        choices: Object.keys(workTypes),
      },
      {
        type: "input",
        name: "prompt",
        message: "Prompt: ",
        validate: (input) =>
          input.trim() !== "" ? true : "Prompt cannot be empty",
      },
    ]);

    const selectedWork = workTypes[initialAnswers.work];
    let followUpAnswers = {};

    if (selectedWork && selectedWork.followUpQuestions) {
      followUpAnswers = await inquirer.default.prompt(
        selectedWork.followUpQuestions
      );
    }

    let finalPrompt = initialAnswers.prompt;
    if (selectedWork && selectedWork.createPrompt) {
      finalPrompt = selectedWork.createPrompt(
        initialAnswers.prompt,
        followUpAnswers
      );
    }

    const temperature = await inquirer.default.prompt([
      {
        type: "list",
        name: "value",
        message: "Set creativity level (temperature):",
        choices: [
          { name: "Very predictable (0.1)", value: 0.1 },
          { name: "Conservative (0.3)", value: 0.3 },
          { name: "Balanced (0.5)", value: 0.5 },
          { name: "More creative (0.7)", value: 0.7 },
          { name: "Very creative (0.9)", value: 0.9 },
        ],
        default: 2,
      },
    ]);

    const result = {
      llm: initialAnswers.llm,
      prompt: finalPrompt,
      temperature: temperature.value,
      options: {
        ...followUpAnswers,
        workType: initialAnswers.work,
      },
    };

    return result;
  } catch (error) {
    console.error("Error in prompt process:", error);
    throw error;
  }
};

module.exports = question;
