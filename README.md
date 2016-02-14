# child-process-es6-promise

ES6 promise wrapper around child-process

### Installation

```sh
$ npm install -g child-process-es6-promise
```

### Usage

```javascript
const cp = require('child-process-es6-promise');
cp.spawn('ls', [args], {options})
    .then((result)=>{})
    .catch((error)=>{});
```

### References

* [child-process-promise] child_process promise support for older version of nodejs
* [child_process] Nodejs child_process api
* [promise] ES6 promise api

[child-process-promise]: <https://www.npmjs.com/package/child-process-promise>
[child_process]: <https://nodejs.org/api/child_process.html>
[promise]: <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise>