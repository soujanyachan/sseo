const axios = require("axios");
const _ = require("lodash");

const baseconfig = require('../config');
const yamlConfig = baseconfig;

const googleMobileFriendlyTest = async (url) => {
    let data = JSON.stringify({
        "url": url,
        "requestScreenshot": true
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://content-searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?alt=json&key=${yamlConfig.GOOGLE_API_KEY}`,
        headers: {
            'X-ClientDetails': 'appVersion=5.0%20(Macintosh)&platform=MacIntel&userAgent=Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010.15%3B%20rv%3A109.0)%20Gecko%2F20100101%20Firefox%2F115.0',
            'X-Requested-With': 'XMLHttpRequest',
            'X-JavaScript-User-Agent': 'apix/3.0.0 google-api-javascript-client/1.1.0',
            'Content-Type': 'application/json',
            'X-Origin': 'https://explorer.apis.google.com',
            'X-Referer': 'https://explorer.apis.google.com',
            'X-Goog-Encode-Response-If-Executable': 'base64',
            'Origin': 'https://content-searchconsole.googleapis.com',
            'Alt-Used': 'content-searchconsole.googleapis.com',
            'Connection': 'keep-alive',
            'Referer': 'https://content-searchconsole.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.5o5-TAFr18s.O%2Fd%3D1%2Frs%3DAHpOoo_qgszOsFrBH7bZ1Rmfwa9Mc03wLQ%2Fm%3D__features__'
        },
        data : data
    };

    let response;
    try {
        response = await axios.request(config)
        console.log(JSON.stringify(_.get(response, 'data.mobileFriendliness')));
    } catch (e) {
        console.log(e, "e.message")
    }
    return {
        isMobileFriendly: _.get(response, 'data.mobileFriendliness') === 'MOBILE_FRIENDLY'
    }
}

const checkIsRobotsTxt = async (url) => {
    const URLObj = new URL(url);
    console.log(URLObj, "URLObj");
    const baseUrl = URLObj.host;
    let isRobotsTxt = false;
    try {
        const resp = await axios.post(`https://${baseUrl}/robots.txt`);
        if (resp.status.toString().startsWith('2')) {
            isRobotsTxt = true;
        }
    } catch (e) {

    }
    return isRobotsTxt;
}

const isASCII = async (str) => {
    return /^[\x00-\x7F]*$/.test(str);
}

// URL structure - https://developers.google.com/search/docs/crawling-indexing/url-structure
// Simple, Localized, no Unreadable, long ID, Country-specific domain, Words joined together
// image tags, https://developers.google.com/search/docs/appearance/google-images
// internal linking

const checkUrlStructure = async (url) => {
    const isAscii = await isASCII(url);
    const containsUnderscores = url.includes('_')
    return {isAscii, containsUnderscores}
}

const pageSpeedAPI = async (url) => {
    const axios = require('axios');

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${yamlConfig.GOOGLE_API_KEY}`,
        headers: { }
    };

    let loadingExperience = 'FAST';
    let performanceScore = 0.98

    try {
        const response = await axios.request(config)
        console.log(JSON.stringify(response.data));
        loadingExperience = _.get(response, 'data.loadingExperience.overall_category', 'FAST')
        performanceScore = _.get(response, 'data.lighthouseResult.categories.performance.score', 0.98)
    } catch (e) {
        console.log(e.message)
    }
    return {loadingExperience, performanceScore}
}

module.exports = {
    googleMobileFriendlyTest,
    checkIsRobotsTxt,
    checkUrlStructure,
    pageSpeedAPI
}