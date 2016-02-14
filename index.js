"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

class ChildProcess {

    constructor() {
        this.child_process = require('child_process');
    }

    exec(command, options) {
        let child;
        let promise = new Promise((resolve, reject) => {
            child = this.child_process
                .exec(command, options, (error, stdout, stderr) => {
                    if (error !== null) return reject({error: error, message: stderr});
                    resolve({data: stdout});
                });
        });
        promise.child = child;
        return promise;
    }

    execFile(file, args, options) {
        let child;
        let promise = new Promise((resolve, reject) => {
            child = this.child_process
                .execFile(file, args, options, (error, stdout, stderr) => {
                    if (error !== null) return reject({error: error, message: stderr});
                    resolve({data: stdout});
                });
        });
        promise.child = child;
        return promise;
    }

    fork(modulePath, args, options) {
        let child;
        let promise = new Promise((resolve, reject) => {
            let stdout = '';
            let stderr = '';
            child = this.child_process
                .fork(modulePath, args, options)
                .on('close', (code, signal) => {
                    resolve({code: code, signal: signal, data: stdout});
                })
                .on('error', (error) => {
                    reject({error: error, message: stderr});
                });

            child.stdout
                .setEncoding('utf8')
                .on('data', (data) => {
                    stdout += data;
                });
            child.stderr
                .setEncoding('utf8')
                .on('data', (data) => {
                    stderr += data;
                });
        });
        promise.child = child;
        return promise;
    }

    spawn(command, args, options) {
        let child;
        let promise = new Promise((resolve, reject) => {
            let stdout = '';
            let stderr = '';
            child = this.child_process
                .spawn(command, args, options)
                .on('close', (code, signal) => {
                    resolve({code: code, signal: signal, data: stdout});
                })
                .on('error', (error) => {
                    reject({error: error, message: stderr});
                });

            child.stdout
                .setEncoding('utf8')
                .on('data', (data) => {
                    stdout += data;
                });
            child.stderr
                .setEncoding('utf8')
                .on('data', (data) => {
                    stderr += data;
                });
        });
        promise.child = child;
        return promise;
    }

    execSync(command, options) {
        options = options || {};
        options.encoding = 'utf8';
        return (new Promise((resolve, reject) => {
            try {
                resolve({data: this.child_process.execSync(command, options)});
            } catch (e) {
                reject({error: e, message: e.stderr});
            }
        }));
    }

    execFileSync(file, args, options) {
        options = options || {};
        options.encoding = 'utf8';
        return (new Promise((resolve, reject) => {
            try {
                resolve({data: this.child_process.execFileSync(file, args, options)});
            } catch (e) {
                reject({error: e, message: e.stderr});
            }
        }));
    }

    spawnSync(command, args, options) {
        options = options || {};
        options.encoding = 'utf8';
        return (new Promise((resolve, reject) => {
            let result = this.child_process.spawnSync(command, args, options);
            if (result.error !== null) return reject({error: result.error, message: result.stderr});
            resolve({code: result.status, signal: result.signal, data: result.stdout});
        }));
    }
}

module.exports = new ChildProcess();
