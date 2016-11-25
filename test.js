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
                    // assert.equal(error.code, 127);
                    assert.equal(error.signal, null);
                    // assert.equal(error.cmd, '/bin/sh -c eco test');
                    // assert.equal(error.stderr, '/bin/sh: 1: eco: not found\n');
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

    //describe('execSync()', () => {
    //    it('should execute command with correct arguments', (done) => {
    //        cp.execSync('echo test')
    //            .then((result)=> {
    //                assert.equal(result.stdout, 'test\n');
    //                done();
    //    });
    //    });
    //    it('should fail to execute command ', (done) => {
    //        cp.execSync('eco test')
    //            .catch((error) => {
    //        assert.equal(error.code, 127);
    //        assert.equal(error.signal, null);
    //        assert.equal(error.cmd, 'eco test');
    //        assert.equal(error.stderr, '/bin/sh: 1: eco: not found\n');
    //                done();
    //            });
    //    });
    //});
    //
    //describe('execFileSync()', () => {
    //    it('should execute command with correct arguments', (done) => {
    //        cp.execFileSync('echo', ['test'])
    //            .then((result)=> {
    //                assert.equal(result.stdout, 'test\n');
    //                done();
    //            });
    //    });
    //    it('should fail to execute command ', (done) => {
    //        cp.execFileSync('eco', ['test'])
    //            .catch((error) => {
    //                assert.equal(error.toString(), 'TypeError: invalid data');
    //                done();
    //            });
    //    });
    //});
    //
    //describe('spawnSync()', () => {
    //    it('should execute command with correct arguments', (done) => {
    //        cp.spawnSync('echo', ['test'])
    //            .then((result)=> {
    //                assert.equal(result.code, 0);
    //                assert.equal(result.signal, null);
    //                assert.equal(result.stdout, 'test\n');
    //                done();
    //            });
    //    });
    //    it('should fail to execute command ', (done) => {
    //        cp.spawnSync('eco', ['test'])
    //            .catch((error) => {
    //                assert.equal(error.code, 'ENOENT');
    //                assert.equal(error.errno, 'ENOENT');
    //                assert.equal(error.syscall, 'spawnSync eco');
    //                assert.equal(error.path, 'eco');
    //                assert.equal(error.stderr, null);
    //                done();
    //            });
    //    });
    //});

});