import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import {Search} from "./components/Search.jsx";
import {Film} from "./components/Film.jsx";

class App extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         query: ''
    //     };
    // }
    //
    // jsonToQueryString(json) {
    // return '?' +
    //     Object.keys(json).map(function(key) {
    //         return encodeURIComponent(key) + '=' +
    //             encodeURIComponent(json[key]);
    //     }).join('&');
    // }
    //
    //
    // triggerSearch(q, m) {
    //     console.log('searching for', q, 'by', m);
    //     let queryObj = {[m]: q};
    //     let queryStr = this.jsonToQueryString(queryObj);
    //     let queryUrl = 'https://netflixroulette.net/api/api.php' + queryStr;
    //     axios.get(queryUrl)
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err.response.status);
    //         });
    // }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Search} exact/>
                    <Route path="/film" component={Film}/>
                    <Route path="*" component={Search}/>
                </Switch>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));

if (PRODUCTION) {
    console.log('Production mode is on');
}