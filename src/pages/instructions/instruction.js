const sound = new Audio(" ../../../../src/assets/sounds/click-button.mp3");
const returnButton = document.getElementById("return-button");

document.addEventListener('DOMContentLoaded', function() {
    returnButton.addEventListener('click', function() {
        sound.play();
        setTimeout(() => {
            debugger;
            window.close();
        },300)
    });
});