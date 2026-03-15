foam.POM({
  name: 'recipe',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: 'Recipe',                  flags: 'js|java' },
    { name: 'RecipeCategory',          flags: 'js|java' },
    { name: 'StepCategory',            flags: 'js|java' },
    { name: 'Unit',                    flags: 'js|java' },
    { name: 'IngredientCategory',      flags: 'js|java' },
    { name: 'Ingredient',              flags: 'js|java' },
    { name: 'IngredientAmount',        flags: 'js|java' },
    { name: 'RecipeStep',              flags: 'js|java' },
    { name: 'Relationships',           flags: 'js|java' }
  ]
});
