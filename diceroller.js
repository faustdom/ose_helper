// Globals
const result     = document.querySelector('#result');
const sum        = document.querySelector('#sum');
const diceCount  = document.getElementById('diceCount');
let lastStatSet = null;

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

const classMatrix = {
    Assassin: {
        DEX: ['P']
    },
    Barbarian: {
        STR: ['P'],
        DEX: ['R-9'],
        CON: ['P']
    },
    Bard: {
        INT: ['R-9'],
        DEX: ['R-9'],
        CHA: ['P']
    },
    Cleric: {
        WIS: ['P']
    },
    Drow: {
        STR: ['P'],
        INT: ['R-9'],
        WIS: ['P']
    },
    Druid: {
        WIS: ['P']
    },
    Duergar: {
        STR: ['P'],
        INT: ['R-9'],
        CON: ['R-9']
    },
    Dwarf: {
        STR: ['P'],
        CON: ['R-9']
    },
    Elf: {
        STR: ['P'],
        INT: ['R-9','P']
    },
    Fighter: {
        STR: ['P']
    },
    Gnome: {
        WIS: ['P'],
        CON: ['R-9']
    },
    'Half-Elf': {
        STR: ['P'],
        WIS: ['P'],
        CON: ['R-9'],
        CHA: ['R-9']
    },
    Halfling: {
        STR: ['P'],
        DEX: ['R-9'],
        WIS: ['P'],
        CON: ['R-9']
    },
    'Half-Orc': {
        STR: ['P'],
        DEX: ['P']
    },
    Illusionist: {
        INT: ['P'],
        DEX: ['R-9']
    },
    Knight: {
        STR: ['P'],
        DEX: ['R-9'],
        CON: ['R-9']
    },
    'Magic-User': {
        INT: ['P']
    },
    Paladin: {
        STR: ['P'],
        WIS: ['P'],
        CHA: ['R-9']
    },
    Ranger: {
        INT: ['R-9'],
        DEX: ['R-9'],
        CON: ['R-9']
    },
    Svirfneblin: {
        STR: ['P'],
        CON: ['R-9']
    },
    Thief: {
        DEX: ['P']
    },
    Acolyte: {
        WIS: ['P']
    },
    Gargantuan: {
        STR: ['R-9'],
        WIS: ['P'],
        CON: ['R-9']
    },
    Goblin: {
        STR: ['P'],
        WIS: ['R-9'],
        CON: ['P']
    },
    Hephaestus: {
        INT: ['P'],
        WIS: ['P'],
        CON: ['R-9'],
        CHA: ['R-9']
    },
    Kineticist: {
        WIS: ['P'],
        DEX: ['P']
    },
    'Phase-Elf': {
        STR: ['P'],
        INT: ['R-9'],
        WIS: ['P']
    },
    'Wood-Elf': {
        INT: ['R-9'],
        WIS: ['P'],
        DEX: ['R-9']
    },
    'Beast Master': {
        STR: ['P'],
        WIS: ['P']
    },
    Dragonborn: {
        STR: ['P'],
        INT: ['R-9'],
        CON: ['R-9']
    },
    Mycelian: {
        STR: ['P'],
        CON: ['R-9']
    },
    Tiefling: {
        INT: ['R-9'],
        DEX: ['P'],
        CHA: ['P']
    },
    'Halfling Hearthsinger': {
        DEX: ['R-9'],
        CON: ['R-9'],
        CHA: ['P']
    },
    'Halfling Reeve': {
        INT: ['R-9'],
        DEX: ['P'],
        CON: ['R-9'],
        CHA: ['P']
    },
    'Arcane Bard': {
        INT: ['R-9'],
        DEX: ['P'],
        CHA: ['P']
    }
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
    const stats  = {};
    const lines  = [];

    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const rolls = rollMultipleDice('d6', 3); // or await roll3dDice if 3D
        const tot   = rolls.reduce((a,b) => a + b, 0);
        stats[label] = tot;
        lines.push(`${label}: ${rolls.join(' - ')}\nSum: ${tot}`);
    }

    rollGold(lines);

    lastStatSet = stats;
    document.getElementById('viableResults').style.display = 'none';
    document.getElementById('checkViableBtn').style.display = 'inline-block';
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

function rankClassesByStats(stats) {
    const results = [];

    for (const [cls, reqs] of Object.entries(classMatrix)) {
        let valid = true;
        let totalPrimes = 0;
        let primeHits   = 0;

        // Loop each stat the class cares about
        for (const [stat, ruleOrRules] of Object.entries(reqs)) {
            // normalize to an array
            const rules = Array.isArray(ruleOrRules)
                ? ruleOrRules
                : [ruleOrRules];

            // 1) check all R-9 requirements
            if (rules.includes('R-9') && stats[stat] < 9) {
                valid = false;
                break;
            }

            // 2) count primes
            if (rules.includes('P')) {
                totalPrimes += 1;
                if (stats[stat] >= 13) primeHits += 1;
            }
        }

        if (!valid) continue;

        // compute percentage (100% if no primes at all)
        const pct = totalPrimes > 0
            ? Math.round((primeHits / totalPrimes) * 100)
            : 100;

        results.push({ cls, pct });
    }

    // sort and format
    return results
        .sort((a, b) => b.pct - a.pct || a.cls.localeCompare(b.cls))
        .map(r => `${r.cls} (${r.pct}%)`);
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

// === New listener for “Check Viable Characters” ===
document.getElementById('checkViableBtn')
    .addEventListener('click', () => {
        const outDiv    = document.getElementById('viableResults');
        const stats     = lastStatSet;
        if (!stats) return;

        const ranked    = rankClassesByStats(stats);
        const cutoff    = 75; // ≥75% → Recommendation
        const recommended = ranked.filter(r => r.pct >= cutoff);
        const possible    = ranked.filter(r => r.pct <  cutoff);

        let text = '';

        if (recommended.length) {
            text += '🌟 Recommended Classes (≥ ' + cutoff + '% primes):\n';
            text += recommended.map(r => `${r.cls} (${r.pct}%)`).join('\n') + '\n\n';
        }

        if (possible.length) {
            text += '🔹 Possible Classes:\n';
            text += possible.map(r => `${r.cls} (${r.pct}%)`).join('\n');
        }

        outDiv.textContent    = text.trim();
        outDiv.style.display  = 'block';
    });

//
// Kick things off
//
initializeDice();
document.addEventListener('click', handleRollClick);
