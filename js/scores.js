sf.scores = (function() {
    var scores = [];
    
    var syncScores = function() {
    };
    
    
    var checkScore = function(levels, time) {
        if (scores.length < 10) {
            return true;
        }
        for (var i=0; i<scores.length && i<10; i++) {
            if (scores[i].levels <= levels && scores[i].time < time) {
                return true
            }
        }
        return false;
    };
    
    var addScore = function(name, levels, time) {
        scores.push({name: name, levels: levels, time:time});
        /*
        var newscores = [];
        var i = 0;
        for (;i<scores.length;i++) {
            if (scores[i].levels > levels || scores[i].time >= time) {
                newscores.push(scores[i]);
            } else {
                break;
            }
        } 
        if (i < 10) {
            newscores.push({name: name, levels: levels, time:time})
            for (;i<scores.length;i++) {
                newscores.push(scores[i]);
            }
        }*/
    };
    
    var getScores = function() {
        console.log(scores);
        return scores;
    };
    
    return {
        checkScore: checkScore,
        addScore: addScore,
        scores: getScores
    }
})();
