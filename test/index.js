"use strict";
require("babel-polyfill");
import * as assert from 'assert';
import {createKeyPair, restoreKeyPair} from '../index';

const testCredentials = [
  { username: 'example-username', password: 'example-password1!', description: '1 - should return expected public/private keypair' },
  { username: 'example-username2', password: 'example-password2!', description: '2 - should return expected public/private keypair' },
  { username: 'example-username3', password: 'example-password3!', description: '3 - should return expected public/private keypair' },
  { username: 'example-username4', password: 'example-password4!', description: '4 - should return expected public/private keypair' },
  { username: 'example-username5', password: 'example-password5!', description: '5 - should return expected public/private keypair' },
];

describe('Test that restored keypair matches created keypair', () => {
  testCredentials.forEach((credentials) => {
    it(credentials.description, async () => {

      const createAndRestoreKeyPairs = new Promise( (resolve) => {
        let keyPair = createKeyPair(credentials.username, credentials.password);
        let restoredPair = restoreKeyPair(credentials.username, credentials.password, keyPair.publicKey);
        resolve({ keyPair: keyPair, restoredPair: restoredPair });
      });

      const result = await createAndRestoreKeyPairs;
      assert.equal(result.keyPair.publicKey, result.restoredPair.publicKey);
      assert.equal(result.keyPair.privateKey, result.restoredPair.privateKey);

    });
  });
});
