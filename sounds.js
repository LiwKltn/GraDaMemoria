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
        const soundIconImg = audio.paused ? '/src/assets/img/sin-sonido.png' : '/src/assets/img/sin-sonido.png';
        const musicIconImg = audio.paused ? '/src/assets/img/sin-musica.png' : '/src/assets/img/sin-musica.png';

        soundIcon.innerHTML = `<img src="${soundIconImg}" alt="icono de sonido" style="width: 30px; height: 30px;">`;
        musicIcon.innerHTML = `<img src="${musicIconImg}" alt="icono de musica" style="width: 30px; height: 30px;">`;
    }

    updateIcons();
});

