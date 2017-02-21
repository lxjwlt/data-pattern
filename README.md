# data-pattern

![Node version][node-image] [![NPM version][npm-image]][npm-url]

Format data in the specific pattern we wanted.

## why use data-pattern?

The data we fetch from the server may not be what we expected. We need a simple way to unify the data format.

```javascript
const dataPattern = require('data-pattern');

ajax.get('/persons')
    .then((data) => {
        return dataPattern(data, []);
    });
```

## Install

```
npm install data-pattern
```

## Usage

Expect data to be array:

```javascript
dataPattern(data, []);
```

Expect data to be object:

```javascript
dataPattern(data, {});
```

Format every item of array:

```javascript
dataPattern(data, [{
    children: []
}]);
dataPattern(data, [[]]);
```

Format value of object:

```javascript
dataPattern(data, {
    info: {},
    children: []
});
```

Pattern can be a function which accepts current data as first arguments:

```javascript
dataPattern(data, (item) => {
    return item.sort((a, b) => b.item - a.item);
});
```

Format function for array items:

```javascript
dataPattern(data, [(item) => {
    return {
        level: item.level - 1
    };
}]);
```

Below is equal:

```javascript
dataPattern(data, {
    children: [{
        info: {}
    }]
});

// is equal to

dataPattern(data, {
    children: (children) => {
        if (!children) {
            return []
        }

        return children.map((item) => dataPattern(item, {
            info: {}
        }));
    }
});
```

A quick example:

```javascript
const dataPattern = require('data-pattern');

let data = {
    children: [null, {}],
    map: {
        shouldBeKeep: 0
    },
    timestamp: 1487504955 // in seconds
};

let pattern = {
    children: [{
        info: {}
    }],
    map: {
        arr: []
    },
    timestamp: (timestamp) => {
        return timestamp * 1000; // in microseconds
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
        shouldBeKeep: 0,
        arr: []
    },
    timestamp: 1487504955000
}
*/
```

[npm-url]: https://www.npmjs.com/package/data-pattern
[npm-image]: https://img.shields.io/npm/v/data-pattern.svg

[node-image]: https://img.shields.io/node/v/data-pattern.svg
