sf.objects.TerrainObject = function (x, y, width, height) {
    var posX, posY;
    posX = x + width / 2;
    posY = y + height / 2;
    this.init(posX, posY, false, width, height, true);
    this.color = 'rgb(130,130,130)';
};
sf.objects.TerrainObject.prototype = sf.objects.GameObject;
