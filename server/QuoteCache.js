const {weightedChance} = require("./Utility");
const {checkQuotes, insertQuote, numberOfQuotes, getRandomQuote} = require("./Database");
const { Cache } = require('./Cache')

class QuoteCache extends Cache{

    trimCache() { } //Don't delete from database

    shouldUse() {
        let max = this.maxSize;
        numberOfQuotes( function(err, result) {
            if (err) console.error(err)
            else return weightedChance(result, max)
        });
    }

//Inserts qyote to database if it doesn't exist already
    add(s, shouldUpdateTimedCache) {
        let _this = this;
        checkQuotes(s["id"], function(err, exists) {
            if (err) console.log(err)
            else {
                if (!exists) insertQuote(s["id"], s["advice"], function (err, ok) {
                    if (err) console.log(err)
                    else {
                    }
                })
            }
        });
    }

    maybeGetFromCache(old) {
        if (!this.shouldUse()) return undefined
        getRandomQuote(function (err, quote){
            if(err) console.log(err)
            else {
                return quote;
            }
        });
    }
}

module.exports = { QuoteCache }
