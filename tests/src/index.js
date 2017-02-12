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

        let data = dataFormat(ori);

        assert.deepEqual(data, ori);
    });

    it('object format', () => {

        let data = dataFormat({
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: null
        }, {
            privacy: {},
            detail: {}
        });

        assert.deepEqual(data, {
            name: null,
            age: 12,
            privacy: {
                location: 'china',
                occupation: 'front-end'
            },
            detail: {}
        });

    });

});
