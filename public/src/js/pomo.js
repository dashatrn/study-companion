let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let resetBtn = document.getElementById("btn-reset");
let pauseBtn = document.getElementById("btn-pause");
let time = document.getElementById("time");
let timerInterval;
let active = "focus";
let paused = true;
let minCount, count;

const setTime = (minutes) => {
    minCount = minutes;
    count = 0; // Reset seconds to 0 for a clean start
    time.textContent = `${appendZero(minutes)}:00`;
    saveStateToLocalStorage(); // Save the initial state
};

const appendZero = (value) => {
    return value < 10 ? `0${value}` : value;
};

const updateTimerDisplay = () => {
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
};

const showElement = (element) => {
    element.classList.remove("hide");
    element.classList.add("show");
};

const hideElement = (element) => {
    element.classList.add("hide");
    element.classList.remove("show");
};

const saveStateToLocalStorage = () => {
    const state = {
        mode: active,
        paused: paused,
        minCount: minCount,
        count: count
    };
    localStorage.setItem('timerState', JSON.stringify(state));
};

const loadStateFromLocalStorage = () => {
    const savedState = JSON.parse(localStorage.getItem('timerState'));
    if (savedState) {
        active = savedState.mode;
        paused = true; // Ensure the timer is set to a "ready to start" state on reload
        minCount = savedState.minCount;
        count = savedState.count;
        updateTimerDisplay();
        buttons.forEach(btn => btn.classList.remove("btn-focus"));
        document.getElementById(`${active}`).classList.add("btn-focus");
    } else {
        // Default to focus mode if no saved state
        setTime(25);
    }
    // Always show the start button and hide pause/reset buttons on reload
    showElement(startBtn);
    hideElement(pauseBtn);
    hideElement(resetBtn);
};

const startTimer = () => {
    if (paused && !timerInterval) {
        paused = false;
        clearInterval(timerInterval); // Clear any existing interval as a precaution
        timerInterval = setInterval(() => {
            if (count === 0) {
                if (minCount === 0) {
                    clearInterval(timerInterval);
                    alert("Time is up!");
                    pauseTimer(); // Automatically pause timer when it reaches 0
                } else {
                    minCount--;
                    count = 59;
                }
            } else {
                count--;
            }
            updateTimerDisplay();
            saveStateToLocalStorage(); // Save state after each tick
        }, 1000);

        hideElement(startBtn);
        showElement(pauseBtn);
        showElement(resetBtn);
    }
};

const pauseTimer = () => {
    paused = true;
    clearInterval(timerInterval);
    timerInterval = null; // Clear the interval reference

    showElement(startBtn);
    hideElement(pauseBtn);
    hideElement(resetBtn);

    saveStateToLocalStorage(); // Save state on pause
};

const resetTimer = () => {
    pauseTimer(); // Stop the timer and show the start button
    setTime(active === "focus" ? 25 : active === "shortbreak" ? 5 : 15); // Reset to appropriate time
    saveStateToLocalStorage(); // Save state on reset
};

focusButton.onclick = () => {
    active = "focus";
    buttons.forEach(btn => btn.classList.remove("btn-focus"));
    focusButton.classList.add("btn-focus");
    resetTimer();
};

shortBreakButton.onclick = () => {
    active = "shortbreak";
    buttons.forEach(btn => btn.classList.remove("btn-focus"));
    shortBreakButton.classList.add("btn-focus");
    resetTimer();
};

longBreakButton.onclick = () => {
    active = "longbreak";
    buttons.forEach(btn => btn.classList.remove("btn-focus"));
    longBreakButton.classList.add("btn-focus");
    resetTimer();
};

pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
startBtn.onclick = startTimer;

// Load the saved state when the page loads
document.addEventListener('DOMContentLoaded', loadStateFromLocalStorage);
