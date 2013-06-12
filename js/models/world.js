sf.levels = (function () {
    var levels;

    levels = [];

    var initLevel = function (levelFile, levelIndex) {
        $.getJSON(levelFile, function (oneLevelData) {
            var isReady, i;
            sf.debug(levelFile, levelIndex, oneLevelData);
            levels[levelIndex].data = oneLevelData;
            levels[levelIndex].parsed = true;
            isReady = true;
            for (i = 0; i < levels.length; i = i + 1) {
                if (!levels[i].parsed) {
                    isReady = false;
                }
            }
            if (isReady) { sf.debug('Ready now.'); }
            sf.setup.readyToRun = isReady;
        });
    };
    var initWorldCallback = function (data) {
        var i;
        levels = data;
        for (i = 0; i < levels.length; i = i + 1) {
            levels[i].parsed = false;
            initLevel(levels[i].file, i);
        }
    };
    // This function takes the filename which has the json files of actual levels... 
    var initWorld = function (mainfile) {
        $.ajaxSetup({cache: false});
        $.getJSON(mainfile, initWorldCallback);
    };
    // This function returns the number of levels available
    var levelCount = function () {
        return levels.length;
    };
    // This returns the asked level.
    var getLevel = function (index) {
        if (levels[index]) {
            return levels[index].data;
        } else {
            return undefined;
        }
    };
    return {
        initWorld: initWorld,
        levelCount: levelCount,
        getLevel: getLevel
    };
}());

