import React from 'react';
import axios from 'axios';

import {Header} from "./search/Header.jsx";
import {SubHeader} from "./search/SubHeader.jsx";
import {Results} from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";

export class Search extends React.Component {

    constructor() {
        super();
        this.state = { results: [] };

    }
    // results = [];

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
                if (res.data instanceof Array) {
                    this.setState({results: res.data});
                } else {
                    this.setState({results: [res.data]});
                }
            })
            .catch(err => {
                this.setState({results: []});
            });
    }

    render() {
        return (
        <div className="body">
            <Header search={this.triggerSearch.bind(this)} />
            <SubHeader/>
            <Results results={this.state.results} />
            <Footer/>
        </div>
        );
    }
}
