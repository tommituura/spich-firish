sf.objects.TerrainObject = function(x, y, width, height) {
    var posX = x + width/2;
    var posY = y + height/2;
    this.init(posX, posY, false, width, height, true);
};
sf.objects.TerrainObject.prototype = sf.objects.GameObject;