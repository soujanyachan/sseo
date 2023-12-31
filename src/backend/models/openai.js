const axios = require('axios');
const _ = require('lodash')
const baseconfig = require('../config');
const yamlConfig = baseconfig;

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        Authorization: yamlConfig?.OPENAI_KEY || yamlConfig?.BACKUP_OPENAI_KEY,
    },
};

const getKeywordsFromText = async ({textData}) => {
    let data = JSON.stringify({
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant who provides keywords present in an input text in the format of a string with a list of keywords separated by commas. The next message contains the input text. You will also provide alternate possible keywords for the text and another blog post in a similar style to the input. Please return your response in json with the fields 'keywords' which is an array of keywords, 'alternateKeywords' which is a list of alternate keywords and 'blogPosts' which is an array of 3 blog posts with format JSON object with fields 'title' and 'text' written in a similar style to the input and on a similar and related topic. The response must be a valid JSON."
            },
            {
                "role": "user",
                "content": textData
            }
        ]
    });

    config.data = data;

    try {
        const response = await axios.request(config)
        console.log(JSON.stringify(response.data));
        const data = _.get(response, 'data.choices.0.message.content', JSON.stringify({keywords: [], alternateKeywords: [], blogPosts: []}));
        const {keywords, alternateKeywords, blogPosts} = JSON.parse(data);
        return {keywords, alternateKeywords, blogPosts};
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getKeywordsFromText
}