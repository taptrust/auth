TapTrust Auth
=========

A library for the following:
- `createKeyPair`: create private/public keypairs with a username, password, and a randomly generated third factor used as a seed for key derivation.
- `restoreKeyPair`: provide a username, password and public key from a previously generated keypair, and this function will cycle through each possible random value until it generates the correct keypair (if one can be found).

## Installation

  `npm install @taptrust/auth`

## Usage

    ```
    var taptrustAuth = require('@taptrust/auth');

    var keyPair = taptrustAuth.createKeyPair(username, password);
    var restoredKeyPair = taptrustAuth.restoreKeyPair(username, password, keyPair.publicKey);
    ```



## Tests

  `npm test`
