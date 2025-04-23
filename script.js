const images = [
    './images/card1.jpg',
    './images/card2.jpg',
    './images/card3.jpg',
    './images/card4.jpg',
    './images/card5.jpg',
    './images/card6.jpg',
];

const cards = [...images, ...images];
shuffle(cards);

function shuffle(array) {
    for(let i=array.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));    
        [array[i], array[j]] = [array[j], array[i]];
    } 
}

const gameBoard = document.getElementById('gameBoard');

cards.forEach((src, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.name = src;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${src}">
            </div>
            <div class="card-back"></div>
        </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
});

let flippedCards = [];
let lockeBoard = false;

function flipCard(card) {
    if(lockBoard || flippedCards.includes(card)) return;

    card.classlist.add('flipped');
    flippedCards.push(card);

    if(flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if(first.dateset.name === second.dateset.name) {
            flippedCards = [];
        }
        else {
            lockBoard = true
            setTimeout(() => {
                first.classlist.remove('flipped');
                second.classlist.remove('flipped');
                flippedCards = [];
                lockBoard = false;
                
            }, 1000);
        }
    }
}