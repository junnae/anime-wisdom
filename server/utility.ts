export function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function weightedChance(length: number, maxSize: number) {
    return randomIntFromInterval(length -1, maxSize ) === maxSize ;
}
