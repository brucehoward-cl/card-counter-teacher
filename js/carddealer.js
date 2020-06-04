document.addEventListener('DOMContentLoaded', () => {

    const dlrCard2 = document.getElementById('dlrCard2');

    const btnHitMe = document.getElementById('btnhitme');
    const btnstay = document.getElementById('btnstay');
    const form = document.getElementById('registrar');

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
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
    });

});
