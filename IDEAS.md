# Ideas

So, once upon a time I get ideas but am too tired to start hacking 
away with them. So, this is the notepad on things that might 
or might not end up in the final product. Whatever final means anyway...

### States and Transitions

We have several states we must support in the game:

* Starting screen (game name, start button etc...
* multiple playing screens (one for each level!
* game over screen/name input for hiscore screen 
* highscore screen

And the transitions between these states are as follows (it seems):

* Starting screen -> 1st level by starting game.
* (in future, Starting screen -> any level by level select)
* Nth level screen -> N+1th level screen by progressing a level
* Nth level screen -> game over screen by losing the last life or 
stopping game
* game over screen -> highscore screen by anykey or inputting name
* highscore screen -> starting screen by anykey (or timeout?)

Also, we want to be able to generate the levels from json 
files. This would be mightily nice even at the first version. 

# Transition plan:

* every type of screen has a script-tag template
* screens are created to browser window from templates, 
at first having hidden as a class which translates 
to display: none; in css. 
