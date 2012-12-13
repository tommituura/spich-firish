// Simple testing code...
function test() {
    sf.setup.context.fillStyle = "rgb(200, 200, 200)";
    sf.setup.context.fillRect(10, 10, 300, 300);

    var stuff = new sf.objects.DummyObject(6, 6, true);
    var stuff2 = new sf.objects.DummyObject(9, 9, true);
    stuff.moveBy(10, 10);
    console.log(stuff.collision(stuff2));
    
    var player = new sf.objects.PlayerObject(20, 20, true);
    player.draw(sf.setup.context);
}
