"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

const cp = require('./');
const assert = require('assert');
require('mocha');

const shell = {shell: true};

describe('child-process-es6-promise', () => {

    describe('exec()', () => {
        it('should execute command with correct arguments', () => {
            return cp.exec('echo test', shell)
                .then((result)=> {
                    assert(result.stdout.match(/^test[\r\n]+$/));
                })
        });
        it('should fail to execute command ', () => {
            return cp.exec('eco test')
                .catch((error) => {
                    assert.equal(error.killed, false);
                    assert.equal(error.signal, null);
                    assert.equal(error.code, 127);
                    assert.equal(error.cmd, 'eco test');
                    assert.equal(error.stderr, '/bin/sh: eco: command not found\n');
                });
        });
    });

    describe('execFile()', () => {
        it('should execute command with correct arguments', () => {
            return cp.execFile('echo', ['test'], shell)
                .then((result)=> {
                    assert(result.stdout.match(/^test[\r\n]+$/));
                });
        });
        it('should fail to execute command ', () => {
            return cp.execFile('eco', ['test'])
                .catch((error) => {
                    assert.equal(error.code, 'ENOENT');
                    assert.equal(error.errno, 'ENOENT');
                    assert.equal(error.syscall, 'spawn eco');
                    assert.equal(error.path, 'eco');
                    assert.equal(error.cmd, 'eco test');
                    assert.equal(error.stderr, '');
                });
        });
    });

    describe('spawn()', () => {
        it('should execute command with correct arguments', () => {
            return cp.spawn('echo', ['test'], shell)
                .then((result)=> {
                    assert.equal(result.code, 0);
                    assert.equal(result.signal, null);
                    assert(result.stdout.match(/^test[\r\n]+$/));
                });
        });
        it('should fail to execute command ', () => {
            return cp.spawn('eco', ['test'])
                .catch((error) => {
                    assert.equal(error.code, 'ENOENT');
                    assert.equal(error.errno, 'ENOENT');
                    assert.equal(error.syscall, 'spawn eco');
                    assert.equal(error.path, 'eco');
                    assert.equal(error.stderr, '');
                });
        });
        it('should not throw when {stdio: inherit}', () => {
            return cp.spawn('echo', ['test'], {stdio: 'inherit', shell: true})
        });
    });

    describe('const {spawn} = cp', () => {
        it('should work without parent instance', () => {
            const {spawn} = cp;
            return spawn('echo test', shell);
        });
    });
});