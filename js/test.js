// Simple testing code...
function test() {
    sf.setup.context.fillStyle = "rgb(200, 200, 200)";
    sf.setup.context.fillRect(10, 10, 300, 300);

    sf.testing = {};
    
    sf.testing.stuff = new sf.objects.DummyObject(6, 6, true);
    sf.testing.stuff2 = new sf.objects.DummyObject(9, 9, true);
    sf.testing.stuff.moveBy(1, 1);
    console.log(sf.testing.stuff.collision(sf.testing.stuff2));
    
    sf.testing.player = new sf.objects.PlayerObject(26, 26, true);
    sf.testing.player.draw(sf.setup.context);
}
