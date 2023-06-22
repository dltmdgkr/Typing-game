let GAME_TIME = 6;
let time = GAME_TIME;
let isplaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const score = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
    getWords();
    wordInput.addEventListener('input', checkMatch);
};

button.addEventListener('click', () => {
    if(isplaying) {
        return;
    }
    isplaying = true;
    time = GAME_TIME;
    wordInput.focus();
    score.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중');
});

function checkStatus() {
    if(!isplaying && time === 0) {
        buttonChange('게임시작');
        clearInterval(checkInterval);
    }
};

function getWords() {
    words = ['Hello', 'Banana', 'Apple', 'Cherry', 'Dayoung'];
    wordDisplay.innerText = words[Math.floor(Math.random() * words.length)]; 
    buttonChange('게임시작');
};

function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if(!isplaying) {
            return;
        }
        score.innerText = Number(score.innerText) + 1;
        time = GAME_TIME;
        wordDisplay.innerText = words[Math.floor(Math.random() * words.length)];
    }
};

function countDown() {
    time > 0 ? time-- : isplaying = false;
    if(!isplaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
};

function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
};
