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

    it('empty data to object', () => {
        for (let value of [null, undefined]) {
            let data = dataFormat(value, {
                privacy: {},
                detail: {}
            });

            assert.deepEqual(data, {
                privacy: {},
                detail: {}
            });
        }
    });

    it('empty data to array', () => {
        for (let value of [null, undefined]) {
            let data = dataFormat(value, [{
                privacy: {},
                detail: {}
            }]);

            assert.deepEqual(data, []);
        }
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

    it('empty property in object', () => {
        let ori = {
            obj2: null
        };

        let format = {
            arr: [{}],
            obj: {
                obj: {}
            },
            obj2: {
                obj2: {}
            }
        };

        equalAndNotModify(ori, format, {
            arr: [],
            obj: {
                obj: {}
            },
            obj2: {
                obj2: {}
            }
        });
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

    it('object within array', () => {
        let ori = [{
            level: 1,
            children: [{}]
        }, {
            level: 1,
            children: null
        }, null];

        let format = [{
            children: [{
                children: [{}]
            }]
        }];

        equalAndNotModify(ori, format, [{
            level: 1,
            children: [{
                children: []
            }]
        }, {
            level: 1,
            children: []
        }, {
            children: []
        }]);
    });

    it('format is a function', () => {
        let ori = {};

        let format = (data) => {
            assert.deepEqual(ori, data);

            return {
                level: 1
            };
        };

        equalAndNotModify(ori, format, {
            level: 1
        });
    });

});

function equalAndNotModify (data, format, expect) {
    let clone = JSON.parse(JSON.stringify(data));

    let result = dataFormat(data, format);

    assert.deepEqual(result, expect);

    assert.deepEqual(data, clone);
}
