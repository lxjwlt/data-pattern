'use strict';

function dataFormat (data, format) {

    if (!format) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map((item, i) => dataFormat(item, format[0]));
    }

    if (typeof data === 'object' && data) {

        let obj = {};

        for (let prop of Object.keys(data)) {
            obj[prop] = dataFormat(data[prop], format[prop]);
        }

        for (let prop of Object.keys(format)) {
            if (!data.hasOwnProperty(prop)) {
                obj[prop] = dataFormat(data[prop], format[prop]);
            }
        }

        return obj;

    }

    return isEmpty(data) ? formatToData(format, data) : data;
}

function isEmpty (data) {
    return !data && data !== 0 && data !== false;
}

function formatToData (format, currentData) {

    if (Array.isArray(format)) {
        return [];
    }

    if (typeof format === 'function') {
        return format(currentData);
    }

    if (typeof format === 'object' && format) {
        let obj = {};

        for (let prop of Object.keys(format)) {
            obj[prop] = formatToData(format[prop], (currentData || {})[prop]);
        }

        return obj;
    }

    return currentData;
}

module.exports = dataFormat;
