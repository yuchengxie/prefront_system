const bitcoinjs = require('bitcoinjs-lib');
let tools = require('./tools');

let pubHash = '664c099b1ee794ff01913910efb4bd915ed4ea47e8a1b5cd99467d79a786b8ee23cb46bf03a96647752f67267ee32e56aa91bb9cba87e10abbb3b519be96c2c4';
console.log('pubHash:', pubHash,pubHash.length);
let pubbuf = tools.Hexstring2btye(pubHash);
console.log('pubBuf:', pubbuf,pubbuf.length);
var s1 = bitcoinjs.crypto.ripemd160(pubbuf.slice(0, 32));
console.log('s1:',s1);
var s2 = bitcoinjs.crypto.ripemd160(pubbuf.slice(32, 64));
console.log('s2:',s2);



