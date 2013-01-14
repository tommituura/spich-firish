"use strict";
// This file will have the handler objects and functions for 
// keyboard & mouse events.

sf.controls = (function() {
    var cursorPos = {x: 0, y: 0, visible: false}
    var clicked = false;
    var clickPos = {x:null, y:null};
    var keys = [];
    var anykey = false;
    for (var i=0; i<256; i++) {
        keys[i] = false;
    }

    function up () {
        return keys[38] || keys[175] || keys[87];
    }
    
    function down() {
        return keys[40] || keys[176] || keys[83];
    }

    function left() {
        return keys[37] || keys[178] || keys[65];
    }

    function right() {
        return keys[39] || keys[177] || keys[68];
    }

    function keydown(keyevent) {
        keys[keyevent.which] = true;
        anykey = true;
    }
    function keyup(keyevent) {
        keys[keyevent.which] = false;
    }
    function getMovement() {
        var movement = [0, 0];
        if(up()) {
            movement[1] = -1;
        }
        if(down()) {
            movement[1] = 1;
        }
        if(left()) {
            movement[0] = -1;
        }
        if(right()) {
            movement[0] = 1;
        }
        anykey = false;
        return movement;
    }


    function mouseclick(mouseEvent) {
        clicked = true;
        clickPos.x = mouseEvent.offsetX;
        clickPos.y = mouseEvent.offsetY;
    }
    
    function getClick() {
        if (clicked) {
            clicked = false;
            return true
        } else {
            return false;
        }
    }
    
    function getClickPos() {
        return clickPos;
    }
    
    function mousemove(mouseEvent) {
        cursorPos.x = mouseEvent.offsetX;
        cursorPos.y = mouseEvent.offsetY;
        cursorPos.visible = true;
    }
    function mouseout() {
        cursorPos.visible = false;
    }
    function getCursorPos() {
        return cursorPos;
    }
    function getAnyKey() {
        if (anykey) {
            anykey = false;
            return true;
        } else {
            return false;
        }
    }
    return {
        handlers: {
            keyup : keyup,
            keydown : keydown,
            mousemove : mousemove,
            mouseclick : mouseclick,
            mouseout: mouseout
        }, 
        getMovement: getMovement,
        getCursorPos: getCursorPos,
        getClick: getClick,
        getClickPos: getClickPos,
        getAnyKey: getAnyKey,
        
    }
})();
