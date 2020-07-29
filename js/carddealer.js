let dlrbumpCards = document.getElementById('dlrbumpedCards');
let plyrbumpCards = document.getElementById('plyrbumpedCards');
let players = ["plyr","dlr"];

const btnHitMe = document.getElementById('btnhitme');
const btnStay = document.getElementById('btnstay');
const btnNewGame = document.getElementById('btnnewgame');
const cbCardCount = document.getElementById('cbCardCount');

btnHitMe.addEventListener("click", hitMe);
btnStay.addEventListener("click", stay);
btnNewGame.addEventListener("click", newGame);
cbCardCount.addEventListener("click", toggleCardCount);

let numOfCardsInDeck = document.getElementById("numOfCardsLeft");
let deckOfCards = [];

//This function returns a random number that is used as an index to the deck of cards.
function randomNumber(upper) {
    return Math.floor( Math.random() * upper );
  }
    
//This function gets a card from the deck and removes it from that deck. 
//  It prompts user at the end of the deck to see if they want to continue. 
function dealCard() {
    if (deckOfCards.length == 0) {
        if (confirm("There are no cards left in the deck.\nDo you want to continue with a fresh deck?")) {
            deckOfCards = shuffleDeck();
            numOfCardsInDeck.textContent = 52;
        } else {
            let lblPlyrResult = document.getElementById('plyrGameResult');
            lblPlyrResult.textContent = "GAME OVER!";
            btnNewGame.classList.add('hide')
            btnHitMe.disabled = true;
            btnStay.disabled = true;

            throw 'End of deck';
        }
    }
    let cardIndex = randomNumber(parseInt(numOfCardsInDeck.textContent));
    let card = deckOfCards[cardIndex]; 

    if (cardIndex == 0) { //remove card from beginning of card array
        deckOfCards.shift();
    } else if (cardIndex == (deckOfCards.length - 1)) {  //remove card from end of card array
        deckOfCards.pop();
    }
    else { //remove card from middle of card array
        var tempDeck1 = deckOfCards.slice(0,cardIndex); 
        var tempDeck2 = deckOfCards.slice(cardIndex + 1, deckOfCards.length);
        deckOfCards = tempDeck1.concat(tempDeck2);
    }
    numOfCardsInDeck.textContent = parseInt(numOfCardsInDeck.textContent) - 1;
    return card;
}

//This function takes a card object and creates the html for it 
function createCardHTML (card) {

    const div = document.createElement('div');
    const spanrank = document.createElement('span');
    const spansuit = document.createElement('span');
    const spanmainsuit = document.createElement('span');

    spanrank.innerHTML = card.rank;
    spanrank.setAttribute('data-value', card.value);  //custom attribute 
    spansuit.innerHTML = card.suit;
    spanmainsuit.innerHTML = card.suit;
    if (card.suit == '&hearts;' || card.suit == '&diam;') {
        spansuit.style.color = '#C3073F';
        spanmainsuit.style.color = '#C3073F';
    }

    const spanrank2 = spanrank.cloneNode(true);
    const spansuit2 = spansuit.cloneNode(true);

    // div['className'] = 'card';
    div.className = 'card';
    div.appendChild(spanrank);
    div.appendChild(spansuit);
    div.appendChild(spanmainsuit);
    div.appendChild(spansuit2);
    div.appendChild(spanrank2);

    return div;
}

function LoadPage() {
    deckOfCards = shuffleDeck();
    dealInitialHands();
}
    
//This function deals the first 2 cards down
function dealInitialHands() {
    
    let cardcount = document.getElementById("cardcount");

    for (let i = 1; i <= 2; i++) {
        players.forEach(player => {
            newcard = dealCard();
            cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);
            newCardDiv = createCardHTML(newcard);
            placeCard(`${player}Card${i}`, newCardDiv);
            incrementTotal(`${player}Container`, `${player}Sum`);
        });
    }
    let plyrSum = parseInt(document.getElementById('plyrSum').textContent);

    if  (plyrSum == 21) {
        btnHitMe.disabled = true;
    }
    btnNewGame.classList.add('hide')

}

//This function places the card html on the appropriate part of the page.
function placeCard (player, card) {
    let divCard = document.getElementById(player);
    divCard.appendChild(card);
}

//This function deals the bumped cards for the player
function hitMe() {
    let card = dealCard();

    let newCardDiv = createCardHTML(card);
    plyrbumpCards.appendChild(newCardDiv);

    incrementTotal('plyrContainer', 'plyrSum');

    let cardcount = document.getElementById("cardcount");
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

    let plyrSum = document.getElementById('plyrSum');
    var sum = parseInt(plyrSum.textContent);
    if (sum > 21) { 
        btnHitMe.disabled = true;
    }
    else if (sum == 21) {
        btnHitMe.disabled = true;
    }
}


function stay() {
    btnHitMe.disabled = true;
    hitDealer();
}

//This function runs the dealer's bumped cards
//  Right now there is a 3 second delay between dealing each card. 
function hitDealer() {

    let dlrSum = document.getElementById('dlrSum');
    var sum = parseInt(dlrSum.textContent);

    if (sum <= 16) {

        let card = dealCard();

        let newCardDiv = createCardHTML(card);
        dlrbumpCards.appendChild(newCardDiv);

        incrementTotal('dlrContainer', 'dlrSum');

        let cardcount = document.getElementById("cardcount");
        cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

        setTimeout(hitDealer, 3000);

    } 
    else {
        determineWinner(); /* I had to stick this here instead of completely outside of this function, because the setTimeout was having an adverse affect on how the recursive call was being made */
    }
        
}

    
function newGame() {
    btnNewGame.classList.add('hide')

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
    dealInitialHands();
}

//This function computes the total for the player (or dealer). 
//  It uses a custom attribute (data-value). 
//  It also accounts for Aces, which of course can have a value of 1 or 11.
function incrementTotal(container, sumlabel) {

    let divSum = document.getElementById(sumlabel);

    let spanCollection = document.getElementsByClassName(container)[0].getElementsByTagName('span');    
    let spanArray = Array.from(spanCollection);
    let nbrOfAces = spanArray.filter(x => x.textContent == "A").length / 2;

    let sum = 0;
    for (i = 0; i < spanArray.length; i++) {
        if (spanArray[i].hasAttribute("data-value")){
            sum += parseInt(spanArray[i].getAttribute("data-value"));  // This is the custom attribute on the rank elements
        }
    }

    sum = sum / 2; // up to this point every card value has been added twice because the rank appears twice on each card;

    if (sum > 21) {
        while (nbrOfAces > 0 && sum > 21) {
            sum -= 10;
            nbrOfAces--;
        }
    }

    divSum.textContent = sum;

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
        }
        else {
            lblPlyrResult.textContent = "YOU WIN!";
        }
    }
    else if (plyrSum > 21) {
        lblPlyrResult.textContent = "YOU LOSE!";
    }
    else if (plyrSum < 21) {
        if (dlrSum > 21) {
            lblPlyrResult.textContent = "YOU WIN!";
        }
        else if (dlrSum == 21) {
            lblPlyrResult.textContent = "YOU LOSE!";
        }
        else if (plyrSum > dlrSum) {
            lblPlyrResult.textContent = "YOU WIN!";
        }
        else if (plyrSum == dlrSum) {
            lblPlyrResult.textContent = "IT'S A PUSH";
        }
        else if (plyrSum < dlrSum) {
            lblPlyrResult.textContent = "YOU LOSE!";
        }
    }

    btnNewGame.classList.remove('hide')

}

function toggleCardCount() {
    let cardcount = document.getElementById("cardcount");
    if (cbCardCount.checked) {
        cardcount.classList.add('hide');
    } else {
        cardcount.classList.remove('hide');
    }
  
}

