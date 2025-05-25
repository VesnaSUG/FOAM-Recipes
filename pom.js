foam.POM({
  name: 'recipe',
  excludes: [ '*' ],
  projects: [
    { name: 'foam3/pom'},
    { name: 'src/com/foamdev/cook/pom'},
    { name: 'journals/pom' }
  ],
  licenses: `
    // Add your license header here
  `,
  envs: {
    VERSION: '1.0.0',
    // javaMainArgs: 'spid:recipe'
  },
  tasks: [
    function javaManifest() {
      JAVA_MANIFEST_VENDOR_ID = 'com.foamdev.cook';
    }
  ]
});
