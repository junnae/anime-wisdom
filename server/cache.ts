import {randomIntFromInterval, weightedChance} from './utility';

export class Cache {
    private cache: string[] = [];
    private readonly maxSize: number;
    private readonly useTimer: boolean;
    private timer = new Date(1970, 1,)
    private _timedElement?: string = undefined;

    constructor(maxSize: number = 100, useTimer: boolean = false) {
        this.maxSize = maxSize;
        this.useTimer = useTimer;
    }

    private activeTimedObject() {
        return this._timedElement !== undefined && new Date(Date.now()) < this.timer;
    }

    public add(s: string, shouldUpdateTimedCache: boolean) {
        this.cache.push(s);
        this.trimCache();
        if (shouldUpdateTimedCache) {
            this.timer = new Date(Date.now() + 10000)
            this._timedElement = s;
        }
    }

    private trimCache() {
        while (this.cache.length > this.maxSize) this.cache.shift()
    }

    //Increase cache chance with size
    private shouldUse(): boolean {
        return this.cache.length > 0 && weightedChance(this.cache.length, this.maxSize)
    }

    public maybeGetFromCache(old: string | undefined = undefined): string | undefined {
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
