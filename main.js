// grabing html elements
let bodyEl = document.getElementsByTagName("body");
let btnsEl = document.querySelector(".btns");
let lifesEl = document.getElementById("lifes");
let msgEl = document.getElementById("message");
let cardsEl = document.getElementById("cards");
let sumEl = document.getElementById("sum");
let startEl = document.getElementById("startGame");
let newCardBtnEl = document.getElementById("newCard");
let restartEl = document.getElementById("restart");
let quitEl = document.getElementById("quitGame");
let hintEl = document.getElementById("hint");
let olEl = document.getElementById("list");
let agianEl = document.getElementById("play-again");

let li = document.createElement("li");
// ui btns
restartEl.style.display = "none";
newCardBtnEl.style.display = "none";
quitEl.style.display = "none";
agianEl.style.display = "none";

// initializing the values of game
let initial = 0;
let arrOfCards = [];
let log = [];
let sum;
let energyLvl = 5;
let hearts = ["❤", "❤", "❤", "❤", "❤"];

// variables
let firstCard;
let secondCard;
// card section
let cardNo = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let hints = [
  "you need to 21 points to win the BLACK JACK GAME",
  "if your started with 15 point then you have luck",
  "your point greater then 21 you will defeat",
  "have a good day ",
];

// event listners

// start game function
startEl.addEventListener("click", () => {
  energyLvl -= 1;
  hearts.pop();
  console.log("start energy :", hearts);
  firstCard = cardNo[Math.round(Math.abs(Math.random() * cardNo.length - 1))];
  secondCard = cardNo[Math.round(Math.abs(Math.random() * cardNo.length - 1))];
  sum = firstCard + secondCard;
  initial = sum;
  // arr
  arrOfCards = [firstCard, secondCard];
  // checking conditions
  check();
  startUi();
});

// new card function
newCardBtnEl.addEventListener("click", () => {
  logicOfNewCard();
  // checking conditions
  check();
  newCardUi();
});

// restart function
restartEl.addEventListener("click", () => {
  restartUi();
  firstCard = 0;
  secondCard = 0;
});
// quit function
quitEl.addEventListener("click", () => {
  restartUi();
  firstCard = 0;
  secondCard = 0;
  energyLvl -= 1;
});

// play again function
agianEl.addEventListener("click", () => {
  console.log("play again btn clicked ");
  document.location.reload();
});

// check function
function check() {
  if (initial <= 20) {
    msgEl.textContent = "Do you want to draw a new card?";
    msgEl.style.color = "#FFEBB7";
    newCardBtnEl.style.display = "";
    quitEl.style.display = "";
  } else if (initial === 21) {
    msgEl.textContent = "You've got Blackjack !";
    log.push(msgEl.textContent);

    // gain energy
    energyLvl += 1;
    // console.log("energy gain :", hearts);
    console.log(`gained energy : ${energyLvl} ,hearts avl : ${hearts}`);
    displayAgain();
    restartWin();
    if (olEl.children.length > 5) {
      console.log(`win ${olEl.children.length - 5} times `);
    }
  } else {
    msgEl.textContent = "You're out of the game !";
    log.push(msgEl.textContent);
    console.table(log);
    displayAgain();
    restartDefeat();
    if (olEl.children.length > 5) {
      console.log(`win ${olEl.children.length - 5} times `);
    }
  }
}

// helper function

function logicOfNewCard() {
  let random = cardNo[Math.round(Math.abs(Math.random() * cardNo.length) - 1)];
  // intial value + random card number to get sum
  initial += random;
  // push random num to arrofcards
  arrOfCards.push(random);
}

function startUi() {
  if (energyLvl === -1) {
    pushHearts();
    console.log("start ui ", log);
  }
  lifesEl.textContent = `${hearts.join(" | ")}`;
  // text in ui
  sumEl.textContent += ` ${initial}`;
  cardsEl.textContent = `cards : ${arrOfCards.join(" | ")}`;
  // ui btn
  startEl.style.display = "none";
  // ti generate hint
  hint();
}
function newCardUi() {
  // text in ui
  sumEl.textContent = "points : ";
  sumEl.textContent += `${initial}`;
  cardsEl.textContent = `cards : ${arrOfCards.join(" | ")}`;
  // ti generate hint
  hint();
}
function restartUi() {
  if (energyLvl === 0) {
    pushHearts();
    console.log("restart ui log  :", log);
  }
  lifesEl.textContent = `${hearts.join(" | ")}`;
  initial = 0;
  // text and color in ui
  msgEl.textContent = "Welcome to Game ";
  msgEl.style.color = "#d1e9ff";
  cardsEl.textContent = `cards :`;
  sumEl.textContent = "points : ";
  // ui btns
  startEl.style.display = "";
  newCardBtnEl.style.display = "none";
  restartEl.style.display = "none";
  quitEl.style.display = "none";
  // ti generate hint
  hint();
}

function pushHearts() {
  startEl.style.display = "none";
  restartEl.style.display = "none";
  newCardBtnEl.style.display = "none";
  quitEl.style.display = "none";

  energyLvl += 5;
  for (let i = 0; i <= energyLvl - 1; i++) {
    hearts.push("❤");
  }
  log = [];
}

function restartWin() {
  msgEl.style.color = "#90ee90";
  restartEl.style.backgroundColor = "#90ee90";
  // ui btns
  restartEl.style.display = "";
  newCardBtnEl.style.display = "none";
  quitEl.style.display = "none";
}

function restartDefeat() {
  msgEl.style.color = "#f08080";
  restartEl.style.backgroundColor = "#f08080";
  // btns in ui
  restartEl.style.display = "";
  newCardBtnEl.style.display = "none";
  quitEl.style.display = "none";
}

// generating random hint msg
function hint() {
  let randomHints = Math.abs(Math.round(Math.random() * hints.length - 1));
  hintEl.textContent = hints[randomHints];
  hintEl.style.fontSize = ".6rem";
  // console.log("hints :", randomHints);
}

// result list
function resultList() {
  let li = document.createElement("li");
  for (i = 0; i < log.length; i++) {
    li.textContent = log[i];
    olEl.appendChild(li);
    olEl.style.display = "none";
    console.log(li.textContent);
  }
}

//  final result ui
function result() {
  msgEl.style.display = "none";
  cardsEl.style.display = "none";
  sumEl.style.display = "none";
  btnsEl.style.display = "none";
  agianEl.style.display = "";
  olEl.style.display = "";
}

function displayAgain() {
  // dispaly again

  resultList();
  if (energyLvl === 0) {
    let heading = document.querySelector("h1");
    heading.textContent = "results !";
    // btns ui
    result();
  } else {
    agianEl.style.display = "none";
  }
}
