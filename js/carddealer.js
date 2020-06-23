let dlrbumpCards = document.getElementById('dlrbumpedCards');
const plyrbumpCards = document.getElementById('plyrbumpedCards');

const btnHitMe = document.getElementById('btnhitme');
const btnStay = document.getElementById('btnstay');
const btnNewGame = document.getElementById('btnnewgame');
const cbCardCount = document.getElementById('cbCardCount');

btnHitMe.addEventListener("click", hitMe);
btnStay.addEventListener("click", stay);
btnNewGame.addEventListener("click", newGame);
cbCardCount.addEventListener("click", toggleCardCount);

let numOfCardsInDeck = document.getElementById("numOfCardsLeft")

function dealCard() {
    let cardIndex = randomNumber(parseInt(numOfCardsInDeck.textContent));
    let card = deckOfCards[cardIndex]; 

    if (cardIndex == 0) { //remove card from beginning of card array
        deckOfCards.shift();
    } else if (cardIndex == (deckOfCards.length - 1)) {  //remove card from end of card array
        deckOfCards.pop();
    }
    else { //remove card from middle of card array
        var tempDeck1 = deckOfCards.slice(0,cardIndex); //doesn't include cardIndex
        var tempDeck2 = deckOfCards.slice(cardIndex + 1, deckOfCards.length);
        deckOfCards = tempDeck1.concat(tempDeck2);
    }
    numOfCardsInDeck.textContent = parseInt(numOfCardsInDeck.textContent) - 1;
    return card;
}
    
function randomNumber(upper) {
    return Math.floor( Math.random() * upper );
  }
    
function DealHands() {

    let divDlrSum = document.getElementById('dlrSum');
    var dlrSum = parseInt(divDlrSum.textContent);
    let divPlyrSum = document.getElementById('plyrSum');
    var plyrSum = parseInt(divPlyrSum.textContent);
    let cardcount = document.getElementById("cardcount");

    let newcard = dealCard();
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);
    let newCardDiv = createCardHTML(newcard);
    let divPlyrCard1 = document.getElementById("plyrCard1");
    divPlyrCard1.appendChild(newCardDiv);
    plyrSum += parseInt(newcard.value);

    newcard = dealCard();
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);
    newCardDiv = createCardHTML(newcard);
    let divDlrCard1 = document.getElementById("dlrCard1");
    divDlrCard1.appendChild(newCardDiv);
    dlrSum += parseInt(newcard.value);

    newcard = dealCard();
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);
    newCardDiv = createCardHTML(newcard);
    let divPlyrCard2 = document.getElementById("plyrCard2");
    divPlyrCard2.appendChild(newCardDiv);
    plyrSum += parseInt(newcard.value);

    newcard = dealCard();
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);
    newCardDiv = createCardHTML(newcard);
    let divDlrCard2 = document.getElementById("dlrCard2");
    divDlrCard2.appendChild(newCardDiv);
    dlrSum += parseInt(newcard.value);

    divDlrSum.textContent = dlrSum;
    divPlyrSum.textContent = plyrSum;

}

function stay() {
    btnHitMe.disabled = true;
    hitDealer();
    determineWinner();
}

function createCardHTML (card) {

    const div = document.createElement('div');
    const spanrank = document.createElement('span');
    const spansuit = document.createElement('span');
    const spanmainsuit = document.createElement('span');

    spanrank.innerHTML = card.rank;
    spansuit.innerHTML = card.suit;
    spanmainsuit.innerHTML = card.suit;

    const spanrank2 = spanrank.cloneNode(true);
    const spansuit2 = spansuit.cloneNode(true);

    div['className'] = 'card';
    div.appendChild(spanrank);
    div.appendChild(spansuit);
    div.appendChild(spanmainsuit);
    div.appendChild(spansuit2);
    div.appendChild(spanrank2);

    return div;
}

function hitDealer() {
    let dlrSum = document.getElementById('dlrSum');
    var sum = parseInt(dlrSum.textContent);
    if (sum <= 16) {

        let card = dealCard();

        let newCardDiv = createCardHTML(card);
        dlrbumpCards.appendChild(newCardDiv);

        sum += parseInt(card.value);
        dlrSum.textContent = sum;

        let cardcount = document.getElementById("cardcount");
        cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

        // setTimeout(hitDealer, 3000);
        hitDealer();

    }
}


function hitMe() {
    let card = dealCard();

    let newCardDiv = createCardHTML(card);
    plyrbumpCards.appendChild(newCardDiv);

    let cardcount = document.getElementById("cardcount");
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

    let plyrSum = document.getElementById('plyrSum');
    var sum = parseInt(plyrSum.textContent);
    sum += parseInt(card.value);
    plyrSum.textContent = sum;

    if (sum > 21) {
        btnHitMe.disabled = true;
    }
    else if (sum == 21) {
        btnHitMe.disabled = true;
    }
}


   
    
function newGame() {
    let plyrCard1 = document.getElementById('plyrCard1');
    let plyrCard2 = document.getElementById('plyrCard2');
    let dlrCard1 = document.getElementById('dlrCard1');
    let dlrCard2 = document.getElementById('dlrCard2');
    let plyrSum = document.getElementById('plyrSum');
    let dlrSum = document.getElementById('dlrSum');
    let lblPlyrResult = document.getElementById('plyrGameResult');

    plyrCard1.innerHTML = '';
    plyrCard2.innerHTML = '';
    dlrCard1.innerHTML = '';
    dlrCard2.innerHTML = '';
    plyrSum.textContent = '0';
    dlrSum.textContent = '0';
    lblPlyrResult.textContent = "";

    btnHitMe.disabled = false;


    while (dlrbumpCards.firstChild) {
        dlrbumpCards.removeChild(dlrbumpCards.lastChild);
    }
    while (plyrbumpCards.firstChild) {
        plyrbumpCards.removeChild(plyrbumpCards.lastChild);
    }
    DealHands();
}


function toggleCardCount() {
    let cardcount = document.getElementById("cardcount");
    if (cbCardCount.checked) {
        cardcount.classList.add('hide');
    } else {
        cardcount.classList.remove('hide');
    }
  
}


function determineWinner() {
    let divDlrSum = document.getElementById('dlrSum');
    var dlrSum = parseInt(divDlrSum.textContent);
    let divPlyrSum = document.getElementById('plyrSum');
    var plyrSum = parseInt(divPlyrSum.textContent);

    let lblPlyrResult = document.getElementById('plyrGameResult');


    if (plyrSum == 21) {
        if (dlrSum == 21) {
            lblPlyrResult.textContent = "IT'S A PUSH";
            /* its a push */
        }
        else {
            /* player wins */
            lblPlyrResult.textContent = "YOU WIN!";
        }
    }
    else if (plyrSum < 21) {
        if (dlrSum > 21) {
            /* player wins */
            lblPlyrResult.textContent = "YOU WIN!";
        }
        else if (dlrSum == 21) {
            /* player loses */
            lblPlyrResult.textContent = "YOU LOSE!";
        }
        else if (plyrSum > dlrSum) {
            /* player wins */
            lblPlyrResult.textContent = "YOU WIN!";
        }
        else if (plyrSum == dlrSum) {
            /* its a push */
            lblPlyrResult.textContent = "IT'S A PUSH";
        }
        else if (plyrSum < dlrSum) {
            lblPlyrResult.textContent = "YOU LOSE!";
        }
    }
    else if (plyrSum > 21) {
        /* player loses */
        lblPlyrResult.textContent = "YOU LOSE!";
    }

}