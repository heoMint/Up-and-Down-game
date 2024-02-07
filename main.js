// 랜덤번호 지정 ✅
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름 ✅
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.✅
// 랜덤번호가 < 유저번호 Down! ✅
// 랜덤번호가 > 유저번호 Up! ✅
// Rest 버튼을 누르면 게임이 리셋 ✅
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 비활성화 disable) ✅
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다. ✅
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.✅
let randomNum = 0;
let resultText = document.getElementById('result-area');
let chanceArea = document.getElementById('chances-area');
let userInput = document.getElementById('user-input');
let playButton = document.querySelector('.play-button');
let playResetButton = document.querySelector('.play-reset');
let resultAreaImg = document.querySelector('.main-img');
let chances = 5;
let gameEnd = false;
let choseNum = [];

playButton.addEventListener('click', handleClickPlay);
playResetButton.addEventListener('click', handleClickReset);
userInput.addEventListener('focus', () => {
    userInput.value = '';
});
function randomPick() {
    randomNum = Math.floor(Math.random() * 100) + 1;
    console.log('정답', randomNum);
}

function handleClickReset() {
    // 인풋창을 비운다 clear
    userInput.value = '';
    // go 버튼 활성화
    playButton.disabled = false;
    // 랜덤번호 다시 부여
    randomPick();
    // 리셋을 누르면 남은 기회 횟수 리셋
    chances = 5;
    chanceArea.textContent = `남은 횟수 : ${chances}번`;
    // 결과 텍스트 리셋
    resultText.textContent = '가보자고';
    resultAreaImg.src = 'image/spin.gif';
}

function handleClickPlay() {
    let userValue = userInput.value;

    if (isNaN(userValue) || userValue < 1 || userValue > 100) {
        resultAreaImg.src = 'image/nope.gif';
        resultText.textContent = '1 ~ 100사이숫자를 입력하세요';
        return;
    }
    if (choseNum.includes(userValue)) {
        console.log(choseNum);
        resultAreaImg.src = 'image/nope.gif';
        resultText.textContent = '이미 선택한 숫자입니다.';
        return;
    }

    chances--; // 남은기회 차감
    chanceArea.innerHTML = `남은 횟수 : ${chances}번`;
    choseNum.push(userValue);

    if (userValue < randomNum) {
        resultAreaImg.src = 'image/up.gif';
        resultText.textContent = 'UP!';
    } else if (userValue > randomNum) {
        resultAreaImg.src = 'image/down.gif';
        resultText.textContent = 'DOWN!';
    } else {
        resultAreaImg.src = 'image/winner.gif';
        resultText.textContent = '정답입니다!';
        playButton.disabled = true;
    }

    if (chances === 0) {
        gameEnd = true;
        resultAreaImg.src = 'image/sad.gif';
    }
    if (gameEnd) {
        playButton.disabled = true;
        resultText.textContent = 'Game Over';
    }
    console.log(userValue);
}

randomPick();
