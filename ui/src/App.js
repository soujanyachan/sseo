// import SerpPreview from 'react-serp-preview';
import './App.css';
import React, {useEffect, useState, createContext} from "react";
import {WebPage} from "./webpage";
import {Redirect} from 'react-router-dom';
import {seoDataContext} from "./context";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function App() {
    let navigate = useNavigate();
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
                    const backendUrl = "http://localhost:3000/seo-tools/all";
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
            <WebPage seoData={seoData} url={url}/>
        </div>
    );
}

export default App;
