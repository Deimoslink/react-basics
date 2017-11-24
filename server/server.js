import React from 'react';
import {renderToString} from 'react-dom/server';
// import {Provider} from 'react-redux';
// import App from '../src/js/App.jsx';
// import store from './js/store'
import express from 'express';

// const express = require('express');
const app = express();


class App extends React.Component {
    render() {
        return (
            <div>REACT COMPONENT APP</div>
        );
    }
}








app.get('/', function (req, res) {
    res.send(`
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Basics</title>
        <link rel="icon" type="image/x-icon" href="img/favicon.ico">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Saira+Condensed" rel="stylesheet">
    </head>
    <body>
    <div id="app">${ renderToString(<App />) }</div>
    </body>
    </html>
   
    `);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});