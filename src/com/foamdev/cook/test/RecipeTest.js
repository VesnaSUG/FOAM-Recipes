foam.CLASS({
  package: 'com.foamdev.cook.test',
  name: 'RecipeTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'com.foamdev.cook.*',
    'foam.dao.DAO',
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
        var recipe = new Recipe();
        test ( recipe.getId() == 0, "ID empty before create");
        recipe = (Recipe) ((DAO) x.get("recipeDAO")).put(recipe);
        test ( recipe.getId() > 0, "ID set after create");
      `
    }
  ]
});
