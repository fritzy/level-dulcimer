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
                db.put('efga', {'nerd': 1}, {bucket: ['crap', 'dap'], indexes: [{key: 'herp_bin', value: 'nope'}]}, scb);
            }, 
            function (scb) {
                db.get('efga', function (err, thing) {
                    test.ok(err);
                    scb();
                });
            },
            function (scb) {
                db.createReadStream({bucket: ['crap', 'dap'], index: 'herp_bin', start: 'nope!', end: 'nope~'}).pipe(concat(function (results) {
                    test.equals(results.length, 1);
                    scb();
                }));
            },
        ], function (err) {
            test.ifError(err);
            test.done();
        });
    }
};
