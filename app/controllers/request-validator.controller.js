/*jshint esversion: 6 */
const bitcoinMessage = require('bitcoinjs-message');
const memo = require('memory-cache');

const helper = require('./../shared/helpers');

const ValidatorResponse = require('./../models/validator-response.model');


validateAddress = async(address) => {

    let memoAddress = memo.get(address);
    let validationWindow = 300;
    let curretTimeStamp = new Date()
                              .getTime()
                              .toString()
                              .slice(0, -3);

    if(memoAddress) {

        let elapsedTimeStamp = (curretTimeStamp - memoAddress.requestTimeStamp) / 1000;
            memoAddress.validationWindow = validationWindow - elapsedTimeStamp;

        if(elapsedTimeStamp.validationWindow === 0) {
            memo.del(address);
            return ('Validation window expired. Please re-start validation process.');
        }

        return memoAddress;

    } else {

        let validatorResponse = new ValidatorResponse(address);
        memo.put(validatorResponse.address, validatorResponse);
        return validatorResponse;
    }
}

exports.addressValidator = async (req, res) => {
    let address = req.body.address;

    // Validate request
    if(helper.isEmptyOrSpaces(address) || Object.keys(req.body).length === 0) {
        return res.status(400).send({
          message: "Address can not be empty"
        });
    }

    let validAddress = await validateAddress(address);
    res.send(validAddress);
}

exports.signatureValidator = async (req, res) => {
    let signature = req.body.signature;
    let address = req.body.address;

    // Validate request
    if(helper.isEmptyOrSpaces(signature) || helper.isEmptyOrSpaces(address) || Object.keys(req.body).length === 0) {
        return res.status(400).send({
          message: "Signature and address can not be empty"
        });
    }

    let validationReq = await validateAddress(address);
    let registerStar = bitcoinMessage.verify(validationReq.message, validationReq.address, signature);
    
    memo.put(validationReq.message, validationReq);
    validationReq['messageSignature'] = registerStar ? 'valid' : 'invalid';

    res.send({
        "registerStar": registerStar,
         "status": validationReq
    });
}
