#!/bin/bash
# run from classes/ and serve with http on port 8080
node foam3/tools/build.js -Jdemo "$@"

# run from jar file and serve with https on port 8443
#node foam3/tools/build.js -Jdemo -aJhttps "$@"

# run from jar file and serve with https on custom port 8200
#node foam3/tools/build.js -Jdemo -aJhttps -W8200 "$@"

# deploy to /opt/demo, run from jar file and serve with https on custom port 8200
#node foam3/tools/build.js -Jdemo -aJhttps -Ndemo -W8200 "$@"
