const express = require('express');
const app = express();
const _ = require('lodash')
const htmlParser = require('node-html-parser');
const axios = require('axios')
const {seoToolsController} = require("./controllers/seo-tools");

app.use(express.json({limit: '50mb'}));

app.get('/health-check', (req, res) => {
    res.send('hello world')
})

app.post('/seo-tools/:type', async (req, res) => {
    try {
        const resp = await seoToolsController({data: req.body, type: _.get(req, 'params.type', 'all')});
        return res.send({type: 'keyword-analyse', data: resp});
    } catch (e) {
        return res.send({error: e.message, stack: e.stack})
    }
})

const server = app.listen(3000);

const shutDownFn = ({signal}) => {
    console.log(`${signal} signal received: closing HTTP server`);
    server.close(() => {
        console.log(`Server closed at ${new Date().toString()}`);
    });
};

process.on('SIGTERM', () => shutDownFn({signal: 'SIGTERM'}));
process.on('SIGINT', () => shutDownFn({signal: 'SIGINT'}));
