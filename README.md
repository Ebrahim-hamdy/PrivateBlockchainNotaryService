### About
A simple API implementation of private blockchain notary service. It is ready to scale and build features on top of it.

### Requirements
* [Node.js: 8.11.3 LTS](https://nodejs.org)
* [express](https://www.express.com)
* [LevelDB](http://expressjs.com)
* [crypto-js](https://github.com/brix/crypto-js)
* [bitcoinjs-message](https://github.com/bitcoinjs/bitcoinjs-message)

## Usage

### Installation

## Run App

```sh
git clone https://github.com/ebrahim-hamdy/PrivateBlockchainNotaryService.git
cd PrivateBlockchainNotaryService
npm install
```

This installs the dependencies of the project.

### Start API server
```sh
npm start
```
This starts the API server, listening on port 8000 of localhost.

### Endpoints

The endpoints implemented are:

### GET /stars/address/:address

* **DESC:** Retrieve all stars owned by address
* **Request Body**
```json
{
  "address": ""
}
```
* **Response:**
```json
{
    "hash": "bece44f547ecabc89e1c7a41c1913cdcd17997d12412aaee0c36ec17ef14c594",
    "height": 3,
    "body": {
        "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "6e657720737461722073746f7279"
        }
    },
    "time": "1542541820",
    "previousBlockHash": "d69ad6cb88a5d3606aab98e55c0c1bab7fbd685536b75f8b756146c3774b857c"
}
```

### GET /stars/hash/:hash

* **DESC:** Retrieve entire star block with story decoded by hash
* **Request Body**
```json
{
  "hash": ""
}
```
* **Response:**
```json
{
    "hash": "bece44f547ecabc89e1c7a41c1913cdcd17997d12412aaee0c36ec17ef14c594",
    "height": 3,
    "body": {
        "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "6e657720737461722073746f7279"
        }
    },
    "time": "1542541820",
    "previousBlockHash": "d69ad6cb88a5d3606aab98e55c0c1bab7fbd685536b75f8b756146c3774b857c"
}
```

### POST /requestValidation

* **DESC:** Address validity check for `Star Registry`
* **Request Body**
```json
{
  "address": ""
}
```
* **Response:**
```json
{
    "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
    "validationWindow": 300,
    "requestTimeStamp": "1542541818",
    "message": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM:1542541818:starRegistry"
}
```

### POST /message-signature/validate

* **DESC:** Signature validity check
* **Request Body**
```json
{
  "address": "",
  "signature": ""
}
```
* **Response:**
```json
{   "registerStar": true,
    "status": {
        "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
        "validationWindow": 300,
        "requestTimeStamp": "1542541818",
        "message": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM:1542541818:starRegistry",
        "messageSignature": "valid"
    }
}
```

### POST /block

* **DESC:** Add a new bock to register star
* **Request Body**
```json
    {
      "address": "",
      "star":
      {
        "dec": "-26° 29'\'' 24.9",
        "ra": "16h 29m 1.0s",
        "story": "Found star using https://www.google.com/sky/"
      }
    }
```
* **Response:**
```json
{
    "hash": "d69ad6cb88a5d3606aab98e55c0c1bab7fbd685536b75f8b756146c3774b857c",
    "height": 2,
    "body": {
        "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "6e657720737461722073746f7279"
        }
    },
    "time": "1542525596",
    "previousBlockHash": "ee0dc902974cf21637a7ec3a2ce2c7de7c34aaba42078d57f2d44fb1736f46bd"
}
```

### GET /block/:height

* **DESC:** Find a single block with a block height
* **Request Param**
height[integer]

* **Response:**
```json
{
    "hash": "d69ad6cb88a5d3606aab98e55c0c1bab7fbd685536b75f8b756146c3774b857c",
    "height": 2,
    "body": {
        "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "6e657720737461722073746f7279"
        }
    },
    "time": "1542525596",
    "previousBlockHash": "ee0dc902974cf21637a7ec3a2ce2c7de7c34aaba42078d57f2d44fb1736f46bd"
}
```

### GET /getBlockHeight

* **DESC:** Retrieve and return blocks size.

* **Response:**
block size 4 

### GET /getChain

* **DESC:** Retrieve and return chain

* **Response:**
```json
{
    "hash": "868313aba6238879707f96f2410ef2f523ad0e81896c63b44f913765f95aaef0",
    "height": 0,
    "body": {
        "address": "genisi-block-address",
        "star": {
            "dec": "",
            "ra": "",
            "story": "Star Registry story just begins"
        }
    },
    "time": "1542524977"
},
{
    "hash": "ee0dc902974cf21637a7ec3a2ce2c7de7c34aaba42078d57f2d44fb1736f46bd",
    "height": 1,
    "body": {
        "address": "mqeqQyd77m5L63f548QbtLKZwM7Nw3ypiM",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "6e657720737461722073746f7279"
        }
    },
    "time": "1542525060",
    "previousBlockHash": "868313aba6238879707f96f2410ef2f523ad0e81896c63b44f913765f95aaef0"
}
```
