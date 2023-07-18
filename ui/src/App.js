import './App.css';
import React, {useState} from "react";
import {WebPage} from "./webpage";
import axios from "axios";
import _ from 'lodash';

function App() {
    const [url, setURL] = useState("");

    const handleInputChange = (event) => {
        setURL(event.target.value);
    };

    const [seoData, setSeoData] = useState({});

    return (
            <div style={{margin: "10px"}}>
            <div className="url-input-page">
                <h1>Please enter your URL</h1>
                <input
                    type="url"
                    value={url}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                />
                <input type={"submit"} onClick={() => {
                    console.log("switch");
                    const backendUrl = `${process.env.BACKEND_URL || "http://localhost:3000"}/seo-tools/all`;
                    if (url) {
                        axios.post(backendUrl, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: {
                                url: url
                            }
                        }).then((res) => {
                            console.log(res)
                            setSeoData(res.data.data);
                        });

                    }
                }}/>
                <p>You entered: {url}</p>
            </div>
            {url && !_.isEmpty(seoData) && <WebPage seoData={seoData} url={url}/>}
        </div>
    );
}

export default App;
