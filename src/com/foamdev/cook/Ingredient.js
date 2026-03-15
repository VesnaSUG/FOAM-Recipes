foam.CLASS({
  package: 'com.foamdev.cook',
  name: 'Ingredient',

  properties: [
    {
      class: 'Long',
      name: 'id',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO'
    },
    {
      class: 'String',
      name: 'name',
      required: true
    },
    {
      class: 'Enum',
      of: 'com.foamdev.cook.IngredientCategory',
      name: 'category'
    }
  ],

  methods: [
    function toSummary() {
      return this.name;
    }
  ]
})
