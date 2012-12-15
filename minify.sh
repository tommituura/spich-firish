#!/bin/bash
cat js/setup.js > spich-firish.js
cat js/inputs/*.js >> spich-firish.js
cat js/models/gameobject.js >> spich-firish.js
cat js/models/dummyobject.js >> spich-firish.js
cat js/models/playerobject.js >> spich-firish.js
cat js/main.js >> spich-firish.js
cat js/test.js >> spich-firish.js
java -jar ../yuicompressor-2.4.7.jar spich-firish.js > spich-firish.min.js
rm spich-firish.js
