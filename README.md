# spich-firish

Browser-based mouse+keyboard -controlled run'n'gun shooter game with JavaScript, Canvas and little bits of html5

### Please note!

* This is a university course project for a course about www programming, with the deadline set at 14th January 2013.
* This github repository also serves as a medium for handing in this project to the instructors for grading.

These facts do have a consequence: 

In the (admittedly unlikely) chance that anyone clones this project and wants to improve it, since the turned-in 
version must be 100% my own work, __I cannot accept any pull requests until 15th Jan 2013__.  So, if you really want 
to clone and improve this project, by all means do so, but please don't feel bad when I'll keep ignoring your pull 
requests until the turn-in deadline has passed. There's a reason for that that has nothing to do with the quality 
of anyone's code. Thanks. :)

Also, please ignore the odd, rough things at the edges. I'm still figuring this git and github thing out...

# Project outline

* This game is in 2D. It does not make any attempt at supporting old browsers, meaning it might use Web Audio API and 
nifty canvas tricks, platform-specific css rules, etc. with impunity. If it works with newest Chrome and Firefox, all 
is well. Actually, the hard requirement is that it must work in newest Chrome. But I'll keep it working in FF+others 
too, since platform agnosticism is the cool and sane thing to go for. As much as I can.
* Graphics&Sound assets will (at least at first) be something CC-licensed out of opengameart.org or similar resources.
* The first versions might have uninspiring coloured rectangles instead of artwork.
* License will be something permissive like 3-clause BSD. 

### Controls, gameplay etc.:

* wasd - up, left, down, right. Up is jump.
* mouse: aim with crosshairs, you can shoot in all directions.
* click: shoot.
* q, e: change weapons left or right, (PENDING, we might not implement more than one weapon at first.)
* No scrolling levels, yet. Every level is only one room with a start point, end point some walls, corridors, ceilings,
floors and enemies ... And it has to fit into 800px x 800px 2D canvas.
* The graphics won't be too detailed, but I'll try to throw in character animations and fluid movements as much 
as I can. 
