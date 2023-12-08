let contentCard = document.getElementById("content-cards");
let generatedIds = new Set();

async function getData() {
  const urlHtml = "../../../public/json/card-content.json";
  const response = await fetch(urlHtml);
  const data = await response.json();

  if (data.err) {
    console.log("Error accessing JSON");
    return;
  }

  let cardAmount = data.elements.length;
  console.log("Number of elements: " + cardAmount);
  return data;
}

function printElement(data, i) {
  let elementArray = document.createElement("h2");
  elementArray.setAttribute(
    "class",
    "element px-2 font-Minnie text-lg text-center"
  );
  elementArray.textContent = data.elements[i].element;
  
  return elementArray;
  
}

function printExplanation(data, i) {
  let explanationArray = document.createElement("h2");
  explanationArray.setAttribute(
    "class",
    "element font-mono text-base italic text-center font-bold px-2"
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

  containerNewCard.setAttribute("class", "containerCard relative h-48 w-36 m-2");

  containerNewCardPair.setAttribute(
    "class",
    "containerCard relative h-48 w-36 m-2"
  );

  newCard.setAttribute(
    "class",
    "flip-card-back flex absolute inset-0 rounded-xl justify-center items-center shadow-xl cursor-pointer w-full h-full " +
    (randomColor())
  );

  newCardPair.setAttribute(
    "class",
    "flip-card-back flex absolute inset-0 rounded-xl justify-center items-center shadow-xl cursor-pointer w-full h-full " +
      (randomColor())
  );

  cardImage.setAttribute(
    "class",
    "flip-card-front rounded-xl absolute inset-0 object-cover shadow-xl cursor-pointer w-full h-full"
  );

  newCard.classList.add("card");
  newCardPair.classList.add("pair");

  let cardImageCopy = cardImage.cloneNode(true);

  let cardId = `card-${id}`;
  newCard.setAttribute("id", cardId);

  let pairId = `pair-${cardId}`;
  newCardPair.setAttribute("id", pairId);

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
  let cards = document.querySelectorAll(".containerCard");

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


async function generateCards(arg, param) {
  let halfOfCards = param / 2;
  let colorCard = randomColor();
  console.log(colorCard)
  for (let i = 0; i < halfOfCards; i++) {
    let newId;
    do {
      newId = getRandomId(arg);
    } while (generatedIds.has(newId));

    const data = await getData();
    generatedIds.add(newId);

    printCard(data, newId);
  }
}

function getRandomId(arg) {
  if (arg === "html") return randomHtml();
  if (arg === "css") return randomCss();
  if (arg === "javascript") return randomJs();
  return randomAllThemes();
}

async function init() {
  await generateCards("html", 30);
  shuffleCards();
}

// Chame a função de inicialização
init();

// Adicionando um evento de clique nos containers existentes
let containers = document.getElementById("content-cards");

containers.addEventListener("click", (event) => {
  let clickedContainer = event.target.closest(".containerCard");
  if (clickedContainer) {
    clickedContainer.classList.add("flip-card");
  }
  setTimeout(() => {
    clickedContainer.classList.remove("flip-card");
  }, 3000); // Ajuste o tempo conforme necessário

});


