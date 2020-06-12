let divDlr = document.getElementById('dlrDiv');
const divPlyr = document.getElementById('plyrDiv');

const btnHitMe = document.getElementById('btnhitme');
const btnStay = document.getElementById('btnstay');
const btnNewGame = document.getElementById('btnnewgame');
const cbCardCount = document.getElementById('cbCardCount');

btnHitMe.addEventListener("click", hitMe);
btnStay.addEventListener("click", stay);
btnNewGame.addEventListener("click", newGame);
cbCardCount.addEventListener("click", toggleCardCount);


function dealCard() {
    let card = deckOfCards[randomNumber(51)]; 
    return card;
}
    
function randomNumber(upper) {
    return Math.floor( Math.random() * upper ) + 1;
  }
    
function placeCard(newcard, cardID, sumID) {
    let rankElements = document.getElementsByClassName(`${cardID}rank`);
    let suitElements = document.getElementsByClassName(`${cardID}suit`);
    for (let i = 0; i < rankElements.length; i++)
    {
        rankElements[i].innerHTML = newcard.rank;
    }
    for (let i = 0; i < suitElements.length; i++)
    {
        suitElements[i].innerHTML = newcard.suit;
    }

    let sum = document.getElementById(sumID);
    sum.textContent = parseInt(sum.textContent) + parseInt(newcard.value);
    let cardcount = document.getElementById("cardcount");
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(newcard.count);

}  

function DealHands() {

    let newcard = dealCard();
    placeCard(newcard,'plyrCard1','plyrSum');
    newcard = dealCard();
    placeCard(newcard,'dlrCard1','dlrSum');
    newcard = dealCard();
    placeCard(newcard,'plyrCard2','plyrSum');
    newcard = dealCard();
    placeCard(newcard,'dlrCard2','dlrSum');

}

function stay() {
    setTimeout(hitDealer, 3000);
}

function createCardHTML (card) {

    const div = document.createElement('div');
    const divtop = document.createElement('div');
    const divbottom = document.createElement('div');
    const spanrank = document.createElement('span');
    const spansuit = document.createElement('span');
    const spanmainsuit = document.createElement('span');

    spanrank.innerHTML = card.rank;
    spansuit.innerHTML = card.suit;
    spanmainsuit.innerHTML = card.suit;

    const spanrank2 = spanrank.cloneNode(true);
    const spansuit2 = spansuit.cloneNode(true);

    div['className'] = 'card';
    divtop['className'] = 'top';
    divbottom['className'] = 'bottom';
    spanmainsuit['className'] = 'suit';
    div.appendChild(divtop);
    div.appendChild(spanmainsuit);
    div.appendChild(divbottom);
    divtop.appendChild(spanrank);
    divtop.appendChild(spansuit);
    divbottom.appendChild(spansuit2);
    divbottom.appendChild(spanrank2);

    return div;
}

function hitDealer() {
    let dlrSum = document.getElementById('dlrSum');
    var sum = parseInt(dlrSum.textContent);
    if (sum <= 16) {

        let card = dealCard();

        let newCardDiv = createCardHTML(card);
        divDlr.appendChild(newCardDiv);

        sum += parseInt(card.value);
        dlrSum.textContent = sum;

        let cardcount = document.getElementById("cardcount");
        cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);

        stay();
    }
    
}


function hitMe() {
    let card = dealCard();

    let newCardDiv = createCardHTML(card);
    divPlyr.appendChild(newCardDiv);

    let plyrSum = document.getElementById('plyrSum');
    var sum = parseInt(plyrSum.textContent);
    sum += parseInt(card.value);
    plyrSum.textContent = sum;
    let cardcount = document.getElementById("cardcount");
    cardcount.textContent = parseInt(cardcount.textContent) + parseInt(card.count);
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


function toggleCardCount() {
    let cardcount = document.getElementById("cardcount");
    if (cbCardCount.checked) {
        cardcount.classList.add('hidecount');
    } else {
        cardcount.classList.remove('hidecount');
    }
  
}