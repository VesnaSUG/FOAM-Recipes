<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Intro](#intro)
- [Initial Setup](#initial-setup)
- [Generate Application](#generate-application)
  - [Application Structure](#application-structure)
  - [FOAM Model - Recipe.js](#foam-model---recipejs)
  - [FOAM Journals](#foam-journals)
    - [FOAM DAO Service](#foam-dao-service)
    - [Menu Navigation](#menu-navigation)
- [Running Application](#running-application)
- [Testing](#testing)
- [Modify FOAM Recipe Model](#modify-foam-recipe-model)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Intro

This tutorial will guide you through creating of a new project using FOAM. FOAM stands for "Feature-Oriented Active Modeller", and it is a framework converting high-level software specifications, called "models", into useful executable software components, called "features". FOAM is cross-language and cross-platform, meaning that it can be used as JS, Java and Swift, and for both client and server software.

The tutorial will cover the initial setup and an application creation by creating a cooking recipe database. The tutorial assumes that you
already have java, nodejs and maven installed in your environment. If you need to install these, helpful tips can be found in the [FOAM installation instructions][foam-install]. Note that you do not need to build FOAM in isolation for the tutorial. We will do this step when we add FOAM as a git sub-module to our project.

By following this tutorial you will learn to:
1. Initialize a new FOAM application 
1. Define FOAM models
1. TODO ...

This tutorial is best suited for FOAM beginners as well as experienced FOAM developers who wish to understand the 
underlying architecture in more depth.

> [!IMPORTANT]
> The tutorial has instructions to build the application from *scratch* and if you wish to follow along you need to start with an *EMPTY* repository.

However, if you wish to just read along and have a running application you can clone the tutorial repository instead. Here is an example of cloning it using [SSH][github-ssh]:

```
git clone git@github.com:VesnaSUG/FOAM-Recipes.git
```

# Initial Setup

Since we are starting from scratch, our first step is to log into an appropriate github and create a NEW repository. You can name your repository any way you like (ours is named FOAM-Recipes). You can find more information on how to create a new github repository [here][github-docs-repo]. Once you created an EMPTY repository clone it in your local development environment:

```
git clone <git URL for your repository>
```

One of the conveniences of FOAM is that there are no external dependencies. All the code is at the tip of your fingers and you can step through it
as needed. For that reason, FOAM is included in your project as a GIT sub-module. Therefore our next step is to go to the [FOAM Repository][foam-repo] and grab the repository's URL, then link to it as a sub-module for our project. Here is an example how to do it using the ssh github link:

```
cd FOAM-Recipes
git submodule add git@github.com:kgrgreer/foam3.git
git submodule update --init --recursive --rebase --force
```

The FOAM build depends on a few npm packages. Install them with:

```
#cd into the foam3 sub-module directory
cd foam3/
./build.sh --install
# cd back to your root directory
cd ..
```

# Generate Application

The easiest way to create a FOAM application is to use the foam build script <code>foam3/tools/build.js</code> and generate the application structure and the main application model. To create your application this way from the root directory execute the following:

```
cd foam3
./build.sh -T+setup/Project --appName:Recipe --package:com.foamdev.cook --adminPassword:demopassword
cd ..
```

In this case, we named the application and the top model _Recipe_ and placed it in the _com.foamdev.cook_ package.



## Application Structure

Your application directory should now look similar to this:

```
/deployment
/foam3
/journals
/src
pom.js
build.sh
.gitignore
.gitmodules
```

Let's examine a few key files before we run our application. 

One of the generated files is build.sh with the following content:

```
#!/bin/bash
node foam3/tools/build.js "$@"
```

This is a convenience script to make the application builds easier. Before you use it, make sure that the script has executable privileges:

```
chmod +x build.sh
```

The next file to take a look at is the Project Object Model (POM) file for our project, named pom.js. Note that this file is a meta project file that will be used by FOAM to generate the traditional POM.xml used by build tools. The file should have the following content:

```
foam.POM({
  name: 'recipe',
  excludes: [ '*' ],
  projects: [
    { name: 'foam3/pom'},
    { name: 'src/com/foamdev/cook/pom'},
    { name: 'deployment/recipe/pom' }
  ],
  licenses: `
    Copyright 2025 FOAM Recipes Authors. All Rights Reserved.
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

```

Let's look briefly at the purpure of each of the elements in this file:

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
<td width=20% align="left">excludes</td>
<td width=80% align="left">By default the FOAM build will recurse sub-directories, unless they are included in excludes. The directories listed
are standard directories that we want to FOAM build to ignore.</td>
</tr>
<tr>
<td width=20% align="left">projects</td>
<td width=80% align="left">Points to pom files for other projects or sub-projects. At the very minimum, you need to include the foam3/pom to include foam. You can break your project into multiple pom files, or just have one top-level pom.</td>
</tr>
<tr>
<td width=20% align="left">licenses</td>
<td width=80% align="left">An array of license notifications. When the build creates a deployment .js file, it will include all declared licenses at the top.</td>
</tr>
<tr>
<td width=20% align="left">VERSION</td>
<td width=80% align="left">The version that will be attached to some built files. Should be updated when you make a new release so that old cached code isn't used.</td>
</tr>
<tr>
<td width=20% align="left">tasks</td>
<td width=80% align="left">Tasks are build hooks that allow the pom to modify build properties.  In this case when the build is creating the Java JAR Manifest file, this pom sets the vendor id property.</td>
</tr>
</tbody>
</table>


You can learn more on the pom file and possible customization options by reading the full [FOAM POM specification][foam-pom-spec].

## FOAM Model - Recipe.js

The most interesting file that is generated for us is the model file Recipe.js in the src/com/foamdev/cook directory. The file contains the key entity for our recipe database application. We will adjust the content of this file as we develop our application. However, if you just generated the project, the file will have the following content:

```
foam.CLASS({
  package: 'com.foamdev.cook',
  name: 'Recipe',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.LastModifiedAware'
  ],

  tableColumns: [
    'name'
  ],

  searchColumns: [
    'name'
  ],

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
    }
  ],

  methods: [
    function sampleMethod() {
      return 'Hello World!';
    },
    function toSummary() {
      return this.name;
    },
    function toString() {
      return this.toSummary();
    }
  ]
});

```

Here we defined a model for class <code>Recipe</code> that is in the <code>com.foamdev.cook</code> package and has two properties,
<code>id</code> and <code>name</code>, and a few sample methods.

The values for the <code>id</code> are autogenerated, unique ids for each instance of this class, therefore we are giving FOAM the instruction to omit it from the create screen for this class by setting <code>createVisibility</code> to <code>HIDDEN</code>. Since the property is not editable, we also adjusted <code>updateVisibility</code> to read-only.

The other property <code>name</code>, is a string property that will be visible in the table view by default, as well as searchable. The model derives 
from two interfaces, <code>foam.core.auth.CreatedAware</code> and <code>foam.core.auth.LastModifiedAware</code>whose default implementation adds the timestamp and last modified properties. 

## FOAM Journals

 A journal is a simple JSON-like configuration file used to store application data. Journal files are suitable for simple configuration data containing only a few records, and for larger in-memory databases, potentially containing millions of records. Journal files are append-only, meaning when data is added, updated, or removed, changes are only appended to the end of the file, but none of its contents are updated or removed. Updates are performed by recoding, or journalling, a list of desired changes. These changes will appear in the journal as either "put" lines:
```
  p({<json-data-here>});
```
or "remove" lines:
```
  r({<json-id-here>});
```
For the run-time journals, before each update there may be a line which declares who made the change and when they made it:
```
  // Modified by Kevin Greer (49393173) at 2025-05-20T14:53:26.590-0400
```
The advantages of journal files are that they can be updated quickly, no old data is lost (and so updates or reverts can be reversed),
they are human readable, they provide an audit trail of who and when changes were made, they're very fault tolerant, don't require external
database hosting or configuration, and provide excellent performance for many use-cases.

Journal files which provide default application configuration are located in one of three places in the repository: 
* journals/ - system wide configuration, concerning multiple models
* src/... - required configuration for a particular model, co-located with the model.
* deployment/ - configuration specific to particular deployment (customer)

For our example, groups, menus, permissions, and services journals are under <code>journals/</code>
And a demo user journal is under <code>deployment/demo</code>.

### FOAM DAO Service

We'll gain more understanding on the content of the generated journal files as we go. For now, let's focus on the journal file <code>journals/services.jrl</code> that sets up one of the key FOAM services, DAO:

```
p({
  "class": "foam.core.boot.CSpec",
  "name": "recipeDAO",
  "description": "",
  "serve": true,
  "authenticate": true,
  "keywords": [ "recipe" ],
  "serviceScript": """
    return new foam.dao.EasyDAO.Builder(x)
      .setOf(com.foamdev.cook.Recipe.getOwnClassInfo())
      .setPm(true)
      .setSeqNo(true)
      .setAuthorize(false)
      .setJournalType(foam.dao.JournalType.SINGLE_JOURNAL)
      .build();
  """,
  "client": `{"of":"com.foamdev.cook.Recipe"}`
})
```
The FOAM core comes with a number of out-of-the-box services, with DAO service being one of them, that you'll become more 
familiar with time. With the journal above, we add the recipes DAO service to FOAM.

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

### Menu Navigation 

Let's look at one more file, <code>journals/menus.jrl</code> before we run our application. A **menu** is used to make our entity
visible in FOAM. Upon initial creation the file should have the following content:

```
p({
  "class":"foam.core.menu.Menu",
  "id":"recipe.recipe",
  "label":"Recipe",
  "authenticate":true,
  "keywords":[""],
  "handler":{
    "class":"foam.core.menu.DAOMenu2",
    "config":{
      "class":"foam.comics.v2.DAOControllerConfig",
      "daoKey":"recipeDAO"
    }
  }
})

```

# Running Application

The last step before we can run our application is to assure that the needed helper directories /opt and /opt/recipe directories exist and you are set as the owner:

```
sudo chown -R $USER /opt
```

Now we are ready to test our code. From the command line, in your root directory type:

```
$ deployment/demo/run.sh
# or
$ ./build.sh -Jdemo
```

This we trigger the build and start the server. You can open your application in the web browser at http://localhost:8080/. 
Use one of the following credentials at the logging screen:

```
# administrator - full access
user: admin
password: demopassword

# regular non-priveledged user - can only interact with Recipes.
user: demo
password: demopassword
```

Clicking on the Recipe in the left navigation menu should bring you to the Recipe screen:

![app-screen-1][app-screen-1]

Click on the <code>Create a New Recipe</code> button and create your first recipe instance. Notice how much functionality you already got
by just creating a simple model and connecting to the FOAM core.

> [!IMPORTANT]
> To stop the FOAM server, type in <code>CTRL</code>+C twice.

# Testing
As you develop, also consider creating test cases to exercise your models and application. An example is provided in <code>src/com/foamdev/cook/test/RecipeTest.js</code>, with configuration to run it in <code>development/test/test.sh</code>.
The FOAM build executes tests defined journals named tests.jrl, typically co-located with the tests themselves.  In our case in the test directory mentioned above. If additional configuration is required for a test, such as test data or special service configuration, then by convention those journals are stored in <code>deployment/test/</code>.  The build will automatically look for this deployment directory.
Test are executed with build task **--java-tests**. 

Examples:
```
# run all test cases - includes FOAM test cases along with your application test cases.
./build.sh --java-tests

# run one test case
./build.sh --java-tests:RecipeTest

# run a selection of test cases (comma separated)
./build.sh --java-tests:Test1,Test2
```

# Modify FOAM Recipe Model

Our <code>Recipe</code> model is not very interesting yet. Ultimately, we would like to have the following as our schema to create a relevant recipe database:

![recipe-schema][recipe-schema]


Let's start by adjusting the <code>Recipe</code> model. Since <code>Recipe</code> references a recipe type ENUM, let's create a model for that categorization first by creating a file <code>src/com/foamdev/cook/RecipeCategory</code> with the following content:

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

The next step is to go to the <code>src/com/foamdev/cook/Recipe.js</code> and adjust the content to the following:

```
foam.CLASS({
  package: 'com.foamdev.cook',
  name: 'Recipe',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.LastModifiedAware'
  ],

  tableColumns: [
    'name',
    'description',
    'category'
  ],

  searchColumns: [
    'name',
    'category'
  ],

  properties: [
    {
      class: 'String',
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
      class: 'String',
      name: 'description'
    },
    {
      class: 'Enum',
      of: 'com.foamdev.cook.RecipeCategory',
      name: 'category',
      value: 'OTHER'
    },
    {
      class: 'String',
      name: 'source'
    }
  ],

  methods: [
    function sampleMethod() {
      return 'Hello From Recipe World!';
    },
    function toSummary() {
      return this.name;
    },
    function toString() {
      return this.toSummary();
    }
  ]
});

```

Most of the adjustments are simple to decipher, except the <code>category</code> property. The possible values for this property are the values enumerated in the <code>RecipeCategory</code> ENUM we created earlier. 

To include this new model in the build we need to go to the POM file for the package <code>src/com/foamdev/cook/pom.js</code> and adjust the file content to include <code>RecipeCategory</code>

```
foam.POM({
  name: 'recipe',
  projects: [
    { name: 'test/pom',                 flags: 'test' }
  ],
  files: [
    { name: 'Recipe',                  flags: 'js|java' },
    { name: 'RecipeCategory',          flags: 'js|java' }
  ]
});

```


// TODO Vesna - to be continued ...
- add a few recipes, explain search and table settings
- add a user, explain journal merging
- add a section on the high level system structure and some core services
- add a section on debugging tips
- create the rest of the models "off-line" and zip them for download (correct the schema to fully match)
- create some meaningful full entries and "import" them, explain search filtering feature
- test the clone mode and write up README.md how to run if you do not follow along



<!-- List all links here -->

[foam-repo]: https://github.com/kgrgreer/foam3
[foam-recipes]: https://github.com/VesnaSUG/FOAM-Recipes
[foam-pom-spec]: https://github.com/kgrgreer/foam3/blob/development/doc/guides/POM.md
[foam-install]: https://github.com/kgrgreer/foam3/blob/development/INSTALL.md
[foam-intro]: https://docs.google.com/presentation/d/1yT6Yb5aJJ3OXD3n_8GKC_vtTs_rxJpzOQRgU1Oa_1r4/edit?usp=sharing
[github-docs-repo]: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
[app-screen-1]: images/screen1.png
[recipe-schema]: images/RecipeDBSchema.png
[github-ssh]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
