/*!
 * winston-skywriter
 * Copyright(c) 2011 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var util = require('util'),
    BlueSky = require('bluesky'),
    winston = require('winston');

var Skywriter = exports.Skywriter = function (options) {

  options = options || {};

  if (!options.account || !options.key) {
    throw new Error("Cannot log to Skywriter without an Azure account and key");
  }

  this.name = 'skywriter';
  this.account = options.account;
  this.key = options.key;
  this.tableName = options.table || 'log';
  this.level = level || 'info';
  this.silent = options.silent || false;

  this.partition = options.partition || 'log';
  
  this.table = BlueSky.storage({account: this.account, key: this.key}).table(this.tableName);

};

util.inherits(Skywriter, winston.Transport);

winston.transports.Skywriter = Skywriter;

Skywriter.prototype.log = function (level, msg, meta, callback) {

  if (this.silent) {
    return callback(null, true);
  }

  var data = {
    'level':level,
    'msg':msg,
    'meta':JSON.stringify(meta)
  }

  this.table.insert(partition, data, function(err) {
    if (err) {
      self.emit('error', err);
    }

    self.emit('logged');

  });

  callback(null,true);

}; 
