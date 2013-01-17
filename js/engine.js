"use strict";

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

sf.engine = {}; 

sf.engine.startScreen = (function() {
    var loadWaitFrameCounter = 0;
    var loadWaitText = function() {
        var counterRound = loadWaitFrameCounter % 120;
        if (counterRound < 10)       {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 20)  {return '  *fetching & parsing data ... please wait*  ';}
        else if (counterRound < 30)  {return ' * fetching & parsing data ... please wait * ';}
        else if (counterRound < 40)  {return '*  fetching & parsing data ... please wait  *';}
        else if (counterRound < 50)  {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 60)  {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 70)  {return '   fetching & parsing data ... please wait   ';}
        else if (counterRound < 80)  {return '*  fetching & parsing data ... please wait  *';}
        else if (counterRound < 90)  {return ' * fetching & parsing data ... please wait * ';}
        else if (counterRound < 100) {return '  *fetching & parsing data ... please wait*  ';}
        else if (counterRound < 110) {return '   fetching & parsing data ... please wait   ';}
        else                         {return '   fetching & parsing data ... please wait   ';}
    }
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '40px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("SPICH-FIRISH", 140, 140);
        
        sf.setup.context.font = '15px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillText("WASD to move.", 150, 200);
        sf.setup.context.fillText("Aim and shoot with mouse.", 150, 220);
        sf.setup.context.fillText("You are Black. Avoid/shoot Red. Reach Green.", 150, 240);
        sf.setup.context.fillText("Your time is your score.", 150, 260);
        
        if (sf.setup.readyToRun) {
            sf.setup.context.fillText("Press any key to start.", 150, 300);
        } else {
            sf.setup.context.font = '15px Courier';
            sf.setup.context.fillText(loadWaitText(), 150, 300);
        }
    };
    var tick = function() {
        loadWaitFrameCounter = loadWaitFrameCounter + 1;
        if (sf.setup.readyToRun && sf.controls.getAnyKey()) {
            sf.controls.getClick(); // empty the mouseclick buffer.
            sf.engine.main.state('GAME_SCREEN');
        } else if (sf.setup.readyToRun && loadWaitFrameCounter > 240) {
            sf.engine.main.state('SCORE_SCREEN');
        }
    };
    var init = function() {
        loadWaitFrameCounter = 0;
    }
    return {
        draw: draw, 
        tick: tick,
        init: init
    }
})();

sf.engine.hiScore = (function() {
    var scores = null; // sf.scores.scores();
    var waitFrameCounter = 0;
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("High score: ", 30, 30);
        sf.setup.context.fillText("Levels ", 200, 170);
        sf.setup.context.fillText("Time ", 300, 170);
        sf.setup.context.fillText("Name ", 400, 170);
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        
        var ystart = 200;
        var ystep = 30;
        for (var i=0;i<scores.length;i++) {
            sf.setup.context.fillText(scores[i].levels, 200, ystart + ystep*i);
            sf.setup.context.fillText(scores[i].time, 300, ystart + ystep*i);
            sf.setup.context.fillText(scores[i].name, 400, ystart + ystep*i);
        }
        
    };
    var tick = function() {
        waitFrameCounter = waitFrameCounter + 1;
        if (sf.controls.getAnyKey()) {
            sf.controls.getClick();
            sf.engine.main.state('GAME_SCREEN');
        } else if (waitFrameCounter > 240) {
            sf.engine.main.state('START_SCREEN');
        } 
    };
    var init = function () {
        waitFrameCounter = 0;
        scores = sf.scores.scores();
    }
    return {
        draw: draw, 
        tick: tick,
        init: init
    }
})();

sf.engine.hiScoreInput = (function() {
    var levels;
    var time;
    
    var sendScore = function(levelsarg, timearg) {
        console.log(arguments);
        time = timearg;
        levels = levelsarg;
    }
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillStyle = 'rgb(0, 0, 0)';
        sf.setup.context.fillText("Score Input screen!", 30, 30);
    };
    var tick = function() {
        var name = prompt('Name?');
        sf.scores.addScore(name, levels, time);
        sf.engine.main.state('SCORE_SCREEN');
    };
    return {
        draw: draw, 
        tick: tick,
        sendScore: sendScore
    }
})();

/* THIS MODULE is the heart of game logic. */
sf.engine.game = (function() {
    var currentLevel = null;
    var maxLevelIndex = null;
    var clearedLevels = null;
    var player = null;
    var goal = null;
   
    var enemies = [];
    var enemybullets = [];
    var playerbullets = [];
    var terrain = [];
    
    var time = {start: null, now: null, killBonus: 0};
    
    var gameEnd = function() {
        console.log(clearedLevels, time.now-time.start);
        if (sf.scores.checkScore(clearedLevels, time.now-time.start)) {
            sf.engine.hiScoreInput.sendScore(clearedLevels, time.now-time.start);
            sf.engine.main.state('SCOREINPUT_SCREEN');
        } else {
            sf.engine.main.state('SCORE_SCREEN');
        }
    }
    
    var gameOver = function() {
        clearedLevels = currentLevel;
        gameEnd();
    }
    
    var gameClear = function() {
        clearedLevels = currentLevel + 1;
        gameEnd();
    }
    
    var initLevel = function(level) {
        sf.debug('Starting new level...', currentLevel, maxLevelIndex);
        var levelData = sf.levels.getLevel(level);
        terrain = [];
        enemies = [];
        player = null;
        player = null;
        
        playerbullets = [];
        enemybullets = [];
        
        for (var i=0;i<levelData.terrain.length;i++) {
            terrain.push(new sf.objects.TerrainObject(levelData.terrain[i].x, levelData.terrain[i].y, levelData.terrain[i].width, levelData.terrain[i].height));
        }
        for (var i=0;i<levelData.enemies.length;i++) {
            enemies.push(new sf.objects.EnemyObject(levelData.enemies[i].x, levelData.enemies[i].y, true));
        }
        player = new sf.objects.PlayerObject(levelData.player.x, levelData.player.y, true);
        goal = new sf.objects.GoalObject(levelData.goal.x, levelData.goal.y, false);
    }
    
    var nextLevel = function() {
        if (currentLevel < maxLevelIndex) {
            currentLevel = currentLevel + 1;
            initLevel(currentLevel);
        } else {
            gameClear();
        }
    };
    
    var init = function() {
        sf.controls.clearKeys();
        currentLevel = 0;
        maxLevelIndex = sf.levels.levelCount() - 1;

        initLevel(0);
        time.start = new Date().valueOf();
        time.now = new Date().valueOf();
        time.killBonus = 0;
    };
    
    var draw = function() {
        sf.setup.context.fillStyle="rgb(255,255,255)";
        sf.setup.context.fillRect(0, 0, sf.setup.width, sf.setup.height);
        
        for (var i=0;i<terrain.length; i++) {
            terrain[i].draw(sf.setup.context);
        }
        goal.draw(sf.setup.context);
        for (var i=0;i<enemies.length; i++) {
            enemies[i].draw(sf.setup.context, 'rgb(255,0,0)');
        }
        for (var i=0; i<enemybullets.length; i++) {
            enemybullets[i].draw(sf.setup.context);
        }
        for (var i=0; i<playerbullets.length; i++) {
            playerbullets[i].draw(sf.setup.context);
        }
        player.draw(sf.setup.context);
        sf.setup.context.font = '20px Arial, Helvetica, Sans-serif';
        sf.setup.context.fillText((time.now-time.start) + ' ... ' + time.killBonus ,0,800);
    };
    
    var tick = function(frameNum) {
        $('#screen').focus();
        if (frameNum==0) {
            //sf.debug('tick!');
        }
        
        if (sf.controls.getEsc()) {
            gameOver();
        }
        
        var playermove = sf.controls.getMovement();
        var crosshairs = sf.controls.getCursorPos();
        var shoot = sf.controls.getClick();
        var killedEnemies = 0;

        if (shoot) {
            var clickPos = sf.controls.getClickPos();
            playerbullets.push(new sf.objects.BulletObject(player.pos.x, player.pos.y, clickPos.x, clickPos.y,false,5));
        }
        
        for (var i=0; i<enemybullets.length; i++) {
            enemybullets[i].tick();
        }
        var survivedBullets = [];
        var survivedEnemies = [];
        for (var i=0; i<playerbullets.length; i++) {
            var terrainHit = false;
            var enemyHit = false;
            playerbullets[i].tick();
            
            if (playerbullets[i].arrayCollision(terrain)) {
                terrainHit = true;
            }
            
            for (var k=0; k<enemies.length; k++) {
                if (playerbullets[i].collision(enemies[k])) {
                    enemies[k].hit();
                    enemyHit = true;
                }
            }
            if (!terrainHit && !enemyHit) {
                survivedBullets.push(playerbullets[i]);
            }
        }
        for (var h=0; h<enemies.length; h++) {
            if (enemies[h].life > 0) {
                survivedEnemies.push(enemies[h]);
            }
        }
        playerbullets = survivedBullets;
        killedEnemies = killedEnemies + (enemies.length - survivedEnemies.length);
        enemies = survivedEnemies;
        
        // Diagonal moving means adjusted speed..... Math.cos(Math.PI*0.25) is roughly 0.71.
        if (playermove[0]!==0 && playermove[1]!==0) {
            player.moveBy(playermove[0]*sf.setup.playerspeed*0.71, playermove[1]*sf.setup.playerspeed*0.71);
        } else {
            player.moveBy(playermove[0]*sf.setup.playerspeed, playermove[1]*sf.setup.playerspeed);
        }

        if (player.arrayCollision(terrain)) {
            player.moveBack();
            do {
                player.moveBy(playermove[0]*0.5, playermove[1]*0.5, true);
            } while(player.arrayCollision(terrain)===false);
            player.moveBy(playermove[0]*-0.5,playermove[1]*-0.5, true);
            
            if (playermove[0]!==0 && playermove[1]!==0) {
                player.moveBy(playermove[0]*sf.setup.playerspeed*0.71, 0, true);
                if (player.arrayCollision(terrain)===true) {
                    player.moveBy(playermove[0]*sf.setup.playerspeed*-0.71, 0, true);
                }
                player.moveBy(0, playermove[1]*sf.setup.playerspeed*0.71, true);
                if (player.arrayCollision(terrain)===true) {
                    player.moveBy(0, playermove[1]*sf.setup.playerspeed*-0.71, true);;
                }
            }
        }
        
        time.now = new Date().valueOf();
        time.killBonus = time.killBonus + killedEnemies;
        killedEnemies = 0;
        
        if (player.arrayCollision(enemies)) {
            gameOver();
        }
        
        if (player.collision(goal)) {
            nextLevel();
        }
    };
    return {
        init: init,
        draw: draw, 
        tick: tick
    }
})();

sf.engine.main = (function() {
    var state = 'START_SCREEN';
    var currentMode = sf.engine.startScreen;
    var frameNum = 0;
    var frametime = {
        start: null,
        prev: null,
        now: null,
        current: null,
        sum: 0,
        maxVal: 0
    };
    /* This is admittedly the slower way to handle the state switching, but 
       the alternative would be far too ugly code. For minimal gain:
       http://jsperf.com/code-selection-property-lookup-function-call-vs-if-else
        */
    var tick = function() {
        frametime.start = new Date().valueOf();
        currentMode.tick(frameNum);
        currentMode.draw(frameNum);
        frameNum++;
        if (frameNum > 59) {
            sf.debug(frametime.sum/60, frametime.maxVal);
            frameNum = 0;
            frametime.sum = 0;
            frametime.maxVal = 0;
        }
        frametime.prev = frametime.now;
        frametime.now = new Date().valueOf();
        frametime.current = ((frametime.now - frametime.start)/(frametime.now - frametime.prev) * 100);
        frametime.sum = frametime.sum + frametime.current;
        if (frametime.current > frametime.maxVal) {frametime.maxVal = frametime.current;}
        requestAnimFrame(sf.engine.main.tick);
    }
    var stateSwitch = function(switchto) {
        if (switchto === 'SCORE_SCREEN') {
            state = 'SCORE_SCREEN';
            currentMode = sf.engine.hiScore;
            currentMode.init();
        } else if (switchto === 'SCOREINPUT_SCREEN') {
            state = 'SCOREINPUT_SCREEN';
            currentMode = sf.engine.hiScoreInput;
        } else if (switchto === 'GAME_SCREEN') {
            state = 'GAME_SCREEN';
            currentMode = sf.engine.game; 
            currentMode.init(); 
        } else {
            state = 'START_SCREEN';
            currentMode = sf.engine.startScreen;
            currentMode.init();
        }
    }
    return {
        state: stateSwitch,
        tick: tick
    }
})();
