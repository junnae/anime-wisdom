const {randomIntFromInterval, weightedChance} = require('./Utility');

class Cache {
    cache = [];
    maxSize;
    useTimer;
    timer = new Date(1970, 1,)
    _timedElement = undefined;

    constructor(maxSize = 1000, useTimer = false) {
        this.maxSize = maxSize;
        this.useTimer = useTimer;
    }

    activeTimedObject() {
        return this._timedElement !== undefined && new Date(Date.now()) < this.timer;
    }

    add(s, shouldUpdateTimedCache) {
        this.cache.push(s);
        this.trimCache();
        if (shouldUpdateTimedCache) {
            this.timer = new Date(Date.now() + 10000)
            this._timedElement = s;
        }
    }

    trimCache() {
        while (this.cache.length > this.maxSize) this.cache.shift()
    }

    //Increase cache chance with size
    shouldUse() {
        return this.cache.length > 0 && weightedChance(this.cache.length, this.maxSize)
    }

    maybeGetFromCache(old) {
        if (this.useTimer && this.activeTimedObject() && old === undefined) return this._timedElement
        if (!this.shouldUse()) return undefined
        let randomCachedElement = this.cache[randomIntFromInterval(0, this.cache.length - 1)]
        if (randomCachedElement === old) return undefined
        if (old !== undefined) {
            this.timer = new Date(Date.now() + 10000)
            this._timedElement = randomCachedElement //Don't update timed cached element while shuffling
        }
        return randomCachedElement
    }
}

module.exports = {Cache}
