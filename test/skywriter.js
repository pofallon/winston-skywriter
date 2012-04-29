var path = process.env.HOME || (process.env.HOMEDRIVE + process.env.HOMEPATH);
var testCredentials = JSON.parse(fs.readFileSync(path + '/.bluesky/test.json','ascii'));

var storage = require('bluesky').storage({account: testCredentials.account, key: testCredentials.key});
