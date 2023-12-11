document.addEventListener('DOMContentLoaded', function () {
    var exitButton = document.getElementById('exit-button');

    exitButton.addEventListener('click', function () {
        window.location.href = '/index.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newGameButton = document.getElementById('newgame-button');

    newGameButton.addEventListener('click', function () {
        window.location.href = '../config/config.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newGameButton = document.getElementById('reset-button');

    newGameButton.addEventListener('click', function () {
        window.location.href = '../game/game.html';
    });
}); 
