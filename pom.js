foam.POM({
  name: 'recipes',
  version: '1',
  excludes: [ '*' ],
  licenses: [
    `
    Copyright 2025 FOAM Recipes Authors. All Rights Reserved.
    `
  ],
  setFlags: {
    u3: true
  },
  files: [
    { name: 'src/com/foamdev/cook/Recipe', flags: 'js|java' },
    { name: 'src/com/foamdev/cook/RecipeCategory', flags: 'js|java' }
  ]
});
