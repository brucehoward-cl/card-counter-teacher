// document.addEventListener('DOMContentLoaded', () => {});


    const btnHitMe = document.getElementById('btnhitme');
    const btnHitDlr = document.getElementById('btnhitdlr');
    const btnNewGame = document.getElementById('btnnewgame');
    const form = document.getElementById('registrar');

    btnHitMe.addEventListener("click", hitMe);
    btnHitDlr.addEventListener("click", hitDealer);
    btnNewGame.addEventListener("click", newGame);
    

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
        let plyrCard1 = document.getElementById('plyrCard1');
        if (plyrCard1.textContent == 'This is the first card') {
            plyrCard1.textContent = 'Ace of Hearts';
            let plyrSum = document.getElementById('plyrSum');
            var sum = parseInt(plyrSum.textContent);
            sum += 11;
            plyrSum.textContent = sum;
        }
        else {
            plyrCard2.textContent = 'Jack of Hearts';
            let plyrSum = document.getElementById('plyrSum');
            var sum = parseInt(plyrSum.textContent);
            sum += 10;
            plyrSum.textContent = sum;
       }
    }

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


