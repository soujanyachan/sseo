// Import the required dependencies
import React from 'react';
import _ from 'lodash';
import SerpPreview from 'react-serp-preview';

// Component to display SEO score
const SeoScore = ({score}) => <h2>SEO Score: {score}</h2>

// Component for SERP preview
const Serp = ({title = "", metaDescription = "", url}) => (
    <SerpPreview title={title} metaDescription={metaDescription} url={url}/>
)

// Component to display Keywords
const Keywords = ({keywords}) => {
    return (
        <div>
            <h1>Keywords:</h1>
            {keywords.map((keyword, index) => <p key={index}>{keyword}</p>)}
        </div>
    )
}

// Component to display alternate keywords
const AltKeywords = ({altKeywords}) => {
    return (
        <div>
            <h1>Alternative Keywords:</h1>
            {altKeywords.map((keyword, index) => <p key={index}>{keyword}</p>)}
        </div>
    )
}

// Component to display PageSpeed
const PageSpeed = ({speed}) => (
    <div>
        <h1>Page Speed:</h1>
        <h2>Loading experience {speed.loadingExperience}</h2>
        <h2>Performance score {speed.performanceScore}</h2>
    </div>
);

const PageOpts = ({
                      isRobotsTxt,
                      doesHeadContainTitle,
                      doesHeadContainMeta,
                      isMobileFriendly,
                      isAscii,
                      containsUnderscores
                  }) => {
    return (
        <div>
            <p>Does page have robots.txt ? {isRobotsTxt ? 'yes' : 'no'}  </p>
            <p>Does head of the page contain title ? {doesHeadContainTitle ? 'yes' : 'no'}       </p>
            <p>Does head of the page contain meta information ? {doesHeadContainMeta ? 'yes' : 'no'}    </p>
            <p>Is the page mobile friendly ? {isMobileFriendly ? 'yes' : 'no'}          </p>
            <p>Does the url contain non-standard characters ?
                ascii {isAscii ? 'yes' : 'no'} underscores {containsUnderscores ? 'yes' : 'no'}   </p>
        </div>
    )
}

// Component for URL structure suggestions
const BlogPost = ({blogPosts}) => {
    return (
        <div>
            <h1>Alternative Blog Text:</h1>
            {blogPosts.map((blog, index) =>
                <div key={index}><h2>{blog.title}</h2><p>{blog.text}</p></div>)}
        </div>
    )
}

// Component to display readability scores
const Readability = ({readabilityScore, type}) => <h2>{type}: {readabilityScore}</h2>

// Parent Component
const SEOPage = ({url, seoData}) => {
    if (!_.isEmpty(seoData)) {
        const analyseKeywords = seoData["analyse-keyword"];
        const optimisePage = seoData["optimise-page"];
        const analyseContent = seoData["analyse-content"];
        const serpPreview = seoData["serp-preview"];
        const {keywords, blogPosts, alternateKeywords} = analyseKeywords;
        const {
            isRobotsTxt,
            doesHeadContainTitle,
            doesHeadContainMeta,
            isMobileFriendly,
            isAscii,
            containsUnderscores,
            pageSpeed
        } = optimisePage;
        const {fleschReadability, automatedReadabilityIndex} = analyseContent
        return (
            <div>
                {/*<h1>url: {url}</h1>*/}
                <SeoScore score={seoData.seoScore}/>
                <Serp title={serpPreview.title}
                      metaDescription={serpPreview.excerpt}
                      url={url}/>
                <Keywords keywords={keywords}/>
                <AltKeywords altKeywords={alternateKeywords}/>
                <PageSpeed speed={pageSpeed}/>
                <PageOpts isRobotsTxt={isRobotsTxt}
                          doesHeadContainTitle={doesHeadContainTitle}
                          doesHeadContainMeta={doesHeadContainMeta}
                          isMobileFriendly={isMobileFriendly}
                          isAscii={isAscii}
                          containsUnderscores={containsUnderscores}/>
                <BlogPost blogPosts={blogPosts}/>
                <Readability readabilityScore={fleschReadability} type={"Flesch Readability"}/>
                <Readability readabilityScore={automatedReadabilityIndex} type={"Automated Readability Index"}/>
            </div>
        )
    } else {
        return <></>;
    }
}

export default SEOPage;