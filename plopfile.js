module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "apps/web2/src/components/{{name}}/{{name}}.module.css",
      },
      {
        type: "add",
        path: "apps/web2/src/components/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/Component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "apps/web2/src/components/{{name}}/index.ts",
        templateFile: "plop-templates/Component/index.ts.hbs",
      },
    ],
  })
}
