/*jshint esversion: 6 */
module.exports = (app) => {
    const validation = require('./../controllers/request-validator.controller.js');

    // @route   POST /requestValidation
    // @desc    Address validity check
    // @access  Public
    app.post('/requestValidation', validation.addressValidator);
     
    // @route   POST /message-signature/validate
    // @desc    Signature validity check
    // @access  Public
    app.post('/message-signature/validate', validation.signatureValidator);
};
