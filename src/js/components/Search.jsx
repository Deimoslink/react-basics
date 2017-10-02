import React from 'react';
import axios from 'axios';

import {Header} from "./search/Header.jsx";
import {SubHeader} from "./search/SubHeader.jsx";
import {Results} from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";

export class Search extends React.Component {

    constructor() {
        super();
        this.state = {results: [], sortBy: 'rating'};
    }

    jsonToQueryString(json) {
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }

    triggerSearch(q, m) {
        console.log('searching for', q, 'by', m);
        let queryObj = {[m]: q};
        let queryStr = this.jsonToQueryString(queryObj);
        let queryUrl = 'https://netflixroulette.net/api/api.php' + queryStr;
        this.performSearch(queryUrl);
    }

    performSearch(queryUrl) {
        axios.get(queryUrl)
            .then(res => {
                this.props.history.push(queryStr);
                console.log(this.props.history);
                let result = [];
                if (res.data instanceof Array) {
                    result = res.data;
                } else {
                    result = [res.data];
                }
                this.performSort(result);
            })
            .catch(err => {
                console.log(err);
                this.setState({results: []});
            });
    }

    triggerSort(s) {
        this.setState({sortBy: s}, () => {
            this.performSort(this.state.results)
        });

    }

    performSort(result) {
        console.log('perform sorting by', this.state.sortBy);
        let arr = result.sort((a, b) => {
            if (a[this.state.sortBy] < b[this.state.sortBy]) return -1;
            if (a[this.state.sortBy] > b[this.state.sortBy]) return 1;
            return 0;
        });
        this.setState({results: arr});
    }

    componentWillMount() {
        if (this.props.location.search) {
            let queryUrl = 'https://netflixroulette.net/api/api.php' + this.props.location.search;
            this.performSearch(queryUrl);
        } else {
            console.log('query is empty');
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.location.search) {
            let queryUrl = 'https://netflixroulette.net/api/api.php' + newProps.location.search;
            this.performSearch(queryUrl);
        } else {
            console.log('query is empty');
        }
    }

    render() {
        return (
            <div className="body">
                <Header search={this.triggerSearch.bind(this)}/>
                <SubHeader sort={this.triggerSort.bind(this)} total={this.state.results.length}/>
                <Results results={this.state.results}/>
                <Footer/>
            </div>
        );
    }
}
