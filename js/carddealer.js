let dlrbumpCards = document.getElementById('dlrbumpedCards');
let plyrbumpCards = document.getElementById('plyrbumpedCards');
let players = [];
let playersDiv = document.getElementsByClassName('players')[0];

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


function randomNumber(upper) {
    return Math.floor( Math.random() * upper );
  }
    
// This function pulls a card out of the deck and returns the card (which is just the object from the array of objects)
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
        var tempDeck1 = deckOfCards.slice(0,cardIndex); //doesn't include cardIndex
        var tempDeck2 = deckOfCards.slice(cardIndex + 1, deckOfCards.length);
        deckOfCards = tempDeck1.concat(tempDeck2);
    }
    numOfCardsInDeck.textContent = parseInt(numOfCardsInDeck.textContent) - 1;
    return card;
}

//This function takes the card object and converts it to html and returns the html
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

function createPlayerHTML (playerNum) {
    const div = document.createElement('div');
    div.className = 'plyrContainer';

    const btnStay = document.createElement('button');
    btnStay.type = 'button';
    btnStay.className = 'btn-stay';
    btnStay.textContent = 'Stay';
    btnStay.name = `player${playerNum}`;
    btnStay.addEventListener("click", stay);


    const btnHitMe = document.createElement('button');
    btnHitMe.type = 'button';
    btnHitMe.className = 'btn-hitme';
    btnHitMe.textContent = 'Hit Me';
    btnHitMe.name = `player${playerNum}`;
    btnHitMe.addEventListener("click", hitMe);
    
    const h2 = document.createElement('h2');
    h2.textContent = `Player ${playerNum}`;

    const label = document.createElement('label');

    label.id = `player${playerNum}Sum`;
    label.textContent = 0;
    
    const divPlyrCards = document.createElement('div');
    divPlyrCards.className = 'plyrCards';
    divPlyrCards.setAttribute('name', `player${playerNum}Cards`);

    const divDealtCards = document.createElement('div');
    divDealtCards.className = 'dealtCards';

    const divCard1 = document.createElement('div');
    divCard1.id = `player${playerNum}Card1`;
    const divCard2 = document.createElement('div');
    divCard2.id = `player${playerNum}Card2`;

    const divbumpedCards = document.createElement('div');
    divbumpedCards.id = `player${playerNum}bumpedCards`;

    const divMessage = document.createElement('div');
    divMessage.className = 'plyrGameResult';
    const h2Message = document.createElement('h2');
    h2Message.id = `player${playerNum}Result`;
    divMessage.appendChild(h2Message);


    div.appendChild(btnStay);
    div.appendChild(btnHitMe);
    div.appendChild(h2);
    div.appendChild(label);

    divDealtCards.appendChild(divCard1);
    divDealtCards.appendChild(divCard2);
    divPlyrCards.appendChild(divDealtCards);
    divPlyrCards.appendChild(divbumpedCards);
    div.appendChild(divPlyrCards);
    div.appendChild(divMessage);

    playersDiv.appendChild(div);

}

function LoadPage() {
    deckOfCards = shuffleDeck();

    do {
        var response = prompt("How many players?","");
        numOfPlayers = parseInt(response);
    } while (isNaN(numOfPlayers) || numOfPlayers == 0);

    for (let n = 1; n <= numOfPlayers; n++)
    {
        createPlayerHTML(n);
        players.push(`player${n}`);
    }

    players.push('dlr');

    dealInitialHands();

}
    

function dealInitialHands() {
    
    let cardcount = document.getElementById("cardcount");

    for (let i = 1; i <= 2; i++) {
        players.forEach(player => {
            newcard = dealCard();
            cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);
            newCardDiv = createCardHTML(newcard);
            placeCard(`${player}Card${i}`, newCardDiv);
            incrementTotal(`${player}Cards`, `${player}Sum`);
        });
    }
    let plyrSum = parseInt(document.getElementById('plyrSum').textContent);

    if  (plyrSum == 21) {
        btnHitMe.disabled = true;
    }
    btnNewGame.classList.add('hide')

}


function placeCard (player, card) {
    let divCard = document.getElementById(player);
    divCard.appendChild(card);
}


function hitMe(event) {
    let card = dealCard();

    let newCardDiv = createCardHTML(card);

    let bumpCards = document.getElementById(`${event.target.name}bumpedCards`);
    bumpCards.appendChild(newCardDiv);

    incrementTotal(`${event.target.name}Cards`, `${event.target.name}Sum`);

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

function hitDealer() {

    let dlrSum = document.getElementById('dlrSum');
    var sum = parseInt(dlrSum.textContent);

    if (sum <= 16) {

        let card = dealCard();

        let newCardDiv = createCardHTML(card);
        dlrbumpCards.appendChild(newCardDiv);

        // incrementTotal('dlrContainer', 'dlrSum');
        incrementTotal('dlrCards', 'dlrSum');

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

    players.forEach(player => {
        let div1 = document.getElementById(`${player}Card1`);
        let div2 = document.getElementById(`${player}Card2`);
        let div3 = document.getElementById(`${player}bumpedCards`);
        div1.innerHTML = '';
        div2.innerHTML = '';
        div3.innerHTML = '';
    });

    dealInitialHands();
}


function incrementTotal(cardDiv, sumlabel) {

    let divSum = document.getElementById(sumlabel);

    let spanCollection = document.getElementsByName(cardDiv)[0].getElementsByTagName('span');    
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

    players.forEach(player => {
        if (player != 'dlr') {
            let divPlyrSum = document.getElementById(`${player}Sum`);
            var plyrSum = parseInt(divPlyrSum.textContent);
            let lblPlyrResult = document.getElementById(`${player}Result`);
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
        }
    });

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

