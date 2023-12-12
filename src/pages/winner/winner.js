let cardsSelected = localStorage.getItem("gameNumPairs");
let gameTheme = localStorage.getItem("gameTheme");
let username = localStorage.getItem("gameUserName");
let exitButton = document.getElementById('exit-button');
let newGame = document.getElementById('newgame-button');
let listWinners = document.getElementById("ranking");
let rankingEntries = localStorage.getItem("highRankings");

listWinners.innerHTML(rankingEntries);

exitButton.addEventListener('click', function () {
 window.location.href = `/index.html`;
});

newGameButton.addEventListener('click', function () {
 window.location.href = `../config/config.html`; 
});


