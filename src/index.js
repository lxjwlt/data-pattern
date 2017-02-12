'use strict';

function dataFormat (data, format) {

    if (!format) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map((item, i) => dataFormat(item, format));
    }

    if (typeof data === 'object' && data) {

        let obj = {};

        for (let prop of Object.keys(data)) {
            obj[prop] = dataFormat(data[prop], format[prop]);
        }

        return obj;

    }

    return isEmpty(data) ? thinValue(format, data) : data;
}

function isEmpty (data) {
    return !data && data !== 0 && data !== false;
}

function thinValue (data, value) {

    if (Array.isArray(data)) {
        return [];
    }

    if (typeof data === 'object' && data) {
        return {};
    }

    if (typeof data === 'function') {
        return data(value);
    }
}

module.exports = dataFormat;
