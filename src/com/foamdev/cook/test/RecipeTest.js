foam.CLASS({
  package: 'com.foamdev.cook.test',
  name: 'RecipeTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'com.foamdev.cook.*',
    'foam.dao.DAO',
    'foam.lang.X',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
        var recipe = new Recipe();
        test ( SafetyUtil.isEmpty(recipe.getId()), "ID empty before create");
        recipe = (Recipe) ((DAO) x.get("recipeDAO")).put(recipe);
        test ( ! SafetyUtil.isEmpty(recipe.getId()), "ID set after create");
      `
    }
  ]
});
