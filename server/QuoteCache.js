const {weightedChance} = require("./Utility");
const {checkQuotes, insertQuote, numberOfQuotes, getRandomQuote} = require("./Database");
const {Cache} = require('./Cache')

class QuoteCache extends Cache {

    trimCache() {
    } //Don't delete from database

    shouldUse = (callback, max = this.maxSize) => numberOfQuotes(function (err, result) {
        if (err) callback(false)
        else callback(weightedChance(result, max))
    });

//Inserts qyote to database if it doesn't exist already
    add(s, shouldUpdateTimedCache) {
        checkQuotes(s["id"], function (err, exists) {
            if (err) console.error(err)
            else {
                if (!exists) insertQuote(s["id"], s["advice"], function (err, ok) {
                    if (err) console.log(err)
                    else {
                    }
                })
            }
        });
    }

    maybeGetFromCache(old, callback) {
        this.shouldUse(function(use){
            if (!use) return callback(undefined)
            getRandomQuote(function (err, quote) {
                if (err) {
                    console.error(err);
                    callback(undefined)
                }
                else callback(quote);
            });
        });
    }
}

module.exports = {QuoteCache}
