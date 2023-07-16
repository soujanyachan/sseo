const _ = require("lodash");
const axios = require("axios");
const htmlParser = require("node-html-parser");
const seoModel = require("../models/seo")

const typeFunctionMap = {
    'analyse-keyword': seoModel.analyseKeyword,
    'optimise-page': seoModel.optimisePage,
    'analyse-content': seoModel.analyseContent,
    'seo-score': seoModel.seoScore,
    'serp-preview': seoModel.serpPreview,
    'check-domain-authority': seoModel.checkDomainAuthority
}

const allowedTypes = _.keys(typeFunctionMap);

const getHTMLParsedDataFromUrl = async ({url}) => {
    const resp = await axios.get(url);
    const root = htmlParser.parse(resp.data);
    return {root, plainHtml: resp.data};
}

const getTextDataFromHtml = async ({htmlRoot, plainHtml}) => {
    var { Readability } = require('@mozilla/readability');
    var { JSDOM } = require('jsdom');
    const doc = new JSDOM(plainHtml)
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    const articleSampleText = _.filter(article.textContent.split('\n\n'), (x) => x);
    console.log(article, "article")
    return {textData: articleSampleText[0], title: article.title, excerpt: article.excerpt};
}

const seoToolsController = async ({data, type}) => {
    try {
        // get html data
        const url = _.get(data, 'body.url');
        const {root, plainHtml} = await getHTMLParsedDataFromUrl({url});
        const {textData, title, excerpt} = await getTextDataFromHtml({htmlRoot: root, plainHtml});
        // based on incoming req, apply transformations
        if (type === 'all') {
            const totalRes = {};
            for (const type in typeFunctionMap) {
                const respData = await typeFunctionMap[type]({data, textData, root, url, title, excerpt});
                console.log(`type ${type}: ${JSON.stringify(respData)}`);
                totalRes[type] = respData;
            }
            return totalRes;
        } else if (allowedTypes.includes(type)) {
            const respData = await typeFunctionMap[type]({data, textData, root});
            console.log(`type ${type}: ${JSON.stringify(respData)}`);
            return respData;
        } else {
            throw new Error(`${type} is not a valid endpoint.`);
        }
    } catch (e) {
        console.log(`error in seoToolsController ${e.message} ${JSON.stringify(e.stack)} ${type} ${JSON.stringify(data)}`)
        throw new Error(`${e.message}`);
    }
}

module.exports = {
    seoToolsController
}