const express = require('express');
const app = express();
const _ = require('lodash')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const {seoToolsController} = require("./controllers/seo-tools");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', "true");
    return next();
});

app.get('/health-check', (req, res) => {
    res.send('hello world')
})

app.post('/seo-tools/:type', async (req, res) => {
    try {
        const type = _.get(req, 'params.type', 'all');
        const resp = await seoToolsController({data: req.body, type});
        return res.send({type, data: resp});
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
