let cards = [];
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message_text");
let playerBalance = document.getElementById("player_balance")
let playerChips = 0
let sum = 0;
let sumEl = document.getElementById("sum_text");
let yourCards = document.getElementById("your_cards");

function displayGameInfo() {
  messageEl.textContent = message;
  playerBalance.textContent = "Bakiye: ₺" + playerChips
  sumEl.textContent = "Toplam: " + sum;
  yourCards.textContent = "Kartların: " + cards.join(" ");
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;

  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  cards = [getRandomCard(), getRandomCard()];
  sum = cards[0] + cards[1];

  if (sum < 21) {
    hasBlackJack = false;
    isAlive = true;
    message = "Bir kart daha?";
  } else {
    message = "Blackjack!";
    hasBlackJack = true;
  }

  displayGameInfo();
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    thirdCard = getRandomCard();
    sum += thirdCard;
    cards.push(thirdCard);

    if (sum < 21) {
      hasBlackJack = false;
      isAlive = true;
      message = "Bir kart daha?";
    } else if (sum === 21) {
      hasBlackJack = true;
      message = "Blackjack!";
    } else {
      hasBlackJack = false;
      isAlive = false;
      message = "Patladın!";
    }
    displayGameInfo();
  }
}
