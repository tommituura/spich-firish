sf.scores = (function() {
    var maximumNumberOfScores = 10;
    var scores = [];
    
    var serverSendScore = function(newScore) {
        $.ajax({
            type: "POST",
            url: sf.setup.scoreApiUrl + 'add/',
            data: JSON.stringify(newScore)
        });
    };
    
    var serverFetchScore = function() {
        $.getJSON(sf.setup.scoreApiUrl + '?maxValues=' + maximumNumberOfScores, function(data) {
            scores = data.sort(scoreComparator).slice(0, maximumNumberOfScores);
        });
    }
    
    var scoreComparator = function(a, b) {
        if (parseInt(a.levels) > parseInt(b.levels)) {
            return -1;
        } else if (parseInt(a.levels) < parseInt(b.levels)) {
            return 1;
        } else if( parseInt(a.time) < parseInt(b.time) ) {
            return -1;
        } else if (parseInt(a.time) > parseInt(b.time)) {
            return 1;
        } else {
            return 0;
        }
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
        return makesIt;
    };
    
    var addScore = function(name, levels, time) {
        var newScore = {name: name, levels: levels, time:time};
        scores.push(newScore);
        scores.sort(scoreComparator);
        scores = scores.slice(0, maximumNumberOfScores);
        serverSendScore(newScore);
    };
    
    var getScores = function() {
        serverFetchScore();
        scores.sort(scoreComparator);
        sf.debug(scores);
        return scores;
    };
    
    return {
        checkScore: checkScore,
        addScore: addScore,
        scores: getScores,
        syncServer: serverFetchScore
    }
})();
