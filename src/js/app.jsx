import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import {Footer} from './components/Footer.jsx';
import {Header} from './components/Header.jsx';
import {SubHeader} from './components/SubHeader.jsx';
import {Results} from './components/Results.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            query: ''
        };
    }

    jsonToQueryString(json) {
    return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }


    triggerSearch(q, m) {
        console.log('searching for', q, 'by', m);
        let queryObj = {[m]: q};
        let queryStr = this.jsonToQueryString(queryObj);
        let queryUrl = 'https://netflixroulette.net/api/api.php' + queryStr;
        axios.get(queryUrl)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.status);
            });
    }

    render() {
        return (
                <Router>
                    <div className="body">
                        <Header search={this.triggerSearch.bind(this)} />
                        <SubHeader/>
                        <Switch>
                            <Route path="/movie" component={Header} />
                            <Route path="" component={Results} />
                            <Route path="*" component={Results} />
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));

if (PRODUCTION) {
    console.log('Production mode is on');
}