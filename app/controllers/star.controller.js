const blockchain = require('./../services/blockchain.service');
const helpers = require('./../shared/helpers');

exports.findByHash = async (req, res) => {
    const hash = req.params.hash;

    try {
        let block = await blockchain.getBlockByHash(hash);

        block.body.star.storyDecoded = helpers.hexToString(block.body.star.story);
        res.send(block);

    } catch(err) {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: `Block not found with hash ${hash}`
          });
        }

        return res.status(500).send({
          message: `Error retrieving block with hash ${hash}`
        });
    }
};

exports.findByAddress = async (req, res) => {
    const address = req.params.address;

    try {
        let blocks = await blockchain.getBlockByAddress(address);

        blocks.forEach(block => {
            block.body.star.storyDecoded = helpers.hexToString(block.body.star.story);
        });

        res.send(blocks);

    } catch(err) {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: `Block not found with address ${address}`
          });
        }

        return res.status(500).send({
          message: `Error retrieving block with address ${address}`
        });
    }    
};
