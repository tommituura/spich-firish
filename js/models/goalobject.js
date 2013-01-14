sf.objects.GoalObject = function(x, y, width, height) {
    var posX = x;
    var posY = y;
    this.init(posX, posY, false, 20, 20, false);
    this.color = 'rgb(0,255,0)';
};
sf.objects.GoalObject.prototype = sf.objects.GameObject;
