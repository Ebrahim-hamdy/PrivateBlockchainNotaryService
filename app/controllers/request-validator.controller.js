/*jshint esversion: 6 */
const bitcoinMessage = require('bitcoinjs-message');

const helper = require('./../shared/helpers');

const ValidatorResponse = require('./../models/validator-response.model');


exports.addressValidator = async (req, res) => {
    
    let { validationRequests } = req.app.locals;
    let { address } = req.body;

        // Validate request
        if(helper.isEmptyOrSpaces(address) || Object.keys(req.body).length === 0) {
            return res.status(400).send({
              message: "Address can not be empty"
            });
        }

        let validationWindow = 300;
        let curretTimeStamp = new Date()
                                  .getTime()
                                  .toString()
                                  .slice(0, -3);

        if(validationRequests[address]) {
            let elapsedTimeStamp = (curretTimeStamp - validationRequests[address].requestTimeStamp);
                validationRequests[address].validationWindow = validationWindow - elapsedTimeStamp;

            if(validationRequests[address].validationWindow === 0) {
                delete validationRequests[address];
            }

        } else {
            validationRequests[address] = new ValidatorResponse(address);
        }

        res.send(validationRequests[address]);
}

exports.signatureValidator = async (req, res) => {

    let { validationRequests, validatedAddresses } = req.app.locals;
    let { address, signature } = req.body;

    // Validate request
    if(helper.isEmptyOrSpaces(signature) || helper.isEmptyOrSpaces(address) || Object.keys(req.body).length === 0) {
        return res.status(400).send({
          message: "Signature and address can not be empty"
        });
    }

    if(validationRequests[address]) {
        let message = validationRequests[address].message;

        // Verify signature
        let registerStar = bitcoinMessage.verify(message, address, signature);

        if(registerStar) {
            validationRequests[address].messageSignature = 'valid';
            validatedAddresses[address] = true;

        } else {
            validationRequests[address].messageSignature = 'invalid';
        }

        res.send({
            registerStar,
             status: validationRequests[address]
        });

    } else {
        return res.status(404).send({
          message: `Address ${address} not found`
        });
    }


}
