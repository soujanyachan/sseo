const axios = require('axios');
const YAML = require('yaml')
const fs = require('fs');
const _ = require('lodash')

const file = fs.readFileSync('./config.yaml', 'utf8')
const yamlConfig = YAML.parse(file)

const getKeywordsFromText = async ({textData}) => {
    let data = JSON.stringify({
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant who provides keywords present in an input text in the format of a string with a list of keywords separated by commas. Limit the size of the list to 10. The next message contains the input text."
            },
            {
                "role": "user",
                "content": textData
            }
        ]
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            Authorization: yamlConfig?.OPENAI_KEY || yamlConfig?.BACKUP_OPENAI_KEY,
        },
        data : data
    };

    try {
        const response = {data: {}}//await axios.request(config)
        console.log(JSON.stringify(response.data));
        return _.get(response, 'data.choices.0.message.content', {})
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getKeywordsFromText
}