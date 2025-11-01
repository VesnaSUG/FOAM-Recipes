foam.POM({
  name: 'recipes',
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
    version: '1.0.0',
    // javaMainArgs: 'spid:recipes'
  },
  tasks: [
    function javaManifest() {
      JAVA_MANIFEST_VENDOR_ID = 'cook.foamdev.com';
    }
  ]
});
