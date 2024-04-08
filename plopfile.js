module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/frontend/src/components/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'apps/frontend/src/components/{{name}}/index.ts',
        templateFile: 'plop-templates/Component/index.ts.hbs',
      },
    ],
  }),
  plop.setGenerator('ui-component', {
    description: 'Create a UI component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/frontend/src/components/ui/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'apps/frontend/src/components/ui/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop-templates/Component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'apps/frontend/src/components/ui/{{name}}/index.ts',
        templateFile: 'plop-templates/Component/index.ts.hbs',
      },
    ],
  }),
  plop.setGenerator('service', {
    description: 'Create a service',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your service name?'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/backend/src/services/{{name}}Service/{{pascalCase name}}Service.ts',
        templateFile: 'plop-templates/Service/Service.ts.hbs',
      },
      {
        type: 'add',
        path: 'apps/backend/src/services/{{name}}Service/{{pascalCase name}}Service.test.ts',
        templateFile: 'plop-templates/Component/Component.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'apps/backend/src/services/{{name}}Service/index.ts',
        templateFile: 'plop-templates/Service/index.ts.hbs',
      },
    ],
  });
};