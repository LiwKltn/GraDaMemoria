function iniciarJuego() {
    var nombreJugador = document.getElementById('nombreInput').value;
    alert('¡Juego iniciado por ' + nombreJugador + '!');
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach((card, index) => {
      if (index !== 0) {
        const randomX = Math.random() * (window.innerWidth - card.clientWidth);
        const randomY = Math.random() * (window.innerHeight - card.clientHeight);
  
        card.style.position = 'absolute';
        card.style.left = `${randomX}px`;
        card.style.top = `${randomY}px`;
      }
    });
  });
  