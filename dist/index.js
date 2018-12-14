'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateKeys = exports.restoreKeyPair = exports.createKeyPair = undefined;

var _jsSha = require('js-sha256');

var wallet = require('./eth-wallet');

var seedPrefix = 'taptrust-wallet-';
var minFactorValue = 1000;
var maxFactorValue = 5000;

var generateSeed = function generateSeed(username, password, randomFactor) {
    return seedPrefix + username + '-' + password + '-' + randomFactor;
};

var getRandomFactor = function getRandomFactor() {
    var value = Math.floor(Math.random() * (maxFactorValue - minFactorValue)) + minFactorValue;
    return value.toString();
};

function makeRangeIterator(start, end, step) {
    var nextIndex = start;
    var iterationCount = 0;

    var rangeIterator = {
        next: function next() {
            var counter = void 0;
            if (nextIndex <= end) {
                counter = { value: nextIndex, done: false };
                nextIndex += step;
                iterationCount++;
                return counter;
            }
            return { value: iterationCount.toString(), done: true };
        }
    };
    return rangeIterator;
}

// function for creating new keypair from username/password credentials
var createKeyPair = function createKeyPair(username, password) {
    var randomFactor = getRandomFactor();
    return generateKeys(username, password, randomFactor);
};

var generateKeys = function generateKeys(username, password, randomFactor) {
    var seed = generateSeed(username, password, randomFactor);
    var token = (0, _jsSha.sha256)(seed);
    var w = wallet.generate(false, token);
    var privateKey = w.getPrivateKeyString();
    var publicKey = w.getPublicKeyString();
    var result = {
        publicKey: publicKey,
        privateKey: privateKey,
        randomFactor: randomFactor
    };
    return result;
};

// function for restoring already generated keypair with a known public key
var restoreKeyPair = function restoreKeyPair(username, password, pubKey) {
    var iterator = makeRangeIterator(minFactorValue - 1, maxFactorValue, 1);
    var counter = iterator.next();
    while (!counter.done) {
        var result = generateKeys(username, password, counter.value);
        if (result.publicKey === pubKey) {
            console.log('value: ' + counter.value);
            return result;
        }
        counter = iterator.next();
    }
    return { error: 'Keypair matching provided public key not found' };
};

exports.createKeyPair = createKeyPair;
exports.restoreKeyPair = restoreKeyPair;
exports.generateKeys = generateKeys;
//# sourceMappingURL=index.js.map