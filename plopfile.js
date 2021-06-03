module.exports = function (plop) {
  plop.setHelper("capital", function (text) {
    return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
  });

  plop.setHelper("camel", function (text) {
    return `${text.slice(0, 1).toLowerCase()}${text.slice(1)}`;
  });

  plop.setHelper("underscore", function (text) {
    return text
      .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
      .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);
  });

  plop.setGenerator("component", {
    description: "new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "what is the component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{underscore name}}/package.json",
        templateFile: "template/component/package.json",
      },
      {
        type: "add",
        path: "packages/{{underscore name}}/tsconfig.json",
        templateFile: "template/component/tsconfig.json",
      },
      {
        type: "add",
        path: "packages/{{underscore name}}/source/index.tsx",
        templateFile: "template/component/source/index.tsx",
      },
      {
        type: "add",
        path: "packages/{{underscore name}}/source/index.spec.tsx",
        templateFile: "template/component/source/index.spec.tsx",
      },
      {
        type: "add",
        path: "stories/{{underscore name}}.stories.tsx",
        templateFile: "template/component/index.stories.tsx",
      },
    ],
  });
};
