let contentCard = document.getElementById("content-cards");
let generatedIds = new Map();

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
  67a2b72708e344402014a50b068283d87a8ada10
  return elementArray;
  
}

function printExplanation(data, i) {
  let explanationArray = document.createElement("h2");
  explanationArray.setAttribute(
    "class",
    "element flex flex-wrap p-1 font-mono text-xs md:text-base italic text-center font-bold"
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
    "https://img.freepik.com/free-photo/3d-rendering-optical-illusion_23-2150854149.jpg?w=740&t=st=1702051950~exp=1702052550~hmac=3efef74efb1008d874039b2e42742c44d824c70af120fd7d428e7bd6a06a36b7";

  containerNewCard.setAttribute("class",  "container-card relative m-2 h-18 md:h-28 w-16 md:w-24");

  containerNewCardPair.setAttribute(
    "class",
    "container-card relative m-2 h-28 md:h-28 w-16 md:w-24"
  );

  newCard.setAttribute(
    "class",
    "flip-card-back flex absolute inset-0 rounded-xl justify-center items-center shadow-xl cursor-pointer w-full h-full");

  newCardPair.setAttribute(
    "class","flip-card-back flex absolute inset-0 rounded-xl justify-center items-center shadow-xl cursor-pointer w-full h-full");

  cardImage.setAttribute("class", "flip-card-front rounded-xl absolute inset-0 object-cover shadow-xl cursor-pointer w-full h-full");

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
  // Get the container for cards
  let container = document.getElementById("content-cards");

  // Get all cards and their pairs
  let cards = document.querySelectorAll(".container-card");

  // Shuffle the cards in place using the Fisher–Yates shuffle algorithm
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
  let halfOfCards = cards / 2;

  const data = await getData();

  for (let i = 0; i < halfOfCards; i++) {
    let newId;
    do {
      newId = getRandomId(theme);
    } while (generatedIds.has(newId));

    const index = generatedIds.size; // Obter o próximo índice no array

    generatedIds.set(newId, index);
    printCard(data, newId);
  }
}

function getRandomId(theme) {
  if (theme === "html") return randomHtml();
  if (theme === "css") return randomCss();
  if (theme === "javascript") return randomJs();
  return randomAllThemes();
}

async function init() {
  await generateCards("htfgml", 12);
  shuffleCards();
}
init();

let hits = 0;
let mistakes = 0;
function makingPairs() { 
  let firstCard = null;
  let secondCard; 
  let firstContainer;
  let secondContainer;

  contentCard.addEventListener("click", (event) => {
    let clickedContainer = event.target.closest(".container-card");
    let clickedCard = clickedContainer ? clickedContainer.querySelector("article") : null;
  
    if (clickedContainer) {
      clickedContainer.classList.add("flip-card");
      
      if (firstCard === null) {
        // Se cardId for null, é a primeira carta virada
        firstCard = clickedCard;
        firstContainer = clickedContainer;
  
        return;
      } else {
        secondCard = clickedCard;
        secondContainer = clickedContainer;
      }

        // É a segunda carta virada, comparar com a primeira
        if (secondCard.id === firstCard.id) {
          console.log(secondCard)
          console.log(firstCard)

          // console.log("Hit! Card ID:", cardId);
          hits++;
          setTimeout(() => {
            firstContainer.classList.add("disappear");
            secondContainer.classList.add("disappear");
            firstCard.classList.add("disappear")
            secondCard.classList.add("disappear");
            return
          }, 3000); // Ajuste o tempo conforme necessário
          
        } else {
          // console.log("Mistake! Card ID:", clickedId);
          mistakes++;
          setTimeout(() => {
            firstCard = null;
            clickedContainer.classList.remove("flip-card");
            secondCard = null;
            firstContainer.classList.remove("flip-card")
          }, 2000); 
        }    
      }
  });
}


makingPairs();


function points(timer, cards){
  let time =  timer;
  let validHits = hits - mistakes;
  let hitPorcentual = validHits/cards * 100;
  let total;

  if (validHits < 0){
    validHits = 0
  }

  if (timer = 0){
    total = 0;
  }

  if (cards === 12){
    total = hitPorcentual * time;
  } else if (cards === 24){
    total = hitPorcentual * (time * 2);
  } else {
    total = hitPorcentual * (time * 3);
  }

  if (total < 0){
    total = 0;
  }

  return total;
}
console.log(points(30, 12))
points(30, 12);


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
      const soundIconImg = audio.paused ? '../../assets/img/sin-sonido.png' : '../../assets/img/sin-sonido.png';
      const musicIconImg = audio.paused ? '../../assets/img/sin-musica.png' : '../../assets/img/sin-musica.png';

      soundIcon.innerHTML = `<img src="${soundIconImg}" alt="icono de sonido" style="width: 30px; height: 30px;">`;
      musicIcon.innerHTML = `<img src="${musicIconImg}" alt="icono de musica" style="width: 30px; height: 30px;">`;
  }

  updateIcons();
});

