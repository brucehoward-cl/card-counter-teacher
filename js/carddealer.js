// document.addEventListener('DOMContentLoaded', () => {});


const divDlr = document.getElementById('dlrDiv');
const divPlyr = document.getElementById('plyrDiv');

const btnHitMe = document.getElementById('btnhitme');
const btnHitDlr = document.getElementById('btnhitdlr');
const btnNewGame = document.getElementById('btnnewgame');
const form = document.getElementById('registrar');

let deckOfCards = [
    { suit: 'Hearts', rank: 'two', value: 2, count: +1 },
    { suit: 'Hearts', rank: 'six', value: 6, count: +1 },
    { suit: 'Hearts', rank: 'seven', value: 7, count: +0 },
    { suit: 'Hearts', rank: 'Jack', value: 10, count: -1 },
    { suit: 'Spades', rank: 'two', value: 2, count: +1 },
    { suit: 'Spades', rank: 'six', value: 6, count: +1 },
    { suit: 'Spades', rank: 'seven', value: 7, count: +0 },
    { suit: 'Spades', rank: 'Jack', value: 10, count: -1 },
    { suit: 'Clubs', rank: 'two', value: 2, count: +1 },
    { suit: 'Clubs', rank: 'six', value: 6, count: +1 },
    { suit: 'Clubs', rank: 'seven', value: 7, count: +0 },
    { suit: 'Clubs', rank: 'Jack', value: 10, count: -1 },
    { suit: 'Diamonds', rank: 'two', value: 2, count: +1 },
    { suit: 'Diamonds', rank: 'six', value: 6, count: +1 },
    { suit: 'Diamonds', rank: 'seven', value: 7, count: +0 },
    { suit: 'Diamonds', rank: 'Jack', value: 10, count: -1 }
  ]

btnHitMe.addEventListener("click", hitMe);
btnHitDlr.addEventListener("click", hitDealer);
btnNewGame.addEventListener("click", newGame);

function dealCard() {
    let card = deckOfCards[randomNumber(8)]; 
    return card;
}
    
function randomNumber(upper) {
    return Math.floor( Math.random() * upper ) + 1;
  }
    

function hitDealer() {
    let dlrCard1 = document.getElementById('dlrCard1');
    if (dlrCard1.textContent == 'This is the first card') {
        dlrCard1.textContent = 'Ace of Spade';
        let dlrSum = document.getElementById('dlrSum');
        var sum = parseInt(dlrSum.textContent);
        sum += 11;
        dlrSum.textContent = sum;
    }
    else {
        dlrCard2.textContent = 'Jack of Spade';
        let dlrSum = document.getElementById('dlrSum');
        var sum = parseInt(dlrSum.textContent);
        sum += 10;
        dlrSum.textContent = sum;
    }
}

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
    
    // function hitMe() {
    //     let plyrCard1 = document.getElementById('plyrCard1');
    //     if (plyrCard1.textContent == 'This is the first card') {
    //         plyrCard1.textContent = 'Ace of Hearts';
    //         let plyrSum = document.getElementById('plyrSum');
    //         var sum = parseInt(plyrSum.textContent);
    //         sum += 11;
    //         plyrSum.textContent = sum;
    //     }
    //     else {
    //         plyrCard2.textContent = 'Jack of Hearts';
    //         let plyrSum = document.getElementById('plyrSum');
    //         var sum = parseInt(plyrSum.textContent);
    //         sum += 10;
    //         plyrSum.textContent = sum;
    //     }
    // }
    
function newGame() {
    let plyrCard1 = document.getElementById('plyrCard1');
    let plyrCard2 = document.getElementById('plyrCard2');
    let dlrCard1 = document.getElementById('dlrCard1');
    let dlrCard2 = document.getElementById('dlrCard2');
    let plyrSum = document.getElementById('plyrSum');
    let dlrSum = document.getElementById('dlrSum');
    plyrCard1.textContent = 'Card 1';
    plyrCard2.textContent = 'Card 2';
    dlrCard1.textContent = 'Card 1';
    dlrCard2.textContent = 'Card 2';
    plyrSum.textContent = '0';
    dlrSum.textContent = '0';
}


