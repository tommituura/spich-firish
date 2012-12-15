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
* License is MIT
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

### Project future

* When I get this to run in browsers, I'd really like to look into 
[AppJs](http://appjs.org/) to create a desktop-based bundle out of it.
* Or possibly a mobile version with [PhoneGap](http://phonegap.com/), if 
I can figure out how to make the controls fit the touch screen... This will 
most probably end up being a project all of its own.
