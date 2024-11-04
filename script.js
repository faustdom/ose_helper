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
    let shares = "";

    let playerShares = parseFloat((totalTreasure / totalShares).toFixed(2));
    const playerGoldPieces = Math.floor(playerShares); // Get the whole number (gold pieces)
    const playerSilverPieces = Math.round((playerShares - playerGoldPieces) * 100); // Get the decimal part (silver pieces)
    shares += `The players each get ${playerGoldPieces} Gold Pieces and ${playerSilverPieces} Silver Pieces\n`;

    let retainerShares = parseFloat((playerShares / 2).toFixed(2));
    const retGoldPieces = Math.floor(retainerShares); // Get the whole number (gold pieces)
    const retSilverPieces = Math.round((retainerShares - retGoldPieces) * 100); // Get the decimal part (silver pieces)
    shares += `The retainers each get ${retGoldPieces} Gold Pieces and ${retSilverPieces} Silver Pieces\n`;

    if (((playerNum * playerShares) + (retainerNum * retainerShares)) !== totalTreasure) {
       let copperDiff = parseFloat((totalTreasure - ((playerNum * playerShares) + (retainerNum * retainerShares))).toFixed(2));
        shares += `There are ${copperDiff * 100} Copper Pieces leftover\n`;
    }
    return shares;
}
