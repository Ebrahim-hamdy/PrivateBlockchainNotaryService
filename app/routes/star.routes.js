/*jshint esversion: 6 */
module.exports = (app) => {
    const star = require('./../controllers/star.controller.js');
    
    // @route   GET /stars/address/:address
    // @desc    Retrieve entire star block with story decoded by address
    // @access  Public
    app.get('/stars/address::address', star.findByAddress);

    // @route   GET /stars/hash/:hash
    // @desc    Retrieve entire star block with story decoded by hash
    // @access  Public
    app.get('/stars/hash::hash', star.findByHash);
};
