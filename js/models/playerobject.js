
sf.objects.PlayerObject = function(posX, posY, movable) {
    this.init(posX, posY, movable, 10, 10);
    this.draw = function(context) {
        context.fillStyle='rgb(0,255,0)';
        context.fillRect(this.bounds.left, this.bounds.top, this.outerwidth, this.outerheight);
    }/*
    this.tick = function(controlEvents) { // this function should move the player object.
    }*/
}
sf.objects.PlayerObject.prototype = sf.objects.GameObject;
