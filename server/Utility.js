function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function weightedChance(length, maxSize) {
    return randomIntFromInterval(length -1, maxSize ) === maxSize ;
}

module.exports = { randomIntFromInterval, weightedChance}
