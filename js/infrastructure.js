////////////////////SAMPLE HTML THAT GETS CREATED BY FUNCTIONS IN THIS MEMBER  ////////////////////
{/* <div class="plyrContainer">
    <button type="button" class="btn-stay" name="player1">Stay</button>
    <button type="button" class="btn-hitme" name="player1">Hit Me</button>
    <h2>Player 1</h2>
    <label id="player1Sum">18</label>
    <div class="plyrCards" name="player1Cards">
        <div class="dealtCards">
            <div id="player1Card1">
                <div class="card">
                    <span data-value="10">K</span>
                    <span>♣</span>
                    <span>♣</span>
                    <span>♣</span>
                    <span data-value="10">K</span>
                </div>
            </div>
            <div id="player1Card2">
                <div class="card">
                    <span data-value="8">8</span>
                    <span style="color: rgb(195, 7, 63);">♥</span>
                    <span style="color: rgb(195, 7, 63);">♥</span>
                    <span style="color: rgb(195, 7, 63);">♥</span>
                    <span data-value="8">8</span>
                </div>
            </div>
        </div>
        <div id="player1bumpedCards"></div>
    </div>
    <div class="plyrGameResult">
        <h2 id="player1Result"></h2>
    </div>
</div> */}
//////////////////////////////////////////////////////////////////////////////////////////////////////

function createPlayerHTML (playerNum) {
    const div = document.createElement('div');
    div.className = 'plyrContainer';

    const btnStay = document.createElement('button');
    btnStay.type = 'button';
    btnStay.className = 'btn-stay';
    btnStay.textContent = 'Stay';
    btnStay.name = `player${playerNum}`;
    btnStay.id = `btnplayer${playerNum}Stay`;
    btnStay.addEventListener("click", stay);


    const btnHitMe = document.createElement('button');
    btnHitMe.type = 'button';
    btnHitMe.className = 'btn-hitme';
    btnHitMe.textContent = 'Hit Me';
    btnHitMe.name = `player${playerNum}`;
    btnHitMe.id = `btnplayer${playerNum}HitMe`;
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
