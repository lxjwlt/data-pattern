'use strict';

const assert = require('chai').assert;
const dataFormat = require('../../src/index');

describe('index.js', () => {

    it('empty format', () => {
        let ori = {
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: null
        };

        equalAndNotModify(ori, undefined, {
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: null
        });
    });

    it('null data in object format', () => {
        let data = dataFormat(null, {
            privacy: {},
            detail: {}
        });

        assert.deepEqual(data, {
            privacy: {},
            detail: {}
        });
    });

    it('null data in array format', () => {
        let data = dataFormat(null, [{
            privacy: {},
            detail: {}
        }]);

        assert.deepEqual(data, []);
    });

    it('object format', () => {

        let ori = {
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: null
        };

        let format = {
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: {}
        };

        equalAndNotModify(ori, format, {
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: {}
        });

    });

    it('array format', () => {
        let ori = [{
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: null
        }];

        let format = [{
            privacy: {},
            detail: {}
        }];

        equalAndNotModify(ori, format, [{
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: {}
        }]);
    });

    it('empty item in array', () => {
        let ori = [null, {
            detail: null
        }];

        let format = [{
            detail: {}
        }];

        equalAndNotModify(ori, format, [{
            detail: {}
        }, {
            detail: {}
        }]);
    });

    it('array in array', () => {
        let ori = [[], null, [[]]];

        let format = [[[]]];

        equalAndNotModify(ori, format, [[], [], [[]]]);
    });

    it('object in object', () => {
        let ori = {
            level: 1,
            children: {
                level: 2,
                children: null
            }
        };

        let format = {
            children: {
                children: {
                    children: {
                        children: {}
                    }
                }
            }
        };

        equalAndNotModify(ori, format, {
            level: 1,
            children: {
                level: 2,
                children: {
                    children: {
                        children: {}
                    }
                }
            }
        });
    });

});

function equalAndNotModify (data, format, expect) {
    let clone = JSON.parse(JSON.stringify(data));

    let result = dataFormat(data, format);

    assert.deepEqual(result, expect);

    assert.deepEqual(data, clone);
}
