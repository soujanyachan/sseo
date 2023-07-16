const nlp = require('compromise');
nlp.plugin(require('compromise-speech'));
const _ = require('lodash');
const {getKeywordsFromText} = require("./openai");
const {googleMobileFriendlyTest, checkIsRobotsTxt, checkUrlStructure, pageSpeedAPI} = require("./google");

const analyseKeyword = async ({textData}) => {
    // call open ai apis to get keyword.
    const resp = await getKeywordsFromText({textData});
    return resp;
};

const optimisePage = async ({root, url}) => {
    const isRobotsTxt = await checkIsRobotsTxt(url)
    const doesHeadContainTitle = root.querySelector('head').structure.includes("title");
    const doesHeadContainMeta = root.querySelector('head').structure.includes("meta");
    const {isMobileFriendly} = await googleMobileFriendlyTest(url);
    const urlStructure = await checkUrlStructure(url);
    const pageSpeed = await pageSpeedAPI(url);

    return {isRobotsTxt, doesHeadContainTitle, doesHeadContainMeta, isMobileFriendly, ...urlStructure, pageSpeed}
};

const frRange = [
    {min: 90, max: 100, text: 'Very Easy'},
    {min: 80, max: 89, text: 'Easy'},
    {min: 70, max: 79, text: 'Fairly Easy'},
    {min: 60, max: 69, text: 'Standard'},
    {min: 50, max: 59, text: 'Fairly Difficult'},
    {min: 30, max: 49, text: 'Difficult'},
    {min: 0, max: 29, text: 'Very Confusing'}]

const analyseContent = async ({textData}) => {
    let doc = await nlp(textData);
    const totalNumOfWords = doc.wordCount();
    let totalNumOfSyllables = 0;
    let totalNumOfChars = 0;
    let arr = doc.json().map(o => {
        const sentence = nlp(o.text);
        console.log(sentence, sentence.terms(), sentence.terms().syllables());
        const sentenceSyllableLength = _.reduce(sentence.terms().syllables(), function (sum, n) {
            const charsInSyllables = _.reduce(n, (sum, x) => sum + x.length, 0);
            totalNumOfChars += charsInSyllables;
            return sum + n.length;
        }, 0);
        totalNumOfSyllables += sentenceSyllableLength;
        return o.text;
    })
    const totalNumOfSentences = doc.length;
    const avgSentenceLength = totalNumOfWords / totalNumOfSentences;
    const avgSyllablesPerWord = totalNumOfSyllables / totalNumOfWords;
    const fleschReadability = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    const automatedReadabilityIndex = 4.71 * (totalNumOfChars / totalNumOfWords) + 0.5 * (totalNumOfWords / totalNumOfSentences) - 21.43;
    console.log(arr, avgSentenceLength, avgSyllablesPerWord, fleschReadability, automatedReadabilityIndex, "sentences");
    const frText = _.filter(frRange, (x) => {
        return (x.min <= fleschReadability && x.max >= fleschReadability);
    }).text
    return {fleschReadability, automatedReadabilityIndex, frText}
};

const serpPreview = async ({title, excerpt}) => {
    return {title, excerpt}
};

module.exports = {
    analyseKeyword,
    analyseContent,
    serpPreview,
    optimisePage
}