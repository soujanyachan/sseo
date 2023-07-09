const nlp = require('compromise');
nlp.plugin(require('compromise-speech'))
const _ = require('lodash')

const analyseKeyword = async ({data, textData, root}) => {
    // call open ai apis to get keyword.
};

const analyseContent = async ({data, textData, root}) => {
    let doc = await nlp(textData);
    const totalNumOfWords = doc.wordCount();
    let totalNumOfSyllables = 0;
    let totalNumOfChars = 0;
    let arr = doc.json().map(o => {
        const sentence = nlp(o.text);
        console.log(sentence, sentence.terms(), sentence.terms().syllables());
        const sentenceSyllableLength = _.reduce(sentence.terms().syllables(), function(sum, n) {
            const charsInSyllables = _.reduce(n, (sum, x) => sum + x.length, 0);
            totalNumOfChars += charsInSyllables;
            return sum + n.length;
        }, 0);
        totalNumOfSyllables += sentenceSyllableLength;
        return o.text;
    })
    const totalNumOfSentences = doc.length;
    const avgSentenceLength = totalNumOfWords/totalNumOfSentences;
    const avgSyllablesPerWord = totalNumOfSyllables/totalNumOfWords;
    const fleschReadability = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    const automatedReadabilityIndex = 4.71 * (totalNumOfChars/totalNumOfWords) + 0.5*(totalNumOfWords/totalNumOfSentences) -21.43;
    console.log(arr, avgSentenceLength, avgSyllablesPerWord, fleschReadability, automatedReadabilityIndex, "sentences")
};

const optimisePage = async ({data, textData, root}) => {
};

const analyseCompetitor = async ({data, textData, root}) => {
};
const analyseBacklinks = async ({data, textData, root}) => {
};
const rankKeywords = async ({data, textData, root}) => {
};
const checkDomainAuthority = async ({data, textData, root}) => {
};
const serpPreview = async ({data, textData, root}) => {
};

const seoScore = async ({data, textData, root}) => {
};

module.exports = {
    analyseKeyword,
    analyseBacklinks,
    analyseContent,
    analyseCompetitor,
    rankKeywords,
    checkDomainAuthority,
    seoScore,
    serpPreview,
    optimisePage
}