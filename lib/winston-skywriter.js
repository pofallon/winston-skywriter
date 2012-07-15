/*!
 * winston-skywriter
 * Copyright(c) 2012 Paul O'Fallon <paul@ofallonfamily.com>
 * MIT Licensed
 */

var util = require('util'),
    BlueSky = require('bluesky'),
    winston = require('winston')

var Skywriter = exports.Skywriter = function (options) {

  winston.Transport.call(this, options);

  options = options || {};

  this.name = 'skywriter';
  this.tableName = options.table || 'log';
  this.level = options.level || 'info';
  this.silent = options.silent || false;
  this.columns = options.columns || false;

  this.partition = options.partition || 'log';
  
  this.table = BlueSky.storage({account: options.account, key: options.key}).table(this.tableName);

};

util.inherits(Skywriter, winston.Transport);

winston.transports.Skywriter = Skywriter;

Skywriter.prototype.log = function (level, msg, meta, callback) {

  var self = this;

  if (this.silent) {
    return callback(null, true);
  }

  var data = {
    'level': level,
    'msg': msg,
  }  

  if (meta) { 

    if (this.columns) {
      for (var prop in meta) {
        if (typeof meta[prop] === 'object') {
          data[prop] = JSON.stringify(meta[prop]);
        } else {
	  data[prop] = meta[prop];
        }
      }
    } else {
      data.meta = JSON.stringify(meta);
    }

  }

  this.table.insert(this.partition, data, function(err, rowKey) {

    if (err) {
      self.emit('error', err);
    }

    self.emit('logged', rowKey);

    // callback(null,rowKey);

  });

  callback(null,true);

}; 
