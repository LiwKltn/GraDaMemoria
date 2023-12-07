let contentCard = document.getElementById("content-cards");
let card = document.getElementById("card");
let element = document.getElementById("element");
let elementArray = document.getElementsByClassName("element");

const urlCss = '../../../public/json/css.json'

function getData(i) {
    return fetch(urlCss)
        .then(response => response.json())
        .then(data => {
            if (data.err) {
                console.log("Error to access JSON");
                return;
            }
            let cardAmount = data.propiedadesCSS.length;
            console.log("quantidade de elementos: " + cardAmount);
            return data;
        });
}

function printElement(data, i) {
    let elementArray = document.createElement("h2");
    elementArray.setAttribute('class', 'element font-Minnie text-3xl text-center');
    elementArray.textContent = data.propiedadesCSS[i].nombre;
    return elementArray;
}

function printExplanation(data, i) {
    let explanationArray = document.createElement("h2");
    explanationArray.setAttribute('class', 'element font-mono text-lg italic m-2 text-center font-bold');
    explanationArray.textContent = data.propiedadesCSS[i].descripcion;
    return explanationArray;
}

function printCard(data, id) {
    let newCard = document.createElement("article");
    let newCardPair = document.createElement("article");

    newCard.setAttribute('class', 'element flex bg-lime-300 w-36 h-52 rounded justify-center items-center');
    newCardPair.setAttribute('class', 'element flex bg-lime-300 w-36 h-52 mt-2 rounded justify-center items-center');

    // Adiciona as classes
    newCard.classList.add("card");
    newCardPair.classList.add("pair");

    contentCard.appendChild(newCard)
    contentCard.appendChild(newCardPair);

    let elementTag = printElement(data, id);
    let elementExplanation = printExplanation(data, id);

    newCard.appendChild(elementTag);
    newCardPair.appendChild(elementExplanation);
}

getData(3).then(data => printCard(data, 3));
getData(5).then(data => printCard(data, 5));
getData(6).then(data => printCard(data, 6));
getData(3).then(data => printCard(data, 3));
getData(5).then(data => printCard(data, 5));
getData(6).then(data => printCard(data, 6));
getData(3).then(data => printCard(data, 3));
getData(5).then(data => printCard(data, 5));
getData(6).then(data => printCard(data, 6));
