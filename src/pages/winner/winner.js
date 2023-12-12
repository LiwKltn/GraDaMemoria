let cardsSelected = localStorage.getItem("gameNumPairs");
let gameTheme = localStorage.getItem("gameTheme");
let username = localStorage.getItem("gameUserName");
let exitButton = document.getElementById('exit-button');
let newGame = document.getElementById('newgame-button');
let listWinners = document.getElementById("ranking");

let rankingEntries = localStorage.getItem("highRankings");

rankingEntries = JSON.parse(rankingEntries);

rankingEntries.forEach(entry => {
  const liElement = document.createElement("li");
  liElement.setAttribute(
    "class",
    "w-full h-full p-3 font-mono italic font-bold flex flex-wrap text-center text-xl"
);
  liElement.textContent = `${entry.userName}, Puntos: ${entry.points}`;
  listWinners.appendChild(liElement);
});

listWinners.innerHTML(rankingEntries);


