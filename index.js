"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

/**
 * Create a new ChildProcess
 * @class
 * @name ChildProcess
 * @see {@link https://nodejs.org/api/child_process.html}
 */
class ChildProcess {

  constructor() {
    this.child_process = require('child_process');
    Object
      .getOwnPropertyNames(this.constructor.prototype)
      .forEach(method => this[method] = this[method].bind(this));
  }

  /**
   * @method
   * @param {string} command - The command to run, with space-separated arguments.
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {string} options.encoding - (Default: 'utf8')
   * @param {string} options.shell - Shell to execute the command with (Default: '/bin/sh' on UNIX, 'cmd.exe' on Windows, The shell should understand the -c switch on UNIX or /s /c on Windows. On Windows, command line parsing should be compatible with cmd.exe.)
   * @param {number} options.timeout - (Default: 0)
   * @param {number} options.maxBuffer - Number largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed (Default: 200*1024).
   * @param {string} options.killSignal - (Default: 'SIGTERM').
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {Promise} A Promise object.
   */
  exec(command, options) {
    let child;
    let promise = new Promise((resolve, reject) => {
      child = this.child_process
                  .exec(command, options, (error, stdout, stderr) => {
                    if (error) {
                      error.stderr = stderr;
                      return reject(error);
                    }
                    resolve({ stdout: stdout });
                  });
    });
    promise.child = child;
    return promise;
  }

  /**
   * @method
   * @param {string} file - A path to an executable file
   * @param {array} [args] - List of string arguments
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {string} options.encoding - (Default: 'utf8')
   * @param {number} options.timeout - (Default: 0)
   * @param {number} options.maxBuffer - Number largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed (Default: 200*1024).
   * @param {string} options.killSignal - (Default: 'SIGTERM').
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {Promise} A Promise object.
   */
  execFile(file, args, options) {
    let child;
    let promise = new Promise((resolve, reject) => {
      child = this.child_process
                  .execFile(file, args, options, (error, stdout, stderr) => {
                    if (error) {
                      error.stderr = stderr;
                      return reject(error);
                    }
                    resolve({ stdout: stdout });
                  });
    });
    promise.child = child;
    return promise;
  }

  /**
   * @method
   * @param {string} modulePath - The module to run in the child
   * @param {array} [args] - List of string arguments
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {string} options.execPath - Executable used to create the child process
   * @param {array} options.execArgv - List of string arguments passed to the executable (Default: process.execArgv)
   * @param {boolean} options.silent - If true, stdin, stdout, and stderr of the child will be piped to the parent, otherwise they will be inherited from the parent, see the 'pipe' and 'inherit' options for child_process.spawn()'s stdio for more details (default is false)
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {Promise} A Promise object.
   */
  fork(modulePath, args, options) {
    let child;
    let promise = new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';
      child = this.child_process
                  .fork(modulePath, args, options)
                  .on('close', (code, signal) => {
                    if (code !== 0) {
                      const error = new Error('Exited with code ' + code);
                      error.code = code;
                      error.stderr = stderr;
                      error.stdout = stdout;
                      error.signal = signal;
                      reject(error);
                    } else {
                      resolve({
                        code: code,
                        signal: signal,
                        stderr: stderr,
                        stdout: stdout
                      });
                    }
                  })
                  .on('error', (error) => {
                    error.stdout = stdout;
                    error.stderr = stderr;
                    reject(error);
                  });

      if (child.stdout) {
        child.stdout
             .setEncoding('utf8')
             .on('data', (data) => {
               stdout += data;
             });
      }
      if (child.stderr) {
        child.stderr
             .setEncoding('utf8')
             .on('data', (data) => {
               stderr += data;
             });
      }
    });
    promise.child = child;
    return promise;
  }

  /**
   * @method
   * @param {string} command - The command to run.
   * @param {array} [args] - List of string arguments
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {array|string} options.stdio - Child's stdio configuration. (See options.stdio)
   * @param {boolean} options.detached - Prepare child to run independently of its parent process. Specific behavior depends on the platform, see options.detached)
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {Promise} A Promise object.
   */
  spawn(command, args, options) {
    let child;
    let promise = new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';
      child = this.child_process
                  .spawn(command, args, options)
                  .on('close', (code, signal) => {
                    if (code !== 0) {
                      const error = new Error('Exited with code ' + code);
                      error.code = code;
                      error.stderr = stderr;
                      error.stdout = stdout;
                      error.signal = signal;
                      reject(error);
                    } else {
                      resolve({
                        code: code,
                        signal: signal,
                        stderr: stderr,
                        stdout: stdout
                      });
                    }
                  })
                  .on('error', (error) => {
                    error.stdout = stdout;
                    error.stderr = stderr;
                    reject(error);
                  });

      if (child.stdout) {
        child.stdout
             .setEncoding('utf8')
             .on('data', (data) => {
               stdout += data;
             });
      }
      if (child.stderr) {
        child.stderr
             .setEncoding('utf8')
             .on('data', (data) => {
               stderr += data;
             });
      }
    });
    promise.child = child;
    return promise;
  }

  /**
   * @method
   * @param {string} command - The command to run, with space-separated arguments.
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {array|string} options.input -  The value which will be passed as stdin to the spawned process, supplying this value will override stdio[0]
   * @param {array} options.stdio - Child's stdio configuration. (Default: 'pipe'), stderr by default will be output to the parent process' stderr unless stdio is specified
   * @param {string} options.encoding - The encoding used for all stdio inputs and outputs. (Default: 'buffer')
   * @param {string} options.shell - Shell to execute the command with (Default: '/bin/sh' on UNIX, 'cmd.exe' on Windows, The shell should understand the -c switch on UNIX or /s /c on Windows. On Windows, command line parsing should be compatible with cmd.exe.)
   * @param {number} options.timeout - In milliseconds the maximum amount of time the process is allowed to run. (Default: undefined)
   * @param {number} options.maxBuffer - Number largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed
   * @param {string} options.killSignal - The signal value to be used when the spawned process will be killed. (Default: 'SIGTERM')
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {buffer|string} The stdout from the command.
   */
  execSync(command, options) {
    return this.child_process.execSync.apply(this.child_process, arguments);
  }

  /**
   * @method
   * @param {string} file - The filename of the program to run
   * @param {array} [args] - List of string arguments
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {array|string} options.input -  The value which will be passed as stdin to the spawned process, supplying this value will override stdio[0]
   * @param {array} options.stdio - Child's stdio configuration. (Default: 'pipe'), stderr by default will be output to the parent process' stderr unless stdio is specified
   * @param {string} options.encoding - The encoding used for all stdio inputs and outputs. (Default: 'buffer')
   * @param {string} options.shell - Shell to execute the command with (Default: '/bin/sh' on UNIX, 'cmd.exe' on Windows, The shell should understand the -c switch on UNIX or /s /c on Windows. On Windows, command line parsing should be compatible with cmd.exe.)
   * @param {number} options.timeout - In milliseconds the maximum amount of time the process is allowed to run. (Default: undefined)
   * @param {number} options.maxBuffer - Number largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed
   * @param {string} options.killSignal - The signal value to be used when the spawned process will be killed. (Default: 'SIGTERM')
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {buffer|string} The stdout from the command.
   */
  execFileSync(file, args, options) {
    return this.child_process.execFileSync.apply(this.child_process, arguments);
  }

  /**
   * @method
   * @param {string} command - The command to run, with space-separated arguments.
   * @param {array} [args] - List of string arguments
   * @param {object} [options] - command options.
   * @param {string} options.cwd - Current working directory of the child process.
   * @param {object} options.env - Environment key-value pairs
   * @param {array|string} options.input -  The value which will be passed as stdin to the spawned process, supplying this value will override stdio[0]
   * @param {array} options.stdio - Child's stdio configuration. (Default: 'pipe'), stderr by default will be output to the parent process' stderr unless stdio is specified
   * @param {string} options.encoding - The encoding used for all stdio inputs and outputs. (Default: 'buffer')
   * @param {string} options.shell - Shell to execute the command with (Default: '/bin/sh' on UNIX, 'cmd.exe' on Windows, The shell should understand the -c switch on UNIX or /s /c on Windows. On Windows, command line parsing should be compatible with cmd.exe.)
   * @param {number} options.timeout - In milliseconds the maximum amount of time the process is allowed to run. (Default: undefined)
   * @param {number} options.maxBuffer - Number largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed
   * @param {string} options.killSignal - The signal value to be used when the spawned process will be killed. (Default: 'SIGTERM')
   * @param {number} options.uid - Sets the user identity of the process.
   * @param {number} options.gid - Sets the group identity of the process.
   * @return {object} The result object.
   */
  spawnSync(command, args, options) {
    return this.child_process.spawnSync.apply(this.child_process, arguments);
  }
}

module.exports = new ChildProcess();
