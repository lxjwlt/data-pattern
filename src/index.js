'use strict';

function dataFormat (data, format) {

    if (!format) {
        return data;
    }

    if (Array.isArray(data) && Array.isArray(format)) {
        return data.map((item, i) => dataFormat(item, format[0]));
    }

    if (isObject(data) && isObject(format)) {

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

    return formatToData(format, data);
}

function isEmpty (data) {
    return !data && data !== 0 && data !== false;
}

function isObject (data) {
    return typeof data === 'object' && data;
}

function formatToData (format, currentData) {

    if (typeof format === 'function') {
        return format(currentData);
    }

    if (!isEmpty(currentData)) {
        return currentData;
    }

    if (Array.isArray(format)) {
        return [];
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
