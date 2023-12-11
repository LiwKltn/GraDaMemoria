let gameName = localStorage.getItem("gameUserName");

if (gameName !== null) {
  let welcome = document.getElementById("welcomeMessage");
  welcome.textContent = `Bienvenido(a), ${gameName}!`;
} else {
  console.log("O userName não foi encontrado no localStorage.");
}

let game = {
  config: {
    numPairs: 0,
    theme: ""
  },
  setNumPairs: function (numPairs) {
    this.config.numPairs = parseInt(numPairs, 10);
    localStorage.setItem("gameNumPairs", parseInt(numPairs, 10));
  },
  getNumPairs: function (numPairs) {
    return this.config.numPairs;
  },
  setTheme: function (theme) {
    this.config.theme = theme;
    localStorage.setItem("gameTheme", theme);
  },
  getTheme: function () {
    return this.config.theme;
  }
};

let radioButtons = document.querySelectorAll("input[name='answer']");
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', function () {
    game.setNumPairs(this.value);
  });
});

radioButtons = document.querySelectorAll("input[name='answerTheme']");
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', function () {
    game.setTheme(this.value);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  let newGameButton = document.getElementById('go-button');
  let returnButton = document.getElementById('return-button');

  newGameButton.addEventListener('click', function () {
    if (game.getNumPairs() === 0 || game.getTheme() === "") {
      let message = document.createElement("h3");
      message.innerHTML = "Debes elegir un número de cartas y un tema.";
      message.setAttribute("class", "font-mono text-lg text-italic text-center mt-3 text-red-900 animate-pulse");
      message.classList.add("ping");

      document.body.appendChild(message);

      setTimeout(function () {
        message.remove();
      }, 4000);
    } else {
      window.location.href = '../../pages/game/game.html';
    }
  });

  returnButton.addEventListener('click', function () {
    window.location.href = '../../../index.html';
  });
});
