# Intro

This tutorial will guide you through creating of a new project using FOAM. (TODO Brief explanation of what FOAM is).

The tutorial will cover the initial setup and an application creation by creating a cooking recipe database. 

By following this tutorial you will learn ... (TODO)

This tutorial is best suited for FOAM beginners as well as experienced FOAM developers who wish to understand the
underlying architecture in more depth.

# Initial Setup

Since we are starting from scratch, our first step is to log into an appropriate github and create a new repository named FOAM-Recipes, then clone it in the development environment. In our case we created a public repository [FOAM-Recipes][foam-recipes] and cloned into the current directory:

```
git clone git@github.com:VesnaSUG/FOAM-Recipes.git
```

One of the conveniences of FOAM is that there are no external dependencies. All the code is at the tip of your fingers and you can step through it
as needed. For that reason, FOAM is included in your project as a GIT submodule. Therefore our next step is to go to the [FOAM Repository][foam-repo] and grab the repository's URL, then link to it as a sub-module for our project:

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
  ]
});

```

TODO add a short description of the content, is there a link to the full syntax docs?

The last step in this section is to assure that the needed helper directories /opt and /opt/recipe directories exist and you are set as the owner:

```
sudo chown -R $USER /opt
sudo chown -R $USER /opt/recipe
```

# Create Recipe Model

// WIP ...

<!-- List all links here -->

[foam-repo]: https://github.com/kgrgreer/foam3
[foam-recipes]: https://github.com/VesnaSUG/FOAM-Recipes
