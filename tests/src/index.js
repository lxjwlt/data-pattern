'use strict';

const assert = require('chai').assert;
const indexMod = require('../../src/index');

describe('index.js', () => {

    it('utils strictEqual', () => {

        assert.strictEqual(indexMod, indexMod);

    });

});
