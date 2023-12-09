let contentCard = document.getElementById("content-cards");
let generatedIds = new Map();
let clickedContainers = document.querySelectorAll(".container-card"); // Mova a declaração aqui
// clickedContainers.forEach(card => card.addEventListener('click', makingPairs));


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

  containerNewCard.setAttribute("class",  "container-card relative m-2 h-28 md:h-28 w-16 md:w-24");

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
  let colorCard = randomColor();
  console.log(colorCard);

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
  await generateCards("htfgml", 2);
  shuffleCards();
}
init();


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function makingPairs() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip-card");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.id === secondCard.id;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', makingPairs);
  secondCard.removeEventListener('click', makingPairs);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip-card");
    secondCard.classList.remove("flip-card");
    lockBoard = false;
  }, 1500); // Ajuste o tempo conforme necessário
}

clickedContainers.forEach(card => card.addEventListener('click', makingPairs));

    
   
    
//     const clicked = clickedContainer.querySelector("article");
//     console.log(clicked)
//     if (clickedContainer) {
//       clickedContainer.classList.add("flip-card");
    
//       if (cardId === null) {
//         cardId = clickedId;
//       } else {
//         if (clickedId === cardId) {

//           hits++;
//           // clickedContainer.setAttribute("class", "");

//         } else {
//           console.log("Mistake! Card ID:", clickedId);
//           mistakes++;
//           setTimeout(() => {
//             clickedContainer.classList.remove("flip-card");
//           }, 1000); // Ajuste o tempo conforme necessário
//         }

//         // Resetar cardId para null para a próxima jogada
//         cardId = null;
//       }
//     }
//   });
// }

// makingPairs();


// let clickedContainer = document.querySelectorAll(".container-card");


//  const clickedId = clickedContainer.querySelector("article").id;

// const cards = document.querySelectorAll('.container-card');

//   let hasFlippedCard = false;
//   let firstCard, secondCard;

//   function flipCard() {
//     this.classList.add('flip-card');

//     if (!hasFlippedCard) {
//       hasFlippedCard = true;
//       firstCard = this;
//      return;
//    }

//    secondCard = this;
//    hasFlippedCard = false;

//    checkForMatch();
//  }

//  function checkForMatch() {
//    if (firstCard.dataset.framework === secondCard.dataset.framework) {
//      disableCards();
//      return;
//    }

//    unflipCards();
//  }

//  function disableCards() {
//    firstCard.removeEventListener('click', flipCard);
//    secondCard.removeEventListener('click', flipCard);
//  }

//  function unflipCards() {
//    setTimeout(() => {
//      firstCard.classList.remove('flip-card');
//      secondCard.classList.remove('flip-card');
//    }, 1500);
//  }

//   cards.forEach(card => card.addEventListener('click', flipCard));