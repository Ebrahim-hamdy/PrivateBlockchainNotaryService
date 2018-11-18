/*jshint esversion: 6 */
exports.isEmptyOrSpaces = str => {
    return (!str) || str.match(/^ *$/) !== null;
};

exports.hexToString = hex => {
    let string = "";

    for (let i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }

    return string;
};

exports.stringToHex = str => {
    // return false if story is more than 500 bytes
    if (str.length > 500) {
        return false;
    }

    let hex = "";

    for (let i = 0; i < str.length; i++) {
        // return false if there is non-ascii character
        if (str.charCodeAt(i) > 127) return false;
        hex += "" + str.charCodeAt(i).toString(16);
    }
    
    return hex;
};
