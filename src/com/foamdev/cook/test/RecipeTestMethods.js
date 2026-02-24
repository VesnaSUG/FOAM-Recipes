foam.CLASS({
  package: 'com.foamdev.cook.test',
  name: 'RecipeTestMethods',
  extends: 'foam.core.test.JSTest',

  requires: [ 'com.foamdev.cook.Recipe' ],

  methods: [
    {
      name: 'runTest',
      args: ['Context x'],
      code: function runTest(x) {
        // debugger;
        let recipe = this.Recipe.create();
        x.test(recipe.toSummary() == "", 'Recipe toSummary is initially empty');

        recipe.name = 'Fried chicken';
        x.test(recipe.toSummary() == "Fried chicken", 'Recipe toSummary is equal to name');
      }
    }
  ]
});