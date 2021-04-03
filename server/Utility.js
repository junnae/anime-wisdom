function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function weightedChance(length, maxSize) {
    if(length > maxSize) length = maxSize
    let number = randomIntFromInterval(length -1, maxSize );
    return number === maxSize ;
}

module.exports = { randomIntFromInterval, weightedChance}
