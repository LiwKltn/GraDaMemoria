let contentCard = document.getElementById("content-cards");
let generatedIds = new Map();
let cardsSelected = localStorage.getItem("gameNumPairs");
let gameTheme = localStorage.getItem("gameTheme");
let numberOfPairs = cardsSelected/2;

async function getData() {
  const urlHtml = "../../../public/json/card-content.json";
  const response = await fetch(urlHtml);
  const data = await response.json();

  if (data.err) {
    console.log("Error accessing JSON");
    return;
  }
  return data;
}

function printElement(data, i) {
  let elementArray = document.createElement("h2");
  elementArray.setAttribute(
    "class",
    "element w-full h-full font-Minnie text-xs md:text-base flex flex-wrap justify-center items-center text-center"
  );
 
  elementArray.textContent = data.elements[i].element;
  return elementArray;
  
}

function printExplanation(data, i) {
  let explanationArray = document.createElement("h2");
  explanationArray.setAttribute(
    "class",
    "element flex font-mono text-xs md:text-sm italic text-center font-bold p-2"
);

  explanationArray.textContent = data.elements[i].explanation;
  return explanationArray;
  
}

function printCard(data, id) {
  let containerNewCard = document.createElement("div");
  let containerNewCardPair = document.createElement("div");
  let newCard = document.createElement("article");
  let newCardPair = document.createElement("article");
  let cardImage = document.createElement("img");
  cardImage.src =
    "../../assets/img/card-image.png";

  containerNewCard.setAttribute("class",  "container-card relative m-2 h-18 md:h-28 w-16 md:w-24");

  containerNewCardPair.setAttribute(
    "class",
    "container-card relative m-2 h-28 md:h-28 w-16 md:w-24"
  );

  newCard.setAttribute(
    "class",
    "flip-card-back flex absolute rounded-xl justify-center items-center shadow-xl cursor-pointer w-full h-full");

  newCardPair.setAttribute(
    "class","flip-card-back flex absolute rounded-xl justify-center items-center shadow-xl cursor-pointer w-full h-full");

  cardImage.setAttribute("class", "flip-card-front  inset-0 rounded-xl absolute object-cover cursor-pointer w-full h-full");

  newCard.classList.add("card");
  newCardPair.classList.add("pair");

  let cardImageCopy = cardImage.cloneNode(true);

  let cardId = id;
  newCard.setAttribute("id", cardId);

  let pairId = id;
  newCardPair.setAttribute("id", pairId);
  

  if (newCard.id === newCardPair.id) {
    let colorClass = randomColor();
    newCard.classList.add(colorClass);
    newCardPair.classList.add(colorClass);
  } 

  contentCard.appendChild(containerNewCard);
  contentCard.appendChild(containerNewCardPair);
  containerNewCard.appendChild(newCard);
  containerNewCard.appendChild(cardImage);
  containerNewCardPair.appendChild(newCardPair);
  containerNewCardPair.appendChild(cardImageCopy);

  let elementTag = printElement(data, id);
  let elementExplanation = printExplanation(data, id);

  newCard.appendChild(elementTag);
  newCardPair.appendChild(elementExplanation);
}

function shuffleCards() {
  let container = document.getElementById("content-cards");

  let cards = document.querySelectorAll(".container-card");


  for (let i = cards.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    container.insertBefore(cards[randomIndex], cards[i]);
  }
}

function randomHtml() {
  return Math.floor(Math.random() * 50);
}

function randomCss() {
  return Math.floor(Math.random() * 51) + 50;
}

function randomJs() {
  return Math.floor(Math.random() * 69) + 100;
}

function randomAllThemes() {
  return Math.floor(Math.random() * 168);
}

function randomColor(){
  let colors = ["bg-teal-400", "bg-cyan-400", "bg-lime-300", "bg-red-700", "bg-pink-600", "bg-fuchsia-600", "bg-orange-400", "bg-yellow-300"]
  let id = Math.floor(Math.random() * (8));
  return colors[id];
}


async function generateCards(theme, cards) {
  const data = await getData();

  for (let i = 0; i < cards; i++) {
    let newId;
    do {
      newId = getRandomId(theme);
    } while (generatedIds.has(newId));

    const index = generatedIds.size; 

    generatedIds.set(newId, index);
    printCard(data, newId);
  }
}

function getRandomId(theme) {
  if (theme === "HTML") return randomHtml();
  if (theme === "CSS") return randomCss();
  if (theme === "JS") return randomJs();
  return randomAllThemes();
}

function cardsDisplay(){
  if (numberOfPairs === 6){
    contentCard.setAttribute("class", "grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 justify-center items-center");
  } else if (numberOfPairs === 12){
    contentCard.setAttribute("class", "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center items-center");
  } else {
    contentCard.setAttribute("class", "grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 justify-center items-center");
  }
}


async function init() {
  await generateCards(gameTheme, numberOfPairs);
  shuffleCards();
  cardsDisplay();
}
init();

let hits = 0;
let mistakes = 0;


function makingPairs() {
  let isBusy = false; 

  let firstCard = null;
  let secondCard;
  let firstContainer;
  let secondContainer;

  contentCard.addEventListener("click", (event) => {
    if (isBusy) {
      return;
    }

    let clickedContainer = event.target.closest(".container-card");
    let clickedCard = clickedContainer.querySelector("article");

    if (clickedContainer && !clickedContainer.classList.contains("disappear")) {
      clickedContainer.classList.add("flip-card");

      if (firstCard === null) {
        firstCard = clickedCard;
        firstContainer = clickedContainer;
      } else {
        isBusy = true;  
        secondCard = clickedCard;
        secondContainer = clickedContainer;

        if (secondCard.id === firstCard.id) {
          hits++;
          setTimeout(() => {
            firstCard.classList.add("disappear");
            secondCard.classList.add("disappear");
            resetCards();
          }, 3000);
        } else {
          mistakes++;
          setTimeout(() => {
            firstContainer.classList.remove("flip-card");
            secondContainer.classList.remove("flip-card");
            resetCards();
          }, 2000);
        }
      }
    }
  });

  function resetCards() {
    firstCard = null;
    secondCard = null;
    firstContainer = null;
    secondContainer = null;
    isBusy = false;
  }
}

makingPairs();


function points(timer, cards) {
  let time = timer;
  let validHits = hits - mistakes;
  let hitPorcentual = validHits / cards * 100;
  let total;

  if (validHits < 0) {
    validHits = 0;
  }

  if (timer === 0) {
    total = 0;
  }

  if (cards === 12) {
    total = hitPorcentual * time;
  } else if (cards === 24) {
    total = hitPorcentual * (time * 2);
  } else {
    total = hitPorcentual * (time * 3);
  }

  return total;
}


points(30, 12);

radioButtons = document.querySelectorAll("input[name='answer']");
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        game.setNumPairs(this.value);
    });
});

radioButtons = document.querySelectorAll("input[name='answerTheme']");
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function() {
        game.setTheme(this.value);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('audioPlayer');
  const soundIcon = document.getElementById('soundIcon');
  const musicIcon = document.getElementById('musicIcon');
  const instructionsIcon = document.getElementById('instructionsIcon'); 

  soundIcon.addEventListener('click', toggleSound);
  musicIcon.addEventListener('click', initiateMusic);
  instructionsIcon.addEventListener('click', function() { 
      window.location.href = '../../pages/instructions/instructions.html'; 
  });

  function toggleSound() {
      audio.paused ? audio.play() : audio.pause();
      updateIcons();
  }

  function initiateMusic() {
      audio.play();
      updateIcons();
  }

  function updateIcons() {
      const soundIconImg = audio.paused ? 'img/sin-sonido.png' : 'img/sin-sonido.png';
      const musicIconImg = audio.paused ? 'img/sin-musica.png' : 'img/sin-musica.png';

      soundIcon.innerHTML = `<img src="${soundIconImg}" alt="icono de sonido" style="width: 30px; height: 30px;">`;
      musicIcon.innerHTML = `<img src="${musicIconImg}" alt="icono de musica" style="width: 30px; height: 30px;">`;
  }

  updateIcons();
});

let game = {
  config:{
      remainTime:5*60 //5min de juego = 5x60seg
  },
  util: {
      getHHMMSSFromSeconds: function(seconds, renderHours){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const timeFormat = [];
          if(renderHours)
              timeFormat.push(String(hours).padStart(2, '0'));
          timeFormat.push(String(minutes).padStart(2, '0'));
          timeFormat.push(String(remainingSeconds).padStart(2, '0'));

    return timeFormat.join(':');
      }
  },
  remainingTime: 0,
  setRemainingTime: function(){
      this.remainingTime = this.config.remainTime;
  },
  intervalId: null,
  
  startCountdown: function(){
      document.getElementById("countDown").classList.remove("criticalTime")
      this.setRemainingTime();
      let _this = this;
      this.intervalId = setInterval(() => {
          _this.remainingTime--;
          if (_this.remainingTime===0)
              _this.clearPlayedGameInterval();
          else if(_this.remainingTime <= 5){
              //Añadir efecto crítico te quedas sin tiempo y vas a perder.
              document.getElementById("countDown").setAttribute("class", "criticalTime")
          }
          //En todos los casos debemos renderizar el tiempo de juego restante
          _this.renderRemainingTime();

      },1000);
  },

  clearPlayedGameInterval: function(){
      clearInterval(this.intervalId)
  },
  
  getFormatedElapsedTime: function(){

  },
  renderRemainingTime: function(){
      let result = game.util.getHHMMSSFromSeconds(this.remainingTime);
      document.getElementById("countDown").innerHTML = result;
      
  }
}

document.addEventListener('DOMContentLoaded', function () {
    let returnButton = document.getElementById('return-button');

    returnButton.addEventListener('click', function () {
        
        window.location.href = '../../pages/config/config.html';
    });
});


