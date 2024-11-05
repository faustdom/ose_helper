function calculate() {
    const playerNum = parseFloat(document.getElementById('playerNum').value);
    const retainerNum = parseFloat(document.getElementById('retainerNum').value);
    const totalTreasure = parseFloat(document.getElementById('totalTreasure').value);
    let result;

    if (isNaN(playerNum) || isNaN(retainerNum)) {
        result = "Please enter valid numbers.";
    } else {
        let retShares =  calcRetainerShares(retainerNum);
        let totalShares = calcTotalShares(playerNum, retShares);
        result = splitShares(totalShares, totalTreasure, playerNum, retainerNum);
    }

    document.getElementById('result').innerText = `${result}`;
}

function calcRetainerShares(retNum){
   return retNum / 2.0;
}

function calcTotalShares(retNum, playerNum){
    return retNum + playerNum;
}

function splitShares(totalShares, totalTreasure, playerNum, retainerNum) {
    // Helper function to calculate shares and split into gold and silver
    function calculateShares(shares) {
        const gold = Math.floor(shares); // Whole number (gold pieces)
        const silver = Math.round((shares - gold) * 100); // Decimal part (silver pieces)
        return { gold, silver };
    }

    // Calculate player and retainer shares
    const playerShares = (totalTreasure / totalShares).toFixed(2);
    const { gold: playerGoldPieces, silver: playerSilverPieces } = calculateShares(parseFloat(playerShares));

    const retainerShares = (parseFloat(playerShares) / 2).toFixed(2);
    const { gold: retGoldPieces, silver: retSilverPieces } = calculateShares(parseFloat(retainerShares));

    // Prepare the output
    let shares = `The players each get ${playerGoldPieces} Gold Pieces and ${playerSilverPieces} Silver Pieces\n`;
    shares += `The retainers each get ${retGoldPieces} Gold Pieces and ${retSilverPieces} Silver Pieces\n`;

    // Check for leftover copper pieces if there's any discrepancy
    const totalDistributedTreasure = (playerNum * parseFloat(playerShares)) + (retainerNum * parseFloat(retainerShares));
    if (totalDistributedTreasure !== totalTreasure) {
        const copperDiff = ((totalTreasure - totalDistributedTreasure) * 100).toFixed(0); // Calculate leftover copper
        shares += `There are ${copperDiff} Copper Pieces leftover\n`;
    }

    return shares;
}

