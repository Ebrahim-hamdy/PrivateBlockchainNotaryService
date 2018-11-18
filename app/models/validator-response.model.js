/*jshint esversion: 6 */
class ValidatorResponse {
    constructor(address) {
        this.address = address;
        this.validationWindow = 300;
        this.requestTimeStamp = new Date()
                                    .getTime()
                                    .toString()
                                    .slice(0, -3);
        this.message = `${this.address}:${this.requestTimeStamp}:starRegistry`;
    }
}

module.exports = ValidatorResponse;
