#!/bin/bash
cat js/setup.js > spich-firish.js
cat js/inputs/*.js >> spich-firish.js
cat js/models/world.js >> spich-firish.js
cat js/models/gameobject.js >> spich-firish.js
cat js/models/enemyobject.js >> spich-firish.js
cat js/models/playerobject.js >> spich-firish.js
cat js/models/terrainobject.js >> spich-firish.js
cat js/models/bulletobject.js >> spich-firish.js
cat js/models/goalobject.js >> spich-firish.js
cat js/engine.js >> spich-firish.js
cat js/main.js >> spich-firish.js
java -jar ../yuicompressor-2.4.7.jar spich-firish.js > spich-firish.min.js
rm spich-firish.js

