const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let grid = document.getElementById('grid');
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;

// Embaralhar as cartas
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Criar o tabuleiro
function createBoard() {
    shuffle(cardValues);
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

// Virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

// Verificar se as cartas combinam
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Desabilitar cartas combinadas
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Desvirar cartas se não combinarem
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetBoard();
    }, 1000);
}

// Reiniciar o tabuleiro
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Recomeçar o jogo
document.getElementById('restart').addEventListener('click', () => {
    grid.innerHTML = '';
    createBoard();
    matches = 0;
});

// Iniciar o jogo
createBoard();
