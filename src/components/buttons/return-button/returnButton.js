

document.addEventListener('DOMContentLoaded', function() {
    const returnButton = document.getElementById("returnButton");
    const sound = new Audio("../../../assets/sounds/click-button.mp3");
 
    returnButton.addEventListener('click', (e) => {
        sound.play();
        
    });
 });