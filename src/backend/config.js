const YAML = require('yaml')
const fs = require('fs');
const _ = require('lodash')

const YAML_CONFIG_FILE_PATH = process.env.YAML_CONFIG_FILE_PATH || '../../config.yaml';
let config = {};

try {
    const file = fs.readFileSync(YAML_CONFIG_FILE_PATH, 'utf8')
    config = YAML.parse(file)
} catch (e) {
    console.log(e.message, 'error in reading yaml config');
}

if (!config) config = {};

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