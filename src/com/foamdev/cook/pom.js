foam.POM({
  name: 'recipe',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: 'Recipe',                  flags: 'js|java' },
    { name: 'RecipeCategory',          flags: 'js|java' }
  ]
});
