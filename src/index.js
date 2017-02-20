'use strict';

function dataFormat (data, format, strict) {

    if (!format) {
        return data;
    }

    if (Array.isArray(data) && Array.isArray(format)) {
        return data.map((item, i) => dataFormat(item, format[0], strict));
    }

    if (isObject(data) && isObject(format)) {

        let obj = {};

        if (!strict) {
            for (let prop of Object.keys(data)) {
                obj[prop] = dataFormat(data[prop], format[prop], strict);
            }
        }

        for (let prop of Object.keys(format)) {
            if (!data.hasOwnProperty(prop) || strict) {
                obj[prop] = dataFormat(data[prop], format[prop], strict);
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

function noStrictFormat (data, format) {
    return dataFormat(data, format, false);
}

noStrictFormat.strict = function (data, format) {
    return dataFormat(data, format, true);
};

module.exports = noStrictFormat;
