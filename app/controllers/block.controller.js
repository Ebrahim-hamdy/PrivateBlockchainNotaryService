/*jshint esversion: 6 */
const memo = require('memory-cache');

const Block = require('./../models/block.model');
const Blockchain = require('./../services/simple-chain');
const helpers = require('./../shared/helpers');


const blockchain = new Blockchain();

// Add new Block
exports.addBlock = async (req, res) => {

  let { address, star } = req.body;
  let memoAddress = memo.get(address) || {};

  if(memoAddress) {
    let { ra, dec, story } = star;

    if (ra && dec && story) {
        story = helpers.stringToHex(story);

        if(!story) {
            return res.status(404).send({
              message: `Story must include only ASCII characters, limited to 500`
            });
        }

        let body = {
            address,
            star: { ra, dec, story }
        };

        const newBlock = new Block(body);
        await blockchain.addBlock(newBlock);
        memo.del(address);
        res.send(newBlock);

    } else {
        return res.status(404).send({
          message: `You must provide star object with ra, dec and story fields`
        });
    }

  } else {
        return res.status(404).send({
          message: `Address ${address} not found in validated addresses`
        });
  }
}

// Find a single block with a height
exports.getBlock = async (req, res) => {
  try {

    let block = await blockchain.getBlock(req.params.height);

    if(!block) {
        return res.status(404).send({
          message: "Block not found with height " + req.params.height
        });
    }
    res.send(block);

  } catch(err) {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Block not found with height " + req.params.height
      });
    }
    return res.status(500).send({
      message: "Error retrieving block with height " + req.params.height
    });
  }
};

// Retrieve and return blocks size.
exports.getBlockHeight = async (req, res) => {
  try{
    let size = await blockchain.getBlockHeight()

    res.send(`block size ${size}`);

  } catch(err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving block height."
    });
  }
};

// Retrieve and return chain.
exports.getChain = async (req, res) => {
  try{
    let chain = await blockchain.getChain()

    res.send(chain);

  } catch(err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving chain."
    });
  }
};
