document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    const separationFactor = -0.20; 
  
    cards.forEach((card, index) => {
      if (index !== 0) {
        const maxX = window.innerWidth - card.clientWidth;
        const maxY = window.innerHeight - card.clientHeight;
  
        const adjustedX = Math.random() * (maxX - card.clientWidth * separationFactor);
        const adjustedY = Math.random() * (maxY - card.clientHeight * separationFactor);
  
        card.style.position = 'fixed';
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
  

document.getElementById("nombreInput").addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    window.location.href = './src/pages/config/config.html';
  }
});
  
