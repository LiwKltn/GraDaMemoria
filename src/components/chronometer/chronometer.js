window.onload = function() {
    startChronometer();

    setTimeout(function() {
        stopChronometer();
        redirectToGameOver();
    }, 600000);
};

let timerInterval;

function startChronometer() {
    let milliseconds = 0;
    timerInterval = setInterval(function() {
        milliseconds += 10;
        updateTimer(milliseconds);
    }, 10);
}

function stopChronometer() {
    clearInterval(timerInterval);
}

function updateTimer(milliseconds) {
    const minute = Math.floor(milliseconds / 60000);
    const second = Math.floor((milliseconds % 60000) / 1000);
    const millisecond = milliseconds % 1000;

    document.querySelector('.minute').innerText = minute.toString().padStart(2, '0');
    document.querySelector('.second').innerText = second.toString().padStart(2, '0');
    document.querySelector('.millisecond').innerText = millisecond.toString().padStart(3, '0');
}

function redirectToGameOver() {
    window.location.href = 'aquí poner página gameover';
}
