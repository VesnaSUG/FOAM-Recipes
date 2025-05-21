# Intro

This tutorial will guide you through creating of a new project using FOAM. FOAM stands for "Feature-Oriented Active Modeller", and it is a framework converting high-level software specifications, called "models", into useful executable software components, called "features". FOAM is cross-language and cross-platform, meaning that it can be used as JS, Java and Swift, and for both client and server software.

The tutorial will cover the initial setup and an application creation by creating a cooking recipe database. The tutorial assumes that you
already have java, nodejs and maven installed in your environment. If you need to install these, helpful tips can be found in the [FOAM installation instructions][foam-install]. Note though that you do not need to build FOAM in isolation for the tutorial. We will do this step when we add FOAM as a git sub-module to our project.

By following this tutorial you will learn to:
1. setup your project for FOAM development
1. define models for a recipe database
1. TODO ...

This tutorial is best suited for FOAM beginners as well as experienced FOAM developers who wish to understand the
underlying architecture in more depth.

# Initial Setup

Since we are starting from scratch, our first step is to log into an appropriate github and create a new repository named FOAM-Recipes, then clone it in the development environment. In our case we created a public repository [FOAM-Recipes][foam-recipes] and cloned into the current local directory:

```
git clone git@github.com:VesnaSUG/FOAM-Recipes.git
```

One of the conveniences of FOAM is that there are no external dependencies. All the code is at the tip of your fingers and you can step through it
as needed. For that reason, FOAM is included in your project as a GIT sub-module. Therefore our next step is to go to the [FOAM Repository][foam-repo] and grab the repository's URL, then link to it as a sub-module for our project:

```
cd FOAM-Recipes
git submodule add git@github.com:kgrgreer/foam3.git
```

## Create Auxiliary Files and Directories

As the first step let's make sure that we are setup up to commit the code to our github repo without polluting it with byproduct files by creating a .gitignore file with the following content:

```
*#*
*~
.DS_Store
build
node_modules
npm-debug.log
pom.xml
```

Then create a build.sh file for the build alias that will save us some typing while running FOAM builds. The file should have the following content:

```
#!/bin/bash
node foam3/tools/build.js "$@"
```

And then adjust the file permission to make it executable:

```
chmod +x build.sh
```

The next step is to create a Project Object Model (POM) file for our project, named pom.js. Note that this file is a meta project file that will be used by FOAM to generate the traditional POM.xml used by build tools. The file should have the following content:

```
foam.POM({
  name: 'recipes',
  version: '1',
  excludes: [ 'build', 'node_modules', 'deployment', 'foam3' ],
  licenses: [
    `
    Copyright 2025 FOAM Recipes Authors. All Rights Reserved.
    `
  ],
  projects: [
    { name: 'foam3/pom' }
  ], 
  setFlags: {
    u3: true
  },
  files: [
  ],
  javaFiles: [
  ]
});

```

Let's look briefly at each of the elements in the pom file:

<table>
<thead>
<tr>
<th width=20%>Name</th>
<th width=80%>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td width=20% align="left">name</td>
<td width=80% align="left">The name of your project. Will be used for naming certain files and directories created by the build process.</td>
</tr>
<tr>
<td width=20% align="left">version</td>
<td width=80% align="left">The version that will be attached to some built files. Should be updated when you make a new release so that old cached code isn't used.</td>
</tr>
<tr>
<td width=20% align="left">excludes</td>
<td width=80% align="left">By default the FOAM build will recurse sub-directories, unless they are included in excludes. The directories listed
are standard directories that we want to FOAM build to ignore.</td>
</tr>
<tr>
<td width=20% align="left">licenses</td>
<td width=80% align="left">An array of license notifications. When the build creates a deployment .js file, it will include all declared licenses at the top.</td>
</tr>
<tr>
<td width=20% align="left">projects</td>
<td width=80% align="left">Points to pom files for other projects or sub-projects. At the very minimum, you need to include the foam3/pom to include foam. You can break your project into multiple pom files, or just have one top-level pom.</td>
</tr>
<tr>
<td width=20% align="left">setFlags</td>
<td width=80% align="left">Used to enable or disable build flags. These can be used to enable or disable the compilation of flagged files. You could use this to enable or disable java, swift or testing features, for example. In this example we're enabling the UI library called 'U3'. If we hadn't included "u3: true" FOAM would have compiled the U2 GUI library instead.</td>
</tr>
<tr>
<td width=20% align="left">files</td>
<td width=80% align="left">Lists model files to be included in your build. The ".js" extension is not included.</td>
</tr>
<tr>
<td width=20% align="left">javaFiles</td>
<td width=80% align="left">Lists .java files to be compiled. The ".java" extension is not included.</td>
</tr>
</tbody>
</table>



You can learn more on the pom file and possible customization options by reading the full [FOAM POM specification][foam-pom-spec].

The last step in this section is to assure that the needed helper directories /opt and /opt/recipe directories exist and you are set as the owner:

```
sudo chown -R $USER /opt
sudo chown -R $USER /opt/recipe
```

# Create Recipe Model

The key entity for a recipe database is Recipe, so let's start by creating a FOAM model for it. Create a file Recipe.js and place it in the src/com/foamdev/cook directory that you need to create, and then type in the following:

```
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
```
Here we defined a model for class <code>Recipe</code> that will be in the <code>com.foamdev.cook</code> package with several properties and a few sample methods.
Most of the properties are simple to decipher, except <code>id</code> and <code>category</code>, so let's double click in those two.

The values for the <code>id</code> are autogenerated, unique ids for each instance of this class, therefore we are giving FOAM the instruction
to omit it from the create screen for this class by setting <code>createVisibility</code> to <code>HIDDEN</code>. Since the property is not editable, 
we also adjusted <code>updateVisibility</code> to read-only.

The other property that needs some context is <code>category</code>. The possible values for this property are the values enumerated in <code>RecipeCategory</code> ENUM. To define them, we need to create a new file named RecipeCategory.js and place the type in the following:

```
foam.ENUM({
  package: 'com.foamdev.cook',
  name: 'RecipeCategory',
  values: [
    { name: 'APPETIZER' },
    { name: 'MAIN' },
    { name: 'DESSERT' },
    { name: 'BEVERAGE' },
    { name: 'SNACK' },
    { name: 'SIDE' },
    { name: 'OTHER' }
  ]
});
```

# Build the Service

Before we can test our code we need to do a few more things. First we need to update the pom.js file to include the two .js file we created:

```
foam.POM({
  name: 'recipes',
  version: '1',
  excludes: [ 'build', 'node_modules', 'deployment','foam3'],
  licenses: [
    `
    Copyright 2025 FOAM Recipes Authors. All Rights Reserved.
    `
  ],
  projects: [
    { name: 'foam3/pom' }
  ], 
  setFlags: {
    u3: true
  },
  files: [
    { name: 'src/com/foamdev/cook/Recipe',         flags: 'js|java' },
    { name: 'src/com/foamdev/cook/RecipeCategory', flags: 'js|java' }
  ]
});
```
Then we need to setup needed journals. A journal is a simple JSON-like configuration file used to store application data. Journal files are suitable for simple configuration data containing only a few records, and for larger in-memory databases, potentially containing millions of records. Journal files are append-only, meaning when data is added, updated, or removed, changes are only appended to the end of the file, but none of its contents are updated or removed. Updates are performed by recoding, or journalling, a list of desired changes. These changes will appear in the journal as either "put" lines:
```
  p({<json-data-here>});
```
or "remove" lines:
```
  r({<json-id-here>});
```
Before each update there may be a line which declares who made change and when they made it:
```
  // Modified by Kevin Greer (49393173) at 2025-05-20T14:53:26.590-0400
```
The advantages of journal files are that they can be updated quickly, no old data is lost (and so updates or reverts can be reversed),
they are human readable, they provide an audit trail of who and when changes were made, they're very fault tolerant, don't require external
database hosting or configuration, and provide excellent performance for many use-cases.

So, let's create the directory where FOAM places these files by default and add the two needed configuration files:

```
mkdir /journals
touch /journals/services.jrl
touch /journals/menus.jrl
```
The services.jrl file should have the following content:
```
p({
  "class": "foam.core.boot.CSpec",
  "name": "recipesDAO",
  "description": "",
  "serve": true,
  "authenticate": true,
  "keywords": [ "" ],
  "serviceScript": """
    return new foam.dao.EasyDAO.Builder(x)
      .setPm(true)
      .setSeqNo(true)
      .setAuthorize(false)
      .setJournalType(foam.dao.JournalType.SINGLE_JOURNAL)
      .setOf(com.foamdev.cook.Recipe.getOwnClassInfo())
      .build();
  """,
  "client": `{"of":"com.foamdev.cook.Recipe"}`
})
```
The above will add your recipes DAO service to FOAM.
A DAO, or Data Access Object, is an object which provides access to a collection of data. The DAO interface is:

```
interface DAO extends Sink {
  void   put(obj, opt_sink)
  void   remove(obj)
  void   removeAll()
  void   find(query, sink)
  Sink   select(sink)
  void   listen(sink)
  void   pipe(sink)
  void   unlisten(sink)
  DAO    where(query)
  DAO    limit(count)
  DAO    skip(count)
  DAO    orderBy(...comparators)
}
```

With a DAO you can do everything you might want to do with a collection of data. The above interface is surprisingly general and powerful, despite its relatively small size. Also note that a DAO is an interface, not a specific implementation. There are many DAO implementations that let you
store your data in different underlying databases or other storage mechanisms. No mater which DAO implementation you're using, they all have the same interface and your client code can work with any implementation without change. Journal files, for example, are accessed through the "JDAO" DAO implementation.

Learn more about DAOs in the [Introduction to FOAM Programming][foam-intro].

Note that FOAM core comes with a number of out-of-the-box services, that you'll become more 
familiar with time.

To include our entity in the FOAM we need to add this to the menus.jrl file created above:

```
p({
  "class":"foam.core.menu.Menu",
  "id":"recipes",
  "label":"Recipes",
  "authenticate":true,
  "keywords":[""],
  "handler":{
    "class":"foam.core.menu.DAOMenu2",
    "config":{
      "class":"foam.comics.v2.DAOControllerConfig",
      "daoKey":"recipesDAO"
    }
  }
})
```
Now we are ready to test our code. From the command line, in the root directory type:

```
build.sh -j
```

This we trigger the build and run the server. You can open your application in the web browser at http://localhost:8080/. Use the following credentials at the logging screen:

```
user: foam-admin
password: foam-admin
```

// TODO Vesna to add screen shots of the directory structure and the app screen at this point
// and continue the tutorial

<!-- List all links here -->

[foam-repo]: https://github.com/kgrgreer/foam3
[foam-recipes]: https://github.com/VesnaSUG/FOAM-Recipes
[foam-pom-spec]: https://github.com/kgrgreer/foam3/blob/development/doc/guides/POM.md
[foam-install]: https://github.com/kgrgreer/foam3/blob/development/INSTALL.md
[foam-intro]: https://docs.google.com/presentation/d/1yT6Yb5aJJ3OXD3n_8GKC_vtTs_rxJpzOQRgU1Oa_1r4/edit?usp=sharing
