foam.CLASS({
  package: 'com.foamdev.cook',
  name: 'IngredientAmount',

  properties: [
    {
      class: 'Long',
      name: 'id',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO'
    },
    {
      class: 'Float',
      name: 'amount'
    },
    {
      class: 'Enum',
      of: 'com.foamdev.cook.Unit',
      name: 'unit'
    },
    {
      class: 'Reference',
      of: 'com.foamdev.cook.IngredientAmount',
      name: 'alternative',
      targetDAOKey: 'ingredientAmountDAO',
      value: 0
    }
  ],

  methods: [
    function toSummary() {
      return this.amount + ' ' + this.unit?.label;
    }
  ]
})
