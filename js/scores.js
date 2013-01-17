sf.scores = (function() {
    var maximumNumberOfScores = 3;
    var scores = [];
    
    var syncScores = function() {
    };
    
    var scoreComparator = function(a, b) {
        //var rval = 0;
        if (a.levels > b.levels) {
            return -11;
        } else if (a.levels < b.levels) {
            return 1;
        } else if( a.time < b.time ) {
            return -1;
        } else if (a.time > b.time) {
            return 1;
        } else {
            return 0;
        }
        //console.log(rval, a, b);
    }
    
    var checkScore = function(levels, time) {
        var makesIt = false;
        if (scores.length < maximumNumberOfScores) {
            makesIt = true;
        }
        var newscore = {levels: levels, time:time};
        
        for (var i=0;i<scores.length && i < maximumNumberOfScores;i++) {
            if (scoreComparator(newscore, scores[i]) < 0) {
                makesIt = true;
            }
        }
        console.log('makesIt: ', makesIt);
        return makesIt;
    };
    
    var addScore = function(name, levels, time) {
        scores.push({name: name, levels: levels, time:time});
        scores.sort(scoreComparator);
        scores = scores.slice(0, maximumNumberOfScores);
    };
    
    var getScores = function() {
        sf.debug(scores);
        return scores;
    };
    
    return {
        checkScore: checkScore,
        addScore: addScore,
        scores: getScores
    }
})();
