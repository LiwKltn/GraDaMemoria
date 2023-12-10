function initPage(){
    ranking.renderRanking();
}



document.addEventListener('DOMContentLoaded', function () {
    var exitButton = document.getElementById('exit-button');

    exitButton.addEventListener('click', function () {
        window.location.href = '/index.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newGameButton = document.getElementById('newgame-button');

    newGameButton.addEventListener('click', function () {
        
        window.location.href = '/pages/config/config.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newGameButton = document.getElementById('reset-button');

    newGameButton.addEventListener('click', function () {
        
        window.location.href = '/pages/game/game.html';
    });
});