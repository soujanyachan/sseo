import React from 'react';
import SEOPage from "./seopage";
export const WebPage = (props) => {
    const seoData = props.seoData;
    console.log(seoData, "seodata in webpage")
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            height: "100vh"
        }}>
            <iframe
                title={"Webpage preview"}
                src={props.url || "https://www.yahoo.com"}
                style={{
                    flex: "0 0 50%",
                    height: "100vh"
                }}
            />

            <div style={{
                flex: "0 0 50%",
                height: "100vh",
                overflowY: "auto",
                marginLeft: "10px"
            }}>
                <SEOPage seoData={seoData} url={props.url}/>
            </div>
        </div>
    );
};
