const fs = require("fs");
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [],
  webpackFinal: (config) => {
    config.module.rules[0].use[0].options.overrides.pop();
    config.plugins = config.plugins.filter(
      (c) => c.name !== "React Docgen Typescript Plugin"
    );
    return config;
  },
};
