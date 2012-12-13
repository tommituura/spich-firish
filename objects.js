"use strict";
// This file holds the constructor functions for 
// gameplay/animation/etc. objects

sf.objects = {
    WorldObject: {
        moveBy: function(x, y) {
            if (this.movable) {
                this.prevpos.x = this.pos.x;
                this.prevpos.y = this.pos.y;
                this.pos.x = this.pos.x + x;
                this.pos.y = this.pos.y + y;
                this.calculateBounds();
            }
        },
        calculateBounds: function() {
            this.bounds.top = this.pos.y - (this.outerheight/2);
            this.bounds.right = this.pos.x - (this.outerwidth/2);
            this.bounds.bottom = this.pos.y + (this.outerheight/2);
            this.bounds.left = this.pos.x + (this.outerwidth/2);
        },
        crudeCollision: function(that) { // This collision detection is for simple cases. Remember to run calculateBounds for both this and that!
            if (this.bounds.right < that.bounds.left && 
                that.bounds.right < this.bounds.left && 
                this.bounds.top < that.bounds.bottom && 
                that.bounds.top < this.bounds.bottom) {
                return true;
            }
            else {
                return false;
            }
        },
        hitboxCollision: function(that) { // this collision function is for more definite cases. Only run after getting true from crudeCollision!
            return true; // doesn't do anything really yet...
        },
        collision: function(that) {
            if (this.crudeCollision(that)) {
                return this.hitboxCollision(that);
            }
            else {
                return false;
            }
        },
        draw: function(context, color) {
            if (typeof color === 'undefined') {var color='rgb(0,0,0)';}
            if (!this.sprite) {
                context.fillStyle=color;
                context.fillRect(this.bounds.top, this.bounds.left, this.outerwidth, this.outerheight);
            }
        },
        shoutInfo: function() {
            console.log(this);
        }    
    },
    DummyObject: function(posX, posY, movable) {
        this.pos = {x: posX, y: posY };
        this.prevpos = {x: posX, y: posY };
        this.movable = movable;
        this.outerwidth = 10;
        this.outerheight= 10;
        this.bounds = {};
        this.calculateBounds();
    },
    PlayerObject: function(posX, posY, movable) {
        this.pos = {x: posX, y: posY };
        this.prevpos = {x: posX, y: posY };
        this.movable = movable;
        this.outerwidth = 10;
        this.outerheight= 10;
        this.bounds = {};
        this.calculateBounds();
        this.draw = function(context) {
            context.fillStyle='rgb(0,255,0)';
            context.fillRect(this.bounds.top, this.bounds.left, this.outerwidth, this.outerheight);
        }
    }
} 
sf.objects.DummyObject.prototype = sf.objects.WorldObject;
sf.objects.PlayerObject.prototype = sf.objects.WorldObject;
