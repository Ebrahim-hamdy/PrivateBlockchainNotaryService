/*jshint esversion: 6 */
module.exports = (app) => {
    const block = require('./../controllers/block.controller.js');

    // @route   POST /block
    // @desc    Add a new block to register star
    // @access  Public
    app.post('/block', block.addBlock);
    
    // @route   GET /block/:height
    // @desc    Find a single block with a height
    // @access  Public
    app.get('/block/:height', block.getBlock);

    // @route   GET /getBlockHeight
    // @desc    Retrieve and return blocks size.
    // @access  Public
    app.get('/getBlockHeight', block.getBlockHeight);

    // @route   GET /getChain
    // @desc    Retrieve and return chain
    // @access  Public
    app.get('/getChain', block.getChain);
};
