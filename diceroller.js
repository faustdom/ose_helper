//
// Variables
//

// Elements in the UI
const result = document.querySelector('#result');
const diceCount = document.getElementById('diceCount');

// Dice arrays
const dice = {
    d4: [1, 2, 3, 4],
    d6: [1, 2, 3, 4, 5, 6],
    d8: [1, 2, 3, 4, 5, 6, 7, 8],
    d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    d100: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
};

// Placeholder for die rolls
let rolls;

//
// Methods
//

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {Array}      The first item in the shuffled array
 */
const shuffle = function (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

/**
 * Shuffle the dice on page load
 */
const startingShuffle = function () {
    for (const key in dice) {
        if (dice.hasOwnProperty(key)) {
            shuffle(dice[key]);
        }
    }
};

/**
 * Roll the dice
 * @param  {String} d The die size to use
 */
const roll = function (d) {
    shuffle(dice[d]);
    rolls.push(dice[d][0]);
};

/**
 * Handle click events
 * @param  {Event} event The event object
 */
const clickHandler = function (event) {

    // Only run on [data-roll] elements
    const d = event.target.getAttribute('data-roll');
    if (!d) return;

    const rollCount = parseInt(diceCount.value);
    let count = 0;

    // Clear the rolls array
    rolls = [];

    while (count < rollCount) {
        roll(d);
        count++;
    }

    // Render the result in the UI
    result.textContent = rolls.join(' - ');

};


//
// Event Listeners
//

// Shuffle the dice numbers on load
startingShuffle();

// Listen for clicks in the DOM
document.addEventListener('click', clickHandler);