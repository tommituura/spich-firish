# spich-firish

Browser-based mouse+keyboard -controlled run'n'gun shooter game with 
JavaScript, Canvas and the usual modern, open standard-compliant things.

### License

MIT.

### Note

Please ignore the odd, rough things at the edges. I'm still 
figuring this git and github thing out...

### Building & installing

There are two ways to access the game: index.html and development.html. 
Open either in your browser. To get the changes in code reflected in index.html, 
there is 'minify.sh' script that will join the js files into one 
and run it through the yui compressor. You must edit the script 
by hand to point it to the .jar of yui compressor, which you can get 
here: https://github.com/yui/yuicompressor/downloads

Do note, you have to access the files through a web server, because 
the JSON files under data (that hold the level definitions) are loaded 
dynamically at the start of the program. Also, to get the high score list 
to work, you have to set your own REST api up. look at the source code, it 
shouldn't be too hard to figure out.

And speaking of levels...

### Only two, dull levels? 

Yup. I didn't have time to create much in the way of "content" here. 
But take a look at those JSON files under /data, you can make your own 
level files quite easily. The order of the array in levels.json file 
is significant; it denotes the order of levels too. You can name the 
actual single level json files whatever you want and it won't make 
any difference.

### What does 'spich-firish' mean?

I dunno lol. Spich came into my mind from out of nowhere, maybe from 
"spitfire". I guess. Only after creating 
the repo I googled that spich means _"so weird that it can't even be described"_ 
according to onlineslangdictionary.com. I guess I can live with that, normalcy is 
usually dull anyways. :D
