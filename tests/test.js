var LevelDulcimer = require('../index');
var async = require('async');
var concat = require('concat-stream');

process.on('uncaughtException', function (err) {
    console.trace();
    console.error(err.stack);
    process.exit();
});

var db = LevelDulcimer('./testdb');

module.exports = {
    'Use a bucket and an index': function (test) {
        async.waterfall([
            function (scb) {
                console.log(1);
                db.put('efga', {'nerd': 1}, {bucket: 'crap', indexes: [{key: 'herp_bin', value: 'nope'}]}, scb);
            }, 
            function (scb) {
                console.log(2);
                db.get('efga', function (err, thing) {
                    console.log(3);
                    console.log(arguments);
                    test.ok(err);
                    scb();
                });
            },
            function (scb) {
                console.log(4);
                db.createReadStream({bucket: 'crap', index: 'herp_bin', start: 'nope!', end: 'nope~'}).pipe(concat(function (results) {
                    console.log(5);
                    test.equals(results.length, 1);
                    scb();
                }));
            },
        ], function (err) {
            console.log(6);
            test.ifError(err);
            test.done();
        });
    }
};
