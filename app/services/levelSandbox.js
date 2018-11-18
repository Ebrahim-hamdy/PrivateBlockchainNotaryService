/*jshint esversion: 6 */
/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './app/data/chaindata';
const db = level(chainDB);

self = {
    // Add data to levelDB with key/value pair
    addLevelDBData: (key, value) => {
        return new Promise((resolve, reject) => {
          db.put(key, value, err => {
            if (err) reject(err);
            resolve('Added block #' + key);
          });
        });
    },

    // Add data to levelDB with value
    addDataToLevelDB: value => {
      return new Promise((resolve, reject) => {
        let i = 0;
        db.createReadStream()
          .on('data', data => i++)
          .on('error', err => reject('Unable to read data stream!', err))
          .on('close', () => {
            self.addLevelDBData(i, value);
            resolve('Block #' + i);
          });
      });
    },    

    // Get data from levelDB by key
    getLevelDBData: key => {
       return new Promise((resolve, reject) => {
            db.get(key)
              .then(value => resolve(JSON.parse(value)))
              .catch(err => reject(err));
       });
    },

    // Get height from LevelDB
    getLevelDBHeight: () => {
        return new Promise((resolve, reject) => {
            let blockHeight = 0;
            db.createReadStream()
              .on('data', data => blockHeight++)
              .on('close', () => resolve(blockHeight))
              .on('error', err => reject(err));
        });
    },

    // Get chain from LevelDB
    getLevelDBChain: () => {
        return new Promise((resolve, reject) => {
            let chain = [];
            db.createReadStream()
              .on('data', data => chain.push(JSON.parse(data.value)))
              .on('error', err => reject(err))
              .on('close', () => resolve(chain));
        });
    },

    // Get block from levelDB by hash
    getBlockByHashFromDB: hash => {
        return new Promise((resolve, reject) => {
            let block;
            db.createReadStream()
              .on('data', data => {
                let value = JSON.parse(data.value);
                let blockHash = value.hash;

                if(blockHash === hash) block = value;
              })
              .on('error', err => reject(err))
              .on('close', () => resolve(block));
        });
    },

    // Get block from levelDB by address
    getBlocksByAddressFromDB: address => {
        return new Promise((resolve, reject) => {
            let blocks = [];
            db.createReadStream()
              .on('data', data => {
                let value = JSON.parse(data.value);
                let blockAdress = value.body.address;
                if(blockAdress === address) blocks.push(value);
              })
              .on('err', err => reject(err))
              .on('close', () => resolve(blocks));
        });
    }
};

module.exports = self;

/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/


// (function theLoop (i) {
//   setTimeout(function () {
//     self.addDataToLevelDB('Testing data').then((result) => console.log(result));
//     if (--i) theLoop(i);
//   }, 100);
// })(10);
