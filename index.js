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
                    if (error) {
                        error.stderr = stderr;
                        return reject(error);
                    }
                    resolve({stdout: stdout});
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
                    if (error) {
                        error.stderr = stderr;
                        return reject(error);
                    }
                    resolve({stdout: stdout});
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
                    resolve({code: code, signal: signal, stdout: stdout});
                })
                .on('error', (error) => {
                    error.stderr = stderr;
                    reject(error);
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
                    resolve({code: code, signal: signal, stdout: stdout});
                })
                .on('error', (error) => {
                    error.stderr = stderr;
                    reject(error);
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
                resolve({stdout: this.child_process.execSync(command, options)});
            } catch (error) {
                error.code = error.status;
                reject(error);
            }
        }));
    }

    execFileSync(file, args, options) {
        options = options || {};
        options.encoding = 'utf8';
        return (new Promise((resolve, reject) => {
            try {
                resolve({stdout: this.child_process.execFileSync(file, args, options).toString()});
            } catch (error) {
                reject(error);
            }
        }));
    }

    spawnSync(command, args, options) {
        options = options || {};
        options.encoding = 'utf8';
        return (new Promise((resolve, reject) => {
            let result = this.child_process.spawnSync(command, args, options);
            if (result.error) {
                result.error.stderr = result.stderr;
                return reject(result.error);
            }
            resolve({code: result.status, signal: result.signal, stdout: result.stdout});
        }));
    }
}

module.exports = new ChildProcess();
