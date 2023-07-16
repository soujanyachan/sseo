import React from 'react';
import SEOPage from "./seopage";
export const WebPage = (props) => {
    const seoData = props.seoData;
    console.log(seoData, "seodata in webpage")
    const metrics = [
        {
            name: "Metric 1",
            description: "data on metric 1",
        }]; // List of metrics

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
                {metrics.map((metric, index) => (
                    <div key={index}>
                        <h2>{metric.name}</h2>
                        <p>{metric.description}</p>
                    </div>
                ))}
                <SEOPage seoData={seoData}/>
            </div>
        </div>
    );
};
