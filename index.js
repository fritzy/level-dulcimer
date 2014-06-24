var LevelBucket = require('level-bucket');
var Level2i = require('level-2i');
var levelup = require('levelup');

function LevelDulcimer(path) {
    return Level2i(LevelBucket(levelup(path, {valueEncoding: 'json'})));
}

module.exports = LevelDulcimer;
