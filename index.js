const express = require('express');
const app = express();

app.use(express.json({limit: '50mb'}));

app.get('/health-check', (req, res) => {
    res.send('hello world')
})

app.post('/seo-tools/analyse-keyword', (req, res) => {
    res.send('keyword-analyse')
})

app.post('/seo-tools/optimise-page', (req, res) => {
    res.send('optimise-page')
})

app.post('/seo-tools/analyse-content', (req, res) => {
    res.send('analyse-content')
})

app.post('/seo-tools/seo-score', (req, res) => {
    res.send('analyse-content')
})

app.post('/seo-tools/analyse-competitor', (req, res) => {
    res.send('analyse-competitor')
})

app.post('/seo-tools/serp-preview', (req, res) => {
    res.send('serp-preview')
})

app.post('/seo-tools/analyse-backlinks', (req, res) => {
    res.send('analyse-backlinks')
})

app.post('/seo-tools/rank-keywords', (req, res) => {
    res.send('rank-keywords')
})

app.post('/seo-tools/check-domain-authority', (req, res) => {
    res.send('check-domain-authority')
})