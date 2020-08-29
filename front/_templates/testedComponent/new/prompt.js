const { camelize } = require("inflection");
// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const questions = [
  {
    type: "input",
    name: "componentName",
    message: "What's the component name?",
    format: camelize,
    result: camelize,
  },
  {
    type: "confirm",
    name: "isCommon",
    message: "Is this a common component?",
    initial: true,
  },
];

const contextualQuestions = [
  {
    type: "input",
    name: "contextName",
    message: "What's the context",
    format: (value) => camelize(value, true),
    result: (value) => camelize(value, true),
  },
];

module.exports = {
  prompt: async ({ prompter, args }) => {
    let answers = await prompter.prompt(questions);
    answers.creationPath = `src/components/commons/${answers.componentName}`;
    if (!answers.isCommon) {
      const contextualAnswers = await prompter.prompt(contextualQuestions);
      answers = { ...answers, ...contextualAnswers };
      answers.creationPath = `src/components/contextual/${answers.contextName}/${answers.componentName}`;
    }
    console.log(JSON.stringify({ answers }, null, 4));
    return answers;
  },
};

// TODO perguntar se é commons ou contextuakl
// Entrar na pasta se possivekl
// Nao permitir criar componente repetido
