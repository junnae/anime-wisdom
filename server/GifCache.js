const {weightedChance} = require("./Utility");
const {checkGifs, insertGif, numberOfGifs, getRandomGif} = require("./Database");
const { Cache } = require('./Cache')

class GifCache extends Cache{

    activeTimedObject() {
        return super.activeTimedObject();
    }

    trimCache() { } //Don't delete from database

    shouldUse() {
        let max = this.maxSize;
        numberOfGifs( function(err, result) {
            if (err) console.log(err)
            else return weightedChance(result, max)
        });
    }

//Inserts gif to database if it doesn't exist already
    add(s, shouldUpdateTimedCache) {
        let _this = this;
        checkGifs(s, function(err, exists) {
            if (err) console.log(err)
            else {
                if (!exists) insertGif(s, function (err, ok) {
                    if (err) console.log(err)
                    else {
                        if (shouldUpdateTimedCache) {
                            _this.timer = new Date(Date.now() + 10000)
                            _this._timedElement = s;
                        }
                    }
                })
            }
        });
    }


    maybeGetFromCache(old) {
        if (this.useTimer && this.activeTimedObject() && old === undefined) return this._timedElement
        if (!this.shouldUse()) return undefined
        getRandomGif(function (err, gif){
            if(err) console.log(err)
            else {
                if (gif === old) return undefined
                if (old !== undefined) {
                    this.timer = new Date(Date.now() + 10000)
                    this._timedElement = gif //Don't update timed cached element while shuffling
                }
                return gif;
            }
        });
    }
}

module.exports = { GifCache }
