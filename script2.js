// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let running = false;
let interval;
let laps = [];

// DOM elements
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

// Start/Stop function
function startStopwatch() {
    if (running) {
        // If already running, stop the stopwatch
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        running = false;
    } else {
        // If not running, start the stopwatch
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        running = true;
    }
}

// Update the display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);

    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0');

    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    startStopButton.textContent = 'Start';
    running = false;
    elapsedTime = 0;
    display.innerHTML = '00:00:00:000';
    laps = [];
    lapList.innerHTML = '';
}

// Record a lap
function recordLap() {
    if (running) {
        const time = new Date(elapsedTime);
        const hours = String(time.getUTCHours()).padStart(2, '0');
        const minutes = String(time.getUTCMinutes()).padStart(2, '0');
        const seconds = String(time.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0');

        const lapTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
        laps.push(lapTime);

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}
