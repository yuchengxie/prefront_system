let Buffer = require('safe-buffer').Buffer;
let bip32 = require('bip32');
let createHash = require('create-hash');
let bs58check = require('bs58check');

let dict_schema_ = '@DICT';
let byte_schema_ = '@BYTE';
let rootAccount;
let openAccount;

module.exports = {
  getOpenAccount() {
    return openAccount || ''
  },
  seedToAccount(rootSeed) {
    rootAccount = bip32.fromSeed(Buffer.from(rootSeed));
    // console.log('privateKey:',rootAccount.privateKey);
    // console.log('rootAccount:',rootAccount.publicKey);

    openAccount = rootAccount.derivePath("m/44'/0'/0/0/0/0/0/888");
    console.log('privateKey:', openAccount.privateKey);
    console.log('publicKey:', openAccount.publicKey);
    return openAccount;
  },

  makeNbcPubAddr(pubKey, ver) {
    // step 1: public key --> public hash
    var h = createHash('sha512').update(pubKey).digest();
    var HL = createHash('ripemd160').update(h.slice(0, 32)).digest();
    var HR = createHash('ripemd160').update(h.slice(32, 64)).digest();
    var pubHash = createHash('sha256').update(HL).update(HR).digest();

    // step 2: prepare first 36 bytes of middle-addr: ver1 vcn2 hash32 cointype1
    var buf = Buffer.allocUnsafe(36);
    buf[0] = ver;
    buf[1] = 0;
    buf[2] = 0; // vcn fixed to 0
    pubHash.copy(buf, 3, 0, 32); // copy pubHash[0:32] to buf[3:]
    buf[35] = 0; // cointype = 0

    // step 3: make checkcode and append it to middle-addr, then translate to base58
    return bs58check.encode(buf); // add 4 bytes check code (double_hash[0:4])
  },

  sha256x2(buffer) { // buffer can be utf-8 string
    var tmp = createHash('sha256').update(buffer).digest();
    return createHash('sha256').update(tmp).digest();
  },

  serial_msg(msg) {
    console.log('serial_msg:', msg);
    var tp = msg === null ? 'null' : (msg instanceof Buffer ? 'bytes' : typeof (msg));
    if (tp == 'object') {
      if (typeof msg.length == 'number' && typeof msg.splice === 'function' && !msg.propertyIsEnumerable('length'))
        tp = 'array';
    }

    if (tp == 'object') {
      var attr, names = [];
      for (attr in msg) {
        if (msg.hasOwnProperty(attr))
          names.push(attr);
      }
      names.sort();

      var bRet = [dict_schema_];
      for (var i = 0; attr = names[i]; i++) {
        bRet.push([attr, this.serial_msg(msg[attr])]);
      }
      return bRet
    } else if (tp == 'bytes') {
      var bRet = msg.toJSON().data;
      bRet.splice(0, 0, byte_schema_);
      return bRet;
    } else return msg; // no changing
    // return msg;
  },

  unserial_msg(msg) {
    var tp = msg === null ? 'null' : typeof (msg);
    if (tp == 'object') {
      if (typeof msg.length == 'number' && typeof msg.splice == 'function' && !msg.propertyIsEnumerable('length'))
        tp = 'array';
    }

    if (tp == 'array' && msg.length > 0) {
      var schema = msg[0];
      if (schema == dict_schema_) {
        var dRet = {},
          size = msg.length;
        for (var i = 1; i < size; i++) {
          dRet[msg[i][0]] = this.unserial_msg(msg[i][1]);
        }
        return dRet;
      } else if (schema == byte_schema_)
        return Buffer.from(msg.slice(1));
    }

    return msg;
  },

  /**
   * byte型转换十六进制
   * @param b
   * @returns {string}
   * @constructor
   */
  Bytes2HexString(b) {
    let hexs = "";
    for (let i = 0; i < b.length; i++) {
      let hex = (b[i]).toString(16);
      if (hex.length === 1) {
        hexs = '0' + hex;
      }
      hexs += hex.toUpperCase();
    }
    return hexs;
  },
  /**
   * 十六进制转换btye型
   * @param str
   * @returns {Promise}
   */
  Hexstring2btye(str) {
    let pos = 0;
    let len = str.length;
    if (len % 2 != 0) {
      return null;
    }
    len /= 2;
    let hexA = new Array();
    // let hexA = new ArrayBuffer();
    for (let i = 0; i < len; i++) {
      let s = str.substr(pos, 2);
      let v = parseInt(s, 16);
      hexA.push(v);
      pos += 2;
    }
    // return hexA;
    hexA = new Buffer.from(hexA);
    return hexA;
  }
}