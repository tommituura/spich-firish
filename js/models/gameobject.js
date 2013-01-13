"use strict";
// This file holds the constructor functions for 
// gameplay/animation/etc. objects

sf.objects.GameObject = {
    moveBy: function(x, y) {
        this.calculateBounds();
        var blocked = false;
        for (var i=0;i<sf.world.terrain.length; i++) {
            sf.world.terrain[i].calculateBounds();
            if (this.collision(sf.world.terrain[i])) {
                blocked = true;
            }
        }
        //console.log(blocked);
        if (this.movable && !blocked) {
            this.prevpos.x = this.pos.x;
            this.prevpos.y = this.pos.y;
            this.pos.x = this.pos.x + x;
            this.pos.y = this.pos.y + y;
            this.calculateBounds();
        } else if (blocked) {
            this.pos.x = this.prevpos.x;
            this.pos.y = this.prevpos.y;
            this.calculateBounds();
        }
    },
    calculateBounds: function() {

        this.bounds.top = this.pos.y - (this.outerheight/2);
        this.bounds.left = this.pos.x - (this.outerwidth/2);
        this.bounds.bottom = this.pos.y + (this.outerheight/2);
        this.bounds.right = this.pos.x + (this.outerwidth/2);
        
        this.prevbounds.top = this.prevpos.y - (this.outerheight/2);
        this.prevbounds.left = this.prevpos.x - (this.outerwidth/2);
        this.prevbounds.bottom = this.prevpos.y + (this.outerheight/2);
        this.prevbounds.right = this.prevpos.x + (this.outerwidth/2);
        
        // For some aggressive optimization of collision detection...
        this.movebounds.top = (this.bounds.top < this.prevbounds.top) ? this.bounds.top : this.prevbounds.top;
        this.movebounds.left = (this.bounds.left < this.prevbounds.left) ? this.bounds.left : this.prevbounds.left;
        this.movebounds.bottom = (this.bounds.bottom > this.prevbounds.bottom) ? this.bounds.bottom : this.prevbounds.bottom;
        this.movebounds.right = (this.bounds.right > this.prevbounds.right) ? this.bounds.right : this.prevbounds.right;
        if (this.movebounds.right <= this.movebounds.left || this.movebounds.bottom <= this.movebounds.top) {
            console.log('STUFF SERIOUSLY WRONG, movebounds:', this.movebounds)
        }
        
    },
    areaCollision: function(that) { // This collision detection is for first pruning of cases. 
        if (this.movebounds.right > that.movebounds.left && 
            that.movebounds.right > this.movebounds.left && 
            this.movebounds.bottom > that.movebounds.top && 
            that.movebounds.bottom > this.movebounds.top) {
            return true;
        }
        else {
            // console.log(this, that);
            return false;
        }
    },
    crudeCollision: function(that) { // This collision detection is for simple cases. Only run after getting true from areaCollision!
        return true; // doesn't do anything really yet...
    },
    hitboxCollision: function(that) { // this collision function is for most definite cases. Only run after getting true from crudeCollision!
        return true; // doesn't do anything really yet...
    },
    collision: function(that) { // Remember to run calculateBounds for both this and that before asking collision!
        //console.log('Calling collision!');
        return (this.areaCollision(that) && this.crudeCollision(that) && this.hitboxCollision(that));
    },
    init: function(posX, posY, movable, outerwidth, outerheight, blocking) {
        this.pos = {x: posX, y: posY };
        this.prevpos = {x: posX, y: posY };
        this.movable = movable;
        this.outerwidth = outerwidth;
        this.outerheight= outerheight;
        this.bounds = {};
        this.prevbounds = {};
        this.movebounds = {};
        this.calculateBounds();
        this.active = false;
        if (typeof blocking === 'undefined') {this.blocking = false;}
        else {this.blocking = blocking;}
    },
    draw: function(context, color) {
        if (typeof color === 'undefined') {var color='rgb(0,0,0)';}
        if (!this.sprite) {
            context.fillStyle=color;
            context.fillRect(this.bounds.left, this.bounds.top, this.outerwidth, this.outerheight);
        }
    },
    tick: function() { // overwrite this function for objects that that actually do something.
    },
    shoutInfo: function() {
        console.log(this);
    }
};

