const _ = require("lodash");
const axios = require("axios");
const htmlParser = require("node-html-parser");
const seoModel = require("../models/seo")
const {JSDOM} = require("jsdom");

const typeFunctionMap = {
    'analyse-keyword': seoModel.analyseKeyword,
    'optimise-page': seoModel.optimisePage,
    'analyse-content': seoModel.analyseContent,
    'serp-preview': seoModel.serpPreview,
}

const allowedTypes = _.keys(typeFunctionMap);

const getHTMLParsedDataFromUrl = async ({url}) => {
    const resp = await axios.get(url);
    const plainHtml = resp.data;
    const root = htmlParser.parse(plainHtml);
    const hrefUrls = [];
    const imageUrls = [];
    const doc = new JSDOM(plainHtml);
    const links = doc.window.document.getElementsByTagName("a");
    for(let i=0, max=links.length; i<max; i++) {
        hrefUrls.push(links[i].href);
    }
    const images = doc.window.document.getElementsByTagName("img");
    for(let i=0, max=images.length; i<max; i++) {
        imageUrls.push({src: images[i].src, alt: images[i].alt});
    }
    return {root, plainHtml, hrefUrls, imageUrls};
}

const getTextDataFromHtml = async ({plainHtml}) => {
    var { Readability } = require('@mozilla/readability');
    var { JSDOM } = require('jsdom');
    const doc = new JSDOM(plainHtml)
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    const articleSampleText = _.filter(article.textContent.split('\n\n'), (x) => x);
    console.log(article, "article")
    return {textData: articleSampleText[0], title: article.title, excerpt: article.excerpt};
}

const normalize = (val, max, min) => Math.max(0, Math.min(1, val-min / max-min));

const seoScore = ({input}) => {
    let score = 0;
    const isRobotsTxt = _.get(input, '["optimise-page"].isRobotsTxt')
    const doesHeadContainTitle = _.get(input, '["optimise-page"].doesHeadContainTitle')
    const doesHeadContainMeta = _.get(input, '["optimise-page"].doesHeadContainMeta')
    const isMobileFriendly = _.get(input, '["optimise-page"].isMobileFriendly')
    const isAscii = _.get(input, '["optimise-page"].isAscii')
    const pcInternalLinks = _.get(input, '["optimise-page"].internalLinks.pcInternalLinks')
    const pcWithoutAlt = _.get(input, '["optimise-page"].altTags.pcWithoutAlt')
    const containsUnderscores = _.get(input, '["optimise-page"].containsUnderscores')
    const loadingExperience = _.get(input, '["optimise-page"].pageSpeed.loadingExperience')
    const performanceScore = _.get(input, '["optimise-page"].pageSpeed.performanceScore')
    const fleschReadability = _.get(input, '["analyse-content"].fleschReadability')
    const automatedReadabilityIndex = _.get(input, '["analyse-content"].automatedReadabilityIndex')

    if (isRobotsTxt) {
        score += 1;
    }
    console.log(score);
    if (doesHeadContainMeta) {
        score += 1
    }
    console.log(score);
    if (doesHeadContainTitle) {
        score += 1
    }
    console.log(score);
    if (isMobileFriendly) {
        score += 1
    }
    console.log(score);
    if (isAscii) {
        score += 1
    }
    console.log(score);
    if (!containsUnderscores) {
        score += 1
    }
    console.log(score);
    if (loadingExperience === 'FAST') {
        score += 1;
    }
    console.log(score);
    if (performanceScore) {
        score += performanceScore
    }
    console.log(score);
    if (fleschReadability) {
        score += normalize(fleschReadability, 1,0)
    }
    console.log(score);
    if (automatedReadabilityIndex) {
        score += normalize(automatedReadabilityIndex, 1,0)
    }
    if (pcInternalLinks) {
        score += normalize(pcInternalLinks, 1,0)
    }
    if (pcWithoutAlt) {
        score += normalize(pcWithoutAlt, 1,0)
    }
    console.log(score);
    return score*100/12;
}

const seoToolsController = async ({data, type}) => {
    try {
        // get html data
        const url = _.get(data, 'body.url');
        const {root, plainHtml, hrefUrls, imageUrls} = await getHTMLParsedDataFromUrl({url});
        const {textData, title, excerpt} = await getTextDataFromHtml({htmlRoot: root, plainHtml});
        // based on incoming req, apply transformations
        if (type === 'all') {
            const totalRes = {};
            for (const type in typeFunctionMap) {
                const respData = await typeFunctionMap[type]({data, textData, root, url, title, excerpt, hrefUrls, imageUrls});
                console.log(`type ${type}: ${JSON.stringify(respData)}`);
                totalRes[type] = respData;
            }
            const score = seoScore({input: totalRes})
            return {...totalRes, score};
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