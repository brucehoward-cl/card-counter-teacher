// document.addEventListener('DOMContentLoaded', () => {});


let divDlr = document.getElementById('dlrDiv');
const divPlyr = document.getElementById('plyrDiv');

const btnHitMe = document.getElementById('btnhitme');
const btnHitDlr = document.getElementById('btnhitdlr');
const btnNewGame = document.getElementById('btnnewgame');
const form = document.getElementById('registrar');


btnHitMe.addEventListener("click", hitMe);
btnHitDlr.addEventListener("click", hitDealer);
btnNewGame.addEventListener("click", newGame);

function dealCard() {
    let card = deckOfCards[randomNumber(51)]; 
    return card;
}
    
function randomNumber(upper) {
    return Math.floor( Math.random() * upper ) + 1;
  }
    

function DealHands() {

    let card = dealCard();
    let plyrCard1 = document.getElementById('plyrCard1');
    let plyrSum = document.getElementById('plyrSum');
    plyrCard1.textContent = `${card.rank} ${card.suit}`;
    var sum = parseInt(plyrSum.textContent) + parseInt(card.value);
    plyrSum.textContent = sum;

    card = dealCard();
    let dlrCard1 = document.getElementById('dlrCard1');
    let dlrSum = document.getElementById('dlrSum');
    dlrCard1.textContent = `${card.rank} ${card.suit}`;
    sum = parseInt(dlrSum.textContent) + parseInt(card.value);
    dlrSum.textContent = sum;

    card = dealCard();
    let plyrCard2 = document.getElementById('plyrCard2');
    plyrSum = document.getElementById('plyrSum');
    plyrCard2.textContent = `${card.rank} ${card.suit}`;
    sum = parseInt(plyrSum.textContent) + parseInt(card.value);
    plyrSum.textContent = sum;

    card = dealCard();
    let dlrCard2 = document.getElementById('dlrCard2');
    dlrSum = document.getElementById('dlrSum');
    dlrCard2.textContent = `${card.rank} ${card.suit}`;
    sum = parseInt(dlrSum.textContent) + parseInt(card.value);
    dlrSum.textContent = sum;

}

function hitDealer() {
    let card = dealCard();
    const label = document.createElement('label');
    label['className'] = 'extras';
    label['textContent'] = `${card.rank} ${card.suit}`;
    divDlr.appendChild(label);
    let dlrSum = document.getElementById('dlrSum');
    var sum = parseInt(dlrSum.textContent);
    sum += parseInt(card.value);
    dlrSum.textContent = sum;
}

// function hitDealer() {
//     let dlrCard1 = document.getElementById('dlrCard1');
//     if (dlrCard1.textContent == 'This is the first card') {
//         dlrCard1.textContent = 'Ace of Spade';
//         let dlrSum = document.getElementById('dlrSum');
//         var sum = parseInt(dlrSum.textContent);
//         sum += 11;
//         dlrSum.textContent = sum;
//     }
//     else {
//         dlrCard2.textContent = 'Jack of Spade';
//         let dlrSum = document.getElementById('dlrSum');
//         var sum = parseInt(dlrSum.textContent);
//         sum += 10;
//         dlrSum.textContent = sum;
//     }
// }

function hitMe() {
    let card = dealCard();
    const label = document.createElement('label');
    label['className'] = 'extras';
    label['textContent'] = `${card.rank} ${card.suit}`;
    divPlyr.appendChild(label);
    let plyrSum = document.getElementById('plyrSum');
    var sum = parseInt(plyrSum.textContent);
    sum += parseInt(card.value);
    plyrSum.textContent = sum;
}
    
    
function newGame() {
    let plyrCard1 = document.getElementById('plyrCard1');
    let plyrCard2 = document.getElementById('plyrCard2');
    let dlrCard1 = document.getElementById('dlrCard1');
    let dlrCard2 = document.getElementById('dlrCard2');
    let plyrSum = document.getElementById('plyrSum');
    let dlrSum = document.getElementById('dlrSum');
    plyrCard1.textContent = '';
    plyrCard2.textContent = '';
    dlrCard1.textContent = '';
    dlrCard2.textContent = '';
    plyrSum.textContent = '0';
    dlrSum.textContent = '0';
    while (divDlr.firstChild) {
        divDlr.removeChild(divDlr.lastChild);
    }
    while (divPlyr.firstChild) {
        divPlyr.removeChild(divPlyr.lastChild);
    }
    DealHands();
}


