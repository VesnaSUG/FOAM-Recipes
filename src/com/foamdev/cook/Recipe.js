foam.CLASS({
  package: 'com.foamdev.cook',
  name: 'Recipe',
  properties: [
    {
      class: 'Long',
      name: 'id',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO',
    },
    {
      class: 'String',
      name: 'name',
      required: true
    },
    {
      class: 'String',
      name: 'description'
    },
    {
      class: 'Enum',
      name: 'category',
      of: 'com.foamdev.cook.RecipeCategory',
      value: 'OTHER'
    },
    {
      class: 'String',
      name: 'source'
    }
  ],
  methods: [
    function toString() {
      return this.name;
    },
    function getTotalTime() {
      return this.prepTime + this.cookTime;
    }
  ]
});

