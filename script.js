let player = {
  name: "Kutay",
  chips: 200,
};

const messageEl = document.getElementById("message_text");
const croupierCards = document.getElementById("croupier_cards");
const playerEl = document.getElementById("player_el");
const sumEl = document.getElementById("sum_text");
const yourCards = document.getElementById("your_cards");

let cards = [];
let hasBlackJack = false;
let isAlive = false;
let sum = 0;
let result = 0;
let croupier = [];

function displayGameInfo() {
  messageEl.textContent = message;
  const displayedCroupier = croupier.map(c => (c === 11 || c === 1) ? "A" : c);
  croupierCards.textContent = "Krupiye: " + displayedCroupier.join(" ");
  playerEl.textContent = player.name + ": ₺" + player.chips
  sumEl.textContent = "Toplam: " + sum;
  const displayedCards = cards.map(card => (card === 11 || card === 1) ? "A" : card);
  yourCards.textContent = "Kartların: " + displayedCards.join(" ");
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;

  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1 && sum < 11) {
    return 11;
  } else {
    return randomNumber;
  }
}

function getRandomCardCroupier() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;

  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1 && result < 11) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (player.chips === 0) {
    player.chips = 200
  }
  croupier = [getRandomCardCroupier()];
  cards = [getRandomCard(), getRandomCard()];
  sum = cards[0] + cards[1];

  if (sum < 21) {
    hasBlackJack = false;
    isAlive = true;
    message = "Bir kart daha?";
  } else if (sum === 22) {
    sum = 12
  } else {
    message = "Blackjack!";
    player.chips = player.chips * 2.5;
    hasBlackJack = true;
    croupierLimitless();
  }

  displayGameInfo();
}

function newCard() {
  if (isAlive === true && sum !== 21 && hasBlackJack === false) {
    thirdCard = getRandomCard();
    sum += thirdCard;
    cards.push(thirdCard);

    if (sum < 21) {
      message = "Bir kart daha?";
    } else if (sum === 21 && result !== sum) {
      message = "Kazandın!";
      player.chips = player.chips * 2;
      croupierLimitless();
    } else {
      message = "Patladın!";
      player.chips = player.chips * 0;
      croupierLimitless();
    }
  
    if (sum <= 21) {
      hasBlackJack = false;
      isAlive = true;
    } else {
      hasBlackJack = false;
      isAlive = false;
    }
  
    displayGameInfo();
  }
}

function croupierLimitless() {
  let add = (a, b) => a + b;
  result = croupier.reduce(add);

  while (result < 17) {
    croupier.push(getRandomCardCroupier());
    result = croupier.reduce(add);
  }

displayGameInfo();
}

function standCard() {
  croupierLimitless();

  let add = (a, b) => a + b;
  let result = croupier.reduce(add);

  if (sum <= 21 && result > 21) {
    message = "Kazandın!"
    player.chips = player.chips * 2;
  } else if (result > sum) {
    message = "Kaybettin!"
    player.chips = player.chips * 2.5;
  } else if (result < sum) {
    message = "Kazandın!";
    player.chips = player.chips * 2;
  } else if (result = sum) {
    message = "İade!"
  }

  displayGameInfo();
}