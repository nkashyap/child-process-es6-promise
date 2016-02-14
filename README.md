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