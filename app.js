document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach((card, index) => {
      if (index !== 0) {
        const randomX = Math.random() * (window.innerWidth - card.clientWidth);
        const randomY = Math.random() * (window.innerHeight - card.clientHeight);
  
        
        const separationFactor = 1.5; 
  
        
        const maxX = window.innerWidth - card.clientWidth * separationFactor;
        const maxY = window.innerHeight - card.clientHeight * separationFactor;
  
        const adjustedX = Math.min(randomX, maxX);
        const adjustedY = Math.min(randomY, maxY);
  
        card.style.position = 'absolute';
        card.style.left = `${adjustedX}px`;
        card.style.top = `${adjustedY}px`;
      }
    });
  });
  
  document.getElementById("nombreInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      iniciarJuego();
    }
  });
  
  function iniciarJuego() {
    var nombreJugador = document.getElementById('nombreInput').value;
    alert('¡Juego iniciado por ' + nombreJugador + '!');
  }
  
 