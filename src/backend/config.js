const _ = require('lodash')

let config = {};

try {
    _.map(process.env, (value, key) => {
        if (key && key.startsWith('CONFIG__')) {
            const splitKey = key.split('__')
            config[splitKey[1]] = value;
        }
    });
} catch (e) {
    console.error(`[CONFIG] Failed to read config variables from environment: ${e.message}`);
}

module.exports = config;