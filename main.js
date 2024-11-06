let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Elzero Web School And Code With ♥ By Nour`;

let numberOfTries = 5;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let wrongLetters = 0;
let usedHints = 0;

document.querySelector(".hint span").innerHTML = numberOfHints;

function generateInput() {
  let inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    let div = document.createElement("div");
    div.classList.add(`try-${i}`);
    div.innerHTML = `<span>Try ${i}</span>`;
    setTimeout(() => {
      for (let j = 1; j <= numberOfLetters; j++) {
        let input = document.createElement("input");
        input.type = "text";
        input.id = `guess-${i}-letter-${j}`;
        input.maxLength = 1;
        div.appendChild(input);
      }
    }, 1);
    if (i != 1) div.classList.add("disabled-inputs");
    inputsContainer.appendChild(div);
  }
  setTimeout(() => {
    inputsContainer.children[0].children[1].focus();
    let inputsInDisabled = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabled.forEach((input) => (input.disabled = true));
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
        let nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
      });
      input.addEventListener("keydown", function (e) {
        let currentIndex = Array.from(inputs).indexOf(e.target); // or this
        if (e.key == "ArrowRight") {
          let nextInput = currentIndex + 1;
          if (nextInput < inputs.length) inputs[nextInput].focus();
        } else if (e.key == "ArrowLeft") {
          let preInput = currentIndex - 1;
          if (preInput >= 0) inputs[preInput].focus();
        } else if (e.key == "Backspace") {
          inputs[currentIndex].value = "";
        } else if (e.key == "Enter") {
          checkBtn.click();
        }
      });
    });
  }, 1);
}

let checkBtn = document.querySelector(".check");
let wordToGuess = "";
let words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess =
  words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();

let messageArea = document.querySelector(".message");
let hintBtn = document.querySelector(".hint");

hintBtn.addEventListener("click", getHint);
checkBtn.addEventListener("click", handleGuess);

console.log(wordToGuess);

function handleGuess() {
  let sucessGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    let letter;
    if (inputField) {
      letter = inputField.value.toLocaleLowerCase();
    }
    const actualLetter = wordToGuess[i - 1];
    if (letter == actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      inputField.classList.add("not-in-place");
      sucessGuess = false;
      wrongLetters++;
    } else {
      if (inputField) {
        inputField.classList.add("no");
      }
      sucessGuess = false;
      wrongLetters++;
    }
  }
  if (sucessGuess == true) {
    document.querySelector(".playAgain").style.opacity = 1;
    document.querySelector(".playAgain").style.visibility = "visible";
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    messageArea.innerHTML = `You Win, <span>The Wrong Letters Is ${wrongLetters}</span>`;
    messageArea.style.opacity = 1;
    if (numberOfHints == 2) {
      messageArea.innerHTML = `You Win, <span>The Wrong Letters Is ${wrongLetters} <br><p>And You Didn't Hints</p></span>`;
    } else {
      messageArea.innerHTML = `You Win, <span>The Wrong Letters Is ${wrongLetters} <br><p>And You Use ${usedHints} Hints</p></span>`;
    }
    checkBtn.disabled = true;
    document.querySelector(".hint").disabled = true;
  } else {
    if (document.querySelector(`.try-${currentTry + 1}`)) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.add("disabled-inputs");
      const currentTryInputs = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      currentTryInputs.forEach((input) => (input.disabled = true));

      currentTry++;

      const nextTryInputs = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      nextTryInputs.forEach((input) => (input.disabled = false));
      let ele = document.querySelector(`.try-${currentTry}`);
      if (ele) {
        ele.classList.remove("disabled-inputs");
        ele.children[1].focus();
      }
    } else {
      document.querySelector(".playAgain").style.opacity = 1;
      document.querySelector(".playAgain").style.visibility = "visible";
      let allTries = document.querySelectorAll(".inputs > div");
      allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
      messageArea.style.opacity = 1;
      checkBtn.disabled = true;
      document.querySelector(".hint").disabled = true;
    }
  }
}

function getHint() {
  usedHints++;
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints == 0) {
    hintBtn.disabled = true;
  }
  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  let empayEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value == ""
  );
  if (empayEnabledInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * empayEnabledInputs.length);
    let randomInput = empayEnabledInputs[randomIndex];
    let indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill != -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

let playAgain = document.querySelector(".playAgain");

playAgain.onclick = function () {
  numberOfTries = 5;
  numberOfLetters = 6;
  currentTry = 1;
  numberOfHints = 2;
  wrongLetters = 0;
  usedHints = 0;
  document.querySelector(".inputs").textContent = "";
  messageArea.textContent = "";
  messageArea.style.opacity = 0;
  playAgain.style.opacity = 0;
  playAgain.style.visibility = "hidden";
  hintBtn.disabled = false;
  checkBtn.disabled = false;
  hintBtn.children[0].innerHTML = numberOfHints;
  generateInput();
};

window.onload = function () {
  generateInput();
};
