document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audioPlayer');
    const soundIcon = document.getElementById('soundIcon');
    const musicIcon = document.getElementById('musicIcon');
    const instructionsIcon = document.getElementById('instructionsIcon'); 

    soundIcon.addEventListener('click', toggleSound);
    musicIcon.addEventListener('click', initiateMusic);
    instructionsIcon.addEventListener('click', function() { 
        window.open('../../pages/instructions/instructions.html','targetWindow',
        `toolbar=no,
         location=no,
         status=no,
         menubar=no,
         scrollbars=no,
         resizable=yes,
         width=450,
         height=600`);; 
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
        const soundIconImg = audio.paused ? 'img/sin-sonido.png' : 'img/sin-sonido.png';
        const musicIconImg = audio.paused ? 'img/sin-musica.png' : 'img/sin-musica.png';

        soundIcon.innerHTML = `<img src="${soundIconImg}" alt="icono de sonido" style="width: 30px; height: 30px;">`;
        musicIcon.innerHTML = `<img src="${musicIconImg}" alt="icono de musica" style="width: 30px; height: 30px;">`;
    }

    updateIcons();
});

