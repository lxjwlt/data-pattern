# data-pattern

![Node version][node-image] [![NPM version][npm-image]][npm-url]

Format data into the specific pattern which we wanted.

## Install

```
npm install data-pattern
```

## Usage

```javascript
const dataPattern = require('data-pattern');

let data = {
    children: [null, {}],

    map: {
        level: 0
    }
};

let pattern = {
    children: [{
        info: {}
    }],
    map: {
        arr: []
    }
};

dataPattern(data, pattern);

/*
{
    children: [
        {
            info: {}
        },
        {
            info: {}
        }
    ],
    map: {
        level: 0,
        arr: []
    }
}
*/
```

[npm-url]: https://www.npmjs.com/package/data-pattern
[npm-image]: https://img.shields.io/npm/v/data-pattern.svg

[node-image]: https://img.shields.io/node/v/data-pattern.svg
