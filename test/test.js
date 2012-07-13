/*!
 * winston-skywriter
 * Copyright(c) 2012 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var should = require('should');

var fs = require('fs');
var path = process.env.HOME || (process.env.HOMEDRIVE + process.env.HOMEPATH);
var testCredentials = JSON.parse(fs.readFileSync(path + '/.bluesky/test.json','ascii'));
var table = require('bluesky').storage({account: testCredentials.account, key: testCredentials.key}).table('winston');

var winston = require('winston');
var Skywriter = require('../lib/winston-skywriter').Skywriter;
winston.add(Skywriter,{
    account: testCredentials.account,
        key: testCredentials.key,
      table: table.name,
      level: 'warn',
  partition: require('os').hostname() + ':' + process.pid
}); 
winston.remove(winston.transports.Console);

describe('winston-skywriter:', function() {

  before(function() {
  });

  describe('a logger', function() {

    it('should log to Azure', function(done) {

      winston.warn('Warning, you are logging to Azure', 
        {uno: 1, dos: 'two', tres: true}, 
        function (err, level, msg, meta) {
          should.not.exist(err);
          level.should.equal('warn');
          msg.should.equal('Warning, you are logging to Azure');
          setTimeout(function() {
            done();
          }, 75);
        }
      );

    });

  });

});
