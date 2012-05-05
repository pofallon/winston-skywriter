# winston-skywriter

A [Windows Azure][0] table storage transport for [winston][1], utilizing the [bluesky][2] API for Windows Azure.

## Installation

``` bash
  $ npm install winston
  $ npm install winston-skywriter
```

## Usage
``` js
  var winston = require('winston');
  
  //
  // Requiring `winston-skywriter` will expose 
  // `winston.transports.Skywriter`
  //
  require('winston-skywriter').Skywriter;
  
  winston.add(winston.transports.Skywriter, options);
```

The Skywriter transport accepts the following options:

* __level:__ Level of messages that this transport should log (defaults to `info`).
* __account:__ The name of the Windows Azure storage account to use
* __key:__ The access key used to authenticate into this storage account
* __partition:__ The value to use for the PartitionKey in each row (defaults to 'log').  The RowKey is an auto-generated GUID.
* __columns:__ If `true`, the transport will store the metadata key/value pairs in individual columns (this can be helpful when querying table storage for log entries with specific metadata values).  The default is to store the entire `meta` value as a single JSON string in a 'meta' column.

### Helpful hint

When running multiple node instances across multiple hosts, a good value for 'partition' is:  
``` js
partition: require('os').hostname() + ':' + process.pid
```

[0]: http://www.windowsazure.com/en-us/develop/nodejs/
[1]: https://github.com/flatiron/winston
[2]: https://github.com/pofallon/node-bluesky
