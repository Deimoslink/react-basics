import configureStore from './server-store';
import App from '../src/js/App.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import ReactDOMServer from 'react-dom/server';

export default async function serverRender(req, res) {
    const store = await configureStore(req);

    const appString = ReactDOMServer.renderToString(<Provider store={store}><App/></Provider>);
    const stateJson = JSON.stringify(store.getState());

    return res.send(
        `<!DOCTYPE HTML>
         <html>
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1">
                 <title>React Basics</title>
                 <base href="/">
                 <link rel="icon" type="image/x-icon" href="img/favicon.ico">
                 <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
                 <link href="https://fonts.googleapis.com/css?family=Saira+Condensed" rel="stylesheet">
                 <link href="./main.css" rel="stylesheet">
             </head>
             <body>
                  <div id="app">${appString}</div>
                  <script>window.REDUX_STATE = ${stateJson}</script>
                  <script src="./bundle.js"></script>
             </body>
         </html>`
    )
}