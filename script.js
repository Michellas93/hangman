const alphabete = document.getElementById("alphabete");
const secretWord = document.getElementById("guess_field");
const btns = document.querySelectorAll(".btn");
const lives = document.getElementById("lives");

const allWords = [
  "Home alone",
  "Shrek",
  "Star Wars",
  "Titanic",
  "Forrest Gump",
  "Finding Nemo",
  "The Social Network",
  "Harry Potter",
  "Air",
];
let allWord = allWords[Math.floor(Math.random() * allWords.length)];
console.log(allWord);
let rightWord = [];
for (let i of allWord) {
  if (i == " ") {
    rightWord.push("-");
  } else {
    // znamena ze je tam prazdny znak
    rightWord.push("_ ");
  }
}
secretWord.textContent = rightWord.join("");

btns.forEach(function (elem) {
  elem.addEventListener("click", function () {
    const clicked = elem.textContent;
    console.log(clicked);
    let indexes = [];
    let currIndex = 0;
    for (let znak of allWord) {
      if (znak.toLowerCase() == clicked.toLowerCase().trim()) {
        indexes.push(currIndex);
      }
      // na jakem miste je to pismeno
      currIndex += 1;
    }
    console.log(indexes);
    if (indexes.length == 0) {
      lives.textContent = parseInt(lives.textContent) - 1;
    }
    elem.disabled = true;
    let allWorldIndex = 0;

    for (let i of allWord) {
      if (rightWord[allWorldIndex] == "_ ") {
        if (indexes.includes(allWorldIndex)) {
          rightWord[allWorldIndex] = i + " ";
        }
      }

      allWorldIndex += 1;
    }

    secretWord.textContent = rightWord.join("");

    const gm = GameOver();
    if (gm == true) {
      setTimeout(() => {
        alert("vyhrál si");
      }, 100);

      setTimeout(() => {
        Reset();
      }, 2000);
    } else if (gm == false) {
      setTimeout(() => {
        alert("Prohrál si");
      }, 100);
      alert("Prohrál si");
      setTimeout(() => {
        Reset();
      }, 2000);
    }
  });
});
function GameOver() {
  if (!rightWord.includes("_ ")) {
    return true;
  } else if (lives.textContent == 0) {
    return false;
  } else {
    return "dál";
  }
}

function Reset() {
  allWord = allWords[Math.floor(Math.random() * allWords.length)];
  console.log(allWord);
  rightWord = [];
  for (let i of allWord) {
    if (i == " ") {
      rightWord.push("-");
    } else {
      rightWord.push("_ ");
    }
  }
  secretWord.textContent = rightWord.join("");
  lives.textContent = 10;
  for (let btn of btns) {
    btn.disabled = false;
  }
}
