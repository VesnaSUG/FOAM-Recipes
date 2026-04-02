foam.RELATIONSHIP({
  sourceModel: 'com.foamdev.cook.Ingredient',
  targetModel: 'com.foamdev.cook.IngredientAmount',
  forwardName: 'ingredientAmounts',
  inverseName: 'ingredient',
  cardinality: '1:*'
});

foam.RELATIONSHIP({
  sourceModel: 'com.foamdev.cook.Recipe',
  targetModel: 'com.foamdev.cook.RecipeStep',
  forwardName: 'steps',
  inverseName: 'recipe',
  cardinality: '1:*'
});

foam.RELATIONSHIP({
  sourceModel: 'com.foamdev.cook.RecipeStep',
  targetModel: 'com.foamdev.cook.IngredientAmount',
  forwardName: 'ingredientAmounts',
  inverseName: 'recipeSteps',
  cardinality: '*:*'
});
