// diceroller.js
// -------------------
// Grab your DOM elements
const result     = document.querySelector('#result');
const sum        = document.querySelector('#sum');
const diceCount  = document.getElementById('diceCount');

// Define all the dice faces
const dice = {
    d4:   [1, 2, 3, 4],
    d6:   [1, 2, 3, 4, 5, 6],
    d8:   [1, 2, 3, 4, 5, 6, 7, 8],
    d10:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    d12:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    d20:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    d100: Array.from({ length: 100 }, (_, i) => i + 1),
};

// Fisher–Yates shuffle
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// On page load, shuffle each die
const initializeDice = () => {
    Object.values(dice).forEach(shuffleArray);
};

// Roll one die of the given type
const rollDie = (dieType) => {
    shuffleArray(dice[dieType]);
    return dice[dieType][0];
};

// Roll several dice of the same type
const rollMultipleDice = (dieType, count) => {
    return Array.from({ length: count }, () => rollDie(dieType));
};

// Display an array of rolls and their sum
const displayResults = (rolls) => {
    result.textContent = `Rolls: ${rolls.join(' - ')}`;
    sum.textContent    = `Sum: ${rolls.reduce((a, b) => a + b, 0)}`;
};

// Roll 6 sets of 3d6 for character stats
const rollStats = () => {
    const labels = ['STR', 'INT', 'WIS', 'DEX', 'CON', 'CHA'];
    const allStats = Array.from({ length: 6 }, () => rollMultipleDice('d6', 3));

    const lines = allStats.map((roll, index) => {
        const label = labels[index];
        const sum = roll.reduce((a, b) => a + b, 0);
        return `${label}:  ${roll.join(' - ')}\nSum: ${sum}`;
    });

    rollGold(lines);
};

// Roll Gold
const rollGold = (lines) => {
    // Roll gold: 3d6 × 10
    const goldRoll = rollMultipleDice('d6', 3);
    const goldTotal = goldRoll.reduce((a, b) => a + b, 0) * 10;
    lines.push(`\nGold:  ${goldRoll.join(' - ')}\nTotal: ${goldTotal}`);

    result.textContent = lines.join('\n\n');
    sum.textContent = '';
}




//
// Handle any button click with data-roll
//
const handleRollClick = (event) => {
    const dieType = event.target.getAttribute('data-roll');
    if (!dieType) return;

    // If it's the Stats button…
    if (dieType === 'stats') {
        rollStats();
        return;
    }

    let lines = [];
    // If it's the Stats button…
    if (dieType === 'gold') {
        rollGold(lines);
        return;
    }

    // Otherwise it's a normal die
    const rollCount = parseInt(diceCount.value, 10) || 1;
    const rolls     = rollMultipleDice(dieType, rollCount);
    displayResults(rolls);
};

//
// Kick things off
//
initializeDice();
document.addEventListener('click', handleRollClick);
