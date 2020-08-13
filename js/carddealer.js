let dlrbumpCards = document.getElementById('dlrbumpedCards');
let players = [];
let playersDiv = document.getElementsByClassName('players')[0];

const btnNewGame = document.getElementById('btnnewgame');
const cbCardCount = document.getElementById('cbCardCount');

btnNewGame.addEventListener("click", newGame);
cbCardCount.addEventListener("click", toggleCardCount);

let numOfCardsRemaining = document.getElementById("numOfCardsLeft");
let shute = [];


function randomNumber(upper) {
    return Math.floor( Math.random() * upper );
  }
    
// This function pulls a card out of the deck and returns the card (which is just the object from the array of objects)
function dealCard() {
    if (shute.length == 0) {
        if (confirm("There are no cards left in the deck.\nDo you want to continue with a fresh deck?")) {
            shute = shuffleDeck();
            numOfCardsRemaining.textContent = 52;
        } else {
            let lblPlyrResult = document.getElementById('plyrGameResult');
            lblPlyrResult.textContent = "GAME OVER!";
            btnNewGame.classList.add('hide');
            let playerbtns = document.querySelectorAll(".plyrContainer button");
            playerbtns.forEach(btn => {
                btn.disabled = true;
            });

            throw 'End of deck';
        }
    }
    let cardIndex = randomNumber(parseInt(numOfCardsRemaining.textContent));
    let card = shute[cardIndex]; 

    if (cardIndex == 0) { //remove card from beginning of card array
        shute.shift();
    } else if (cardIndex == (shute.length - 1)) {  //remove card from end of card array
        shute.pop();
    }
    else { //remove card from middle of card array
        var tempDeck1 = shute.slice(0,cardIndex); //doesn't include cardIndex
        var tempDeck2 = shute.slice(cardIndex + 1, shute.length);
        shute = tempDeck1.concat(tempDeck2);
    }
    numOfCardsRemaining.textContent = parseInt(numOfCardsRemaining.textContent) - 1;
    return card;
}


function LoadPage() {

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

    response = "";
    do {
        response = prompt("How many decks in the shute?","");
        numOfDecks = parseInt(response);
    } while (isNaN(numOfDecks) || numOfDecks == 0);

    numOfCardsRemaining.textContent = 52 * numOfDecks;
    for (let n = 1; n <= numOfDecks; n++)
    {
        shute = shute.concat(shuffleDeck());
    }
    dealInitialHands();

}
    

function dealInitialHands() {
    
    let cardcount = document.querySelectorAll(".cardcount")[0];
    let truecount = document.querySelectorAll(".cardcount")[1];
    let remainingDecks = Math.round(parseInt(numOfCardsRemaining.textContent) / 52);
    if (remainingDecks == 0) { remainingDecks = 1; } // quick way to account for that last half of a deck

    for (let i = 1; i <= 2; i++) {
        players.forEach(player => {
            newcard = dealCard();

            cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);

            remainingDecks = Math.round(parseInt(numOfCardsRemaining.textContent) / 52);
            if (remainingDecks == 0) { remainingDecks = 1; } // quick way to account for that last half of a deck
            truecount.textContent = Math.round(parseInt(cardcount.textContent) / remainingDecks);

            newCardDiv = createCardHTML(newcard);
            placeCard(`${player}Card${i}`, newCardDiv);
            incrementTotal(`${player}Cards`, `${player}Sum`);

            if (player == "player1") {
                let btnHitMe = document.getElementById(`btn${player}HitMe`);
                let btnStay = document.getElementById(`btn${player}Stay`);
                btnHitMe.classList.remove('hide');
                btnStay.classList.remove('hide');
            } else if (player != 'dlr') {
                let btnHitMe = document.getElementById(`btn${player}HitMe`);
                let btnStay = document.getElementById(`btn${player}Stay`);
                btnHitMe.classList.add('hide');
                btnStay.classList.add('hide');
            }

            let plyrSum = parseInt(document.getElementById(`${player}Sum`).textContent);
            if  (plyrSum == 21) {
                let btnHitMe = document.getElementById(`btn${player}HitMe`);
                if (btnHitMe != null) {
                    btnHitMe.disabled = true;
                }
            }
        });
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

    let cardcount = document.querySelectorAll(".cardcount")[0];
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

    let truecount = document.querySelectorAll(".cardcount")[1];
    let remainingDecks = Math.round(parseInt(numOfCardsRemaining.textContent) / 52);
    if (remainingDecks == 0) { remainingDecks = 1; } // quick way to account for that last half of a deck
    truecount.textContent = Math.round(parseInt(cardcount.textContent) / remainingDecks);

    let plyrSum = document.getElementById(`${event.target.name}Sum`);
    var sum = parseInt(plyrSum.textContent);
    if (sum >= 21) { 
        let btnHitMe = document.getElementById(`btn${event.target.name}HitMe`);
        btnHitMe.disabled = true;
    }
}


function stay(event) {
    let btnHitMe = document.getElementById(`btn${event.target.name}HitMe`);
    btnHitMe.disabled = true;
    btnHitMe.classList.add('hide');
    let btnStay = document.getElementById(`btn${event.target.name}Stay`);
    btnStay.classList.add('hide');

    let idx = players.findIndex(p => p == event.target.name);
    if (idx == players.length - 2) {
        hitDealer();
    } else {
        let btnHitMeNext = document.getElementById(`btn${players[idx+1]}HitMe`);
        let btnStayNext = document.getElementById(`btn${players[idx+1]}Stay`);
        // btnHitMeNext.disabled = false;
        btnHitMeNext.classList.remove('hide');
        btnStayNext.classList.remove('hide');
    }


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

        let cardcount = document.querySelectorAll(".cardcount")[0];
        cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

        let truecount = document.querySelectorAll(".cardcount")[1];
        let remainingDecks = Math.round(parseInt(numOfCardsRemaining.textContent) / 52);
        if (remainingDecks == 0) { remainingDecks = 1; } // quick way to account for that last half of a deck
        truecount.textContent = Math.round(parseInt(cardcount.textContent) / remainingDecks);
    
        setTimeout(hitDealer, 3000);

    } 
    else {
        determineWinner(); /* I had to stick this here instead of completely outside of this function, because the setTimeout was having an adverse affect on how the recursive call was being made */
    }
        
}

    
function newGame() {
    btnNewGame.classList.add('hide')

    players.forEach(player => {
        let plyrCard1 = document.getElementById(`${player}Card1`);
        let plyrCard2 = document.getElementById(`${player}Card2`);
        let plyrBumpCards = document.getElementById(`${player}bumpedCards`);
        let plyrSum = document.getElementById(`${player}Sum`);
        plyrCard1.innerHTML = '';
        plyrCard2.innerHTML = '';
        plyrBumpCards.innerHTML = '';
        plyrSum.textContent = '0';
        if (player != "dlr") {
            let lblPlyrResult = document.getElementById(`${player}Result`);
            lblPlyrResult.textContent = "";
            let btnHitMe = document.getElementById(`btn${player}HitMe`);
            btnHitMe.disabled = false;
        }
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
    let lblcardcount = document.querySelectorAll(".cardcount");

    if (cbCardCount.checked) {
        lblcardcount.forEach(lbl => {
            lbl.classList.add('hide');
        });
    } else {
        lblcardcount.forEach(lbl => {
            lbl.classList.remove('hide');
        });
    }
}

