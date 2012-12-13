# spich-firish

Browser-based mouse+keyboard -controlled run'n'gun shooter game with 
JavaScript, Canvas and little bits of additional 
html5 if I get around to it. __NO FLASH__.

### Please note!

* This is a university course project for a course about www 
programming, with the deadline set at 13th January 2013.
* This github repository also serves as a medium for handing in 
this project to the instructors for grading.

These facts do have a consequence: 

In the (admittedly unlikely) chance that anyone clones this project and 
wants to improve it, since the turned-in 
version must be 100% my own work, __I cannot accept any 
pull requests until 14th Jan 2013__.  So, if you really want 
to clone and improve this project, by all means do so, but 
please don't feel bad when I'll keep ignoring your pull 
requests until the turn-in deadline has passed. There's a 
reason for that that has nothing to do with the quality 
of anyone's code. Thanks. :)

Also, please ignore the odd, rough things at the edges. I'm still 
figuring this git and github thing out...

# Project outline

* This game is in 2D. It does not make any attempt at supporting 
old browsers, meaning it might use Web Audio API and 
nifty canvas tricks, platform-specific css rules, etc. with impunity. 
If it works with newest Chrome and Firefox, all 
is well. Actually, the hard requirement is that it must work in 
newest Chrome. But I'll keep it working in FF+others 
too, since platform agnosticism is the cool and sane thing to go 
for. As much as I can.
* Graphics&Sound assets will (at least at first) be something 
CC-licensed out of opengameart.org or similar resources.
* The first versions might have uninspiring coloured rectangles instead of artwork.
* License will be something permissive like 3-clause BSD. 
* I'll try to keep working on the project even after the turn-in 
but I might have to prioritize my time so... feel 
free to fork and host elsewhere if you want. 

### Controls, gameplay etc.:

* wasd - up, left, down, right. Up is jump.
* mouse: aim with crosshairs, you can shoot in all directions.
* click: shoot.
* Weapon shots are visible (and avoidable) projectiles, this goes for both 
friendly and enemy fire.
* q, e: change weapons left or right. We will have only 2 types of 
weapons first. "basic" and "strong" gun.
* No scrolling levels, yet. Every level is only one room with a start 
point, end point some walls, corridors, ceilings,
floors and enemies ... And it has to fit into 800px x 800px 2D canvas.
* Moving and static enemies, both shooting and not-shooting.
* In other words, 4 types of distinct enemies overall at least. 
(static and not-shooting enemy is basically some 
deadly environment element like spike etc)
* When player gets to the door, the next level starts. Or if it was 
the last level, game is won. 
* Scoring is somehow based on time used to complete the level and amount 
of killed enemies.
* Highscores will be saved to some server somewhere with player's nickname 
(asked when player gets there).
* Single player only for now. In future, I'm open to the idea of multiplayer 
but for now, only single player.
* Probably won't have lifebar, but "one hit kills" type of gameplay. 
* ...Because I just kinda swing that hardcoreish way. And it 
DOES make interesting level design easier IMHO.
* ...Blame danmaku shooters.
* The graphics won't be too detailed, but I'll try to throw in 
character animations and fluid movements. 
* Might end up using vector-based graphics like N. 
(Google 'N game', and play it if you haven't already. 
Despite being in flash, it's highly addictive and fun.)

### 'spich-firish'?

I dunno lol. Spich came into my mind from out of nowhere, maybe from 
"spitfire". I guess. Only after creating 
the repo I googled that spich means _"so weird that it can't even be described"_ 
according to onlineslangdictionary.com. I guess I can live with that, normalcy is 
usually dull anyways. :D
