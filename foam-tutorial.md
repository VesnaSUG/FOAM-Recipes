# Intro

This tutorial will guide you through creating of a new project using FOAM. FOAM stands for "Feature-Oriented Active Modeller", and is a framework converting high-level software specifications, called "models", into useful executable sofware components, called "features". FOAM is cross-language and cross-platform, meaning that it can be used JS, Java and Swift, and for both client and server software.

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

name: the name of your project. Will be used for naming certain files and directories created by the build process.

version: will be attached to some built files. Should be updated when you make a new release so that old cached code isn't used.

excludes: by default the FOAM build will recurse sub-directories, unless they are included in excludes:. The directories listed
are standard directories that we want to FOAM build to ignore.

licenses: is an array of license notifications. When the build creates a deployment .js file, it will include all declared licenses at the top.

projects: points to pom files for other projects or sub-projects. At the very minimum, you need to include the foam3/pom to include foam. You can break your project into multiple pom files, or just have one top-level pom.

setFlags: is used to enable or disable build flags. These can be used to enable or disable the compilation of flagged files. You could use this to enable or disable java, swift or testing features, for example. In this example we're enabling the UI library called 'U3'. If we hadn't included "u3: true" FOAM would have compiled the U2 GUI library instead.

files: Lists model files to be included in your build. The ".js" extension is not included.

javaFiles: Lists .java files to be compiled. The ".java" extension is not included.

You can earn more by reading the [full FOAM POM specificiation](https://github.com/kgrgreer/foam3/blob/development/doc/guides/POM.md).

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
