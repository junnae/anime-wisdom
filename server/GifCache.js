const {weightedChance} = require("./Utility");
const {checkGifs, insertGif, numberOfGifs, getRandomGif} = require("./Database");
const { Cache } = require('./Cache')

class GifCache extends Cache{

    activeTimedObject() {
        return super.activeTimedObject();
    }

    trimCache() { } //Don't delete from database

    shouldUse = (callback, max = this.maxSize) => numberOfGifs( function(err, result) {
            if (err) callback(false)
            else callback(weightedChance(result, max))
        });

//Inserts gif to database if it doesn't exist already
    add(s, shouldUpdateTimedCache) {
        let _this = this;
        checkGifs(s, function(err, exists) {
            if (err) console.error(err)
            else {
                if (!exists) insertGif(s, function (err, ok) {
                    if (err) console.error(err)
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


    maybeGetFromCache(old, callback, timer = this.timer, timedElement = this._timedElement) {
        if (this.useTimer && this.activeTimedObject() && old === undefined) return callback(this._timedElement)
        this.shouldUse(function(use){
            if (!use) return callback(undefined)
            getRandomGif(function (err, gif){
                if(err) callback(undefined)
                else {
                    if (gif === old) return callback(undefined)
                    if (old === undefined) {
                        timer = new Date(Date.now() + 10000)
                        timedElement = gif //Don't update timed cached element while shuffling
                    }
                    callback(gif);
                }
            });
        });
    }
}

module.exports = { GifCache }
