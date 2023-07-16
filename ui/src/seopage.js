// Import the required dependencies
import React from 'react';
import _ from 'lodash';

// Component to display SEO score
const SeoScore = ({score}) => <h2>SEO Score: {score}</h2>

// Component for SERP preview
const SerpPreview = ({previewContent}) => <p>{previewContent}</p>

// Component to display Keywords
const Keywords = ({keywords}) => {
    return (
        <div>
            {keywords.map((keyword, index) => <p key={index}>{keyword}</p>)}
        </div>
    )
}

// Component to display alternate keywords
const AltKeywords = ({altKeywords}) => {
    return (
        <div>
            {altKeywords.map((keyword, index) => <p key={index}>{keyword}</p>)}
        </div>
    )
}

// Component to display PageSpeed
// const PageSpeed = ({speed}) => <h2>Page Speed: {speed}</h2>

// Component for URL structure suggestions
// const UrlSuggestion = ({suggestions}) => {
//     return (
//         <div>
//             {suggestions.map((suggestion, index) => <p key={index}>{suggestion}</p>)}
//         </div>
//     )
// }

// Component to display readability scores
const Readability = ({readabilityScore}) => <h2>Readability Score: {readabilityScore}</h2>

// Parent Component
const SEOPage = ({url, seoData}) => {
    if (!_.isEmpty(seoData)) {
        const analyseKeywords = seoData["analyse-keyword"];
        // const optimisePage = seoData["optimise-page"];
        const analyseContent = seoData["analyse-content"];
        const {keywords, alternateKeywords} = analyseKeywords;
        // const {
        //     isRobotsTxt,
        //     doesHeadContainTitle,
        //     doesHeadContainMeta,
        //     isMobileFriendly,
        //     isAscii,
        //     containsUnderscores
        // } = optimisePage;
        const {fleschReadability, automatedReadabilityIndex} = analyseContent
        return (
            <div>
                <h1>{url}</h1>
                <SeoScore score={seoData.seoScore}/>
                <SerpPreview previewContent={seoData.serpPreview}/>
                <Keywords keywords={keywords}/>
                <AltKeywords altKeywords={alternateKeywords}/>
                {/*<PageSpeed speed={seoData.pageSpeed}/>*/}
                {/*<UrlSuggestion suggestions={seoData.suggestions}/>*/}
                <Readability readabilityScore={fleschReadability} type={"fleschReadability"}/>
                <Readability readabilityScore={automatedReadabilityIndex} type={"automatedReadabilityIndex"}/>
                <SerpPreview
                    title="Example Domain"
                    metaDescription={`Example Domain. This domain is established to be used for 
        illustrative examples in documents. You may use this domain in examples 
        without prior coordination or asking for permission.`}
                    url={url}
                />
            </div>
        )
    } else {
        return <></>;
    }
}

export default SEOPage;