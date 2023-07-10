const _ = require("lodash");
const axios = require("axios");
const htmlParser = require("node-html-parser");
const seoModel = require("../models/seo")

const typeFunctionMap = {
    'analyse-keyword': seoModel.analyseKeyword,
    'optimise-page': seoModel.optimisePage,
    'analyse-content': seoModel.analyseContent,
    'seo-score': seoModel.seoScore,
    'analyse-competitors': seoModel.analyseCompetitor,
    'serp-preview': seoModel.serpPreview,
    'analyse-backlinks': seoModel.analyseBacklinks,
    'rank-keywords': seoModel.rankKeywords,
    'check-domain-authority': seoModel.checkDomainAuthority
}

const allowedTypes = _.keys(typeFunctionMap);

const getHTMLParsedDataFromUrl = async ({url}) => {
    const resp = await axios.get(url);
    const root = htmlParser.parse(resp.data);
    return root;
}

const getTextDataFromHtml = async ({htmlRoot}) => {
    const dummyText =
        'The best things in an artist’s work are so much a matter of intuition, that there is much to be said for the point of view that would altogether discourage intellectual inquiry into artistic phenomena on the part of the artist. Intuitions are shy things and apt to disappear if looked into too closely. And there is undoubtedly a danger that too much knowledge and training may supplant the natural intuitive feeling of a student, leaving only a cold knowledge of the means of expression in its place. For the artist, if he has the right stuff in him ... ';
    return dummyText;
}

const seoToolsController = async ({data, type}) => {
    try {
        // get html data
        const url = _.get(data, 'url');
        const root = await getHTMLParsedDataFromUrl({url});
        const textData = await getTextDataFromHtml({root});
        // based on incoming req, apply transformations
        if (type === 'all') {

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