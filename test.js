"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

const cp = require('./');
const assert = require('assert');
require('mocha');

describe('child-process-es6-promise', () => {

    describe('spawn()', () => {
        it('should execute spawn command with correct arguments', (done) => {
            cp.spawn('ls')
                .then((result)=> {
                    console.log(result);
                    done();
                })
                .catch((error) => {
                    console.log(error);
                    done();
                });
        });
    });
});