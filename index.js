var LevelBucket = require('level-bucket');
var Level2i = require('level-2i');
var levelup = require('levelup');
var LevelIncrement = require('level-increment');

function LevelDulcimer(path) {
    return Level2i(LevelIncrement(LevelBucket(levelup(path, {valueEncoding: 'json'}))));
}

module.exports = LevelDulcimer;
