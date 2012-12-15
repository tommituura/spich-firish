#!/bin/bash
cat setup.js > spich-firish.js
cat controls.js >> spich-firish.js
cat objects.js >> spich-firish.js
cat main.js >> spich-firish.js
cat test.js >> spich-firish.js
java -jar ../yuicompressor-2.4.7.jar spich-firish.js > spich-firish.min.js
rm spich-firish.js
