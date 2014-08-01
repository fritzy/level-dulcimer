var LevelBucket = require('level-bucket');
var Level2i = require('level-2i');
var levelup = require('levelup');
var LevelIncrement = require('level-increment');
var LevelBucketArray = require('level-bucketarray');
var LevelForeignKeys = require('level-foreignkeys');
var LevelContinuation = require('level-continuation');

function LevelDulcimer(path) {
    return LevelForeignKeys(Level2i(LevelContinuation(LevelIncrement(LevelBucketArray(LevelBucket(levelup(path, {valueEncoding: 'json'})))))));
}

module.exports = LevelDulcimer;
