// Import the required dependencies
import React from 'react';
import _ from 'lodash';
import SerpPreview from 'react-serp-preview';
import { Tag, Progress } from 'antd';

// Component to display SEO score
const SeoScore = ({score}) => {
    const pc = Math.floor(score*10);
    return (<div><h2>SEO Score</h2> <Progress type="circle" percent={pc} format={(percent) => `${percent}`} strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
    }} size="small" style={{marginBottom: "10px"}} /></div>)
}

// Component for SERP preview
const Serp = ({title = "", metaDescription = "", url}) => (
    <div>
        <h2>SERP Preview</h2>
        <SerpPreview title={title} metaDescription={metaDescription} url={url}/>
    </div>
)

const pickRandomColor = () => {
    const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
    return colors[_.random(0, colors.length-1)];
}

// Component to display Keywords
const Keywords = ({keywords}) => {
    return (
        <div>
            <h2>Keywords:</h2>
            {keywords.map((keyword, index) => <Tag key={index} color={`${pickRandomColor()}`}>{keyword}</Tag>)}
        </div>
    )
}

// Component to display alternate keywords
const AltKeywords = ({altKeywords}) => {
    return (
        <div>
            <h2>Alternative Keywords:</h2>
            {altKeywords.map((keyword, index) => <Tag key={index} color={`${pickRandomColor()}`}>{keyword}</Tag>)}
        </div>
    )
}

// Component to display PageSpeed
const PageSpeed = ({speed}) => (
    <div>
        <p>Loading experience <Tag color={`${speed.loadingExperience === 'FAST' ? 'green' : 'red'}`}>{speed.loadingExperience}</Tag></p>
        <p>Performance score <Tag color={`${speed.performanceScore >= 0.75 ? 'green' : 'red'}`}>{speed.performanceScore}</Tag></p>
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
    const yesGood = <Tag color={"green"}>yes</Tag>
    const yesBad = <Tag color={"red"}>yes</Tag>
    const noBad = <Tag color={"red"}>no</Tag>
    const noGood = <Tag color={"green"}>no</Tag>
    return (
        <div>
            <p>Does page have robots.txt ? {isRobotsTxt ? yesGood : noBad}  </p>
            <p>Does head of the page contain title ? {doesHeadContainTitle ? yesGood : noBad}       </p>
            <p>Does head of the page contain meta information ? {doesHeadContainMeta ? yesGood : noBad}    </p>
            <p>Is the page mobile friendly ? {isMobileFriendly ? yesGood : noBad}          </p>
            <p>Does the url contain only ASCII characters ? {isAscii ? yesGood : noBad} </p>
            <p>Does the url contain underscores? {containsUnderscores ? yesBad : noGood} </p>
        </div>
    )
}

// Component for URL structure suggestions
const BlogPost = ({blogPosts}) => {
    return (
        <div>
            <h2>Alternative Blog Text:</h2>
            {blogPosts.map((blog, index) =>
                <div key={index}><h3>{blog.title}</h3><p>{blog.text}</p></div>)}
        </div>
    )
}

// Component to display readability scores
const Readability = ({readabilityScore, type}) => <p>{type}: {readabilityScore.toFixed(2)}</p>

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
                {/*<h2>url: {url}</h2>*/}
                <SeoScore score={seoData.score}/>
                <Serp title={serpPreview.title}
                      metaDescription={serpPreview.excerpt}
                      url={url}/>
                <h2>Readability:</h2>
                <Readability readabilityScore={fleschReadability} type={"Flesch Readability"}/>
                <Readability readabilityScore={automatedReadabilityIndex} type={"Automated Readability Index"}/>
                <Keywords keywords={keywords}/>
                <AltKeywords altKeywords={alternateKeywords}/>
                <h2>Optimisations needed:</h2>
                <PageSpeed speed={pageSpeed}/>
                <PageOpts isRobotsTxt={isRobotsTxt}
                          doesHeadContainTitle={doesHeadContainTitle}
                          doesHeadContainMeta={doesHeadContainMeta}
                          isMobileFriendly={isMobileFriendly}
                          isAscii={isAscii}
                          containsUnderscores={containsUnderscores}/>
                <BlogPost blogPosts={blogPosts}/>
            </div>
        )
    } else {
        return <></>;
    }
}

export default SEOPage;