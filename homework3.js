

player.showHighScoreList = function(pageToken, requestProcessor, handleError) {
    document.querySelector('#highScoreListDiv').innerHTML = '';
    document.querySelector('#highScoreListDiv').style.display = 'block';
    // Create the request.
    LEADERBOARD_ID = document.getElementById('leaderboardIdShowHS').value;
    var request = requestProcessor(
        {leaderboardId: LEADERBOARD_ID,
            collection: 'PUBLIC',
            timeSpan: 'all_time',
            pageToken: pageToken,
            maxResults: '10'});
    request.execute(
        function(response) {
            console.log('High score', response);
            if (response.error) {
                handleError(response);
                return;
            }
            var root = document.getElementById('highScoreListDiv');
            player.createPlayerList(root, response.items, true);
            if (response.prevPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value);
                        }));
            }
            if (response.nextPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value);
                        }));
            }
        });
};


// для продакшн кода
var requestProcessorForProduction = gapi.client.games.scores.list;
var handleErrorForProduction = function (response) {
    alert('Error ' + response.error.code + ': ' + response.message);
};
player.showHighScoreList(pageToken, requestProcessorForProduction, handleErrorForProduction)



// для тетсов
var requestProcessorForTesting = function(params) {
    function execute(f) {
        //...
    }
};
var handleErrorForTesting = function (response) {
    //..
}
player.showHighScoreList(pageToken, requestProcessorForTesting, handleErrorForTesting)
