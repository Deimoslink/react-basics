import React from 'react';
import axios from 'axios';

import {Header} from "./search/Header.jsx";
import {SubHeader} from "./search/SubHeader.jsx";
import {Results} from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";

export class Search extends React.Component {

    constructor() {
        super();
        this.state = {results: [], sortBy: 'vote_average', searchState: {mode: 'title', query: ''}};
    }

    replaceSpaces(str) {
        return str.replace(/ /g, '+');
    }

    jsonToQueryString(json) {
        return '' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }

    searchOtherMoviesByDirector(queryUrl) {
        axios.get(queryUrl)
            .then(res => {
                console.log('other movies by this director', res.data.results[0].known_for);
                this.setState({results: res.data.results[0].known_for});
            })
            .catch(err => {
                console.log(err);
                this.setState({results: []});
            });
    }

    triggerSearch(q, m) {
        console.log('searching for', q, 'by', m);
        let queryObj = {[m]: q};
        let queryStr = this.jsonToQueryString(queryObj);
        let queryPlusSeparated = this.replaceSpaces(q);
        let queryUrl;
        if (m === 'director') {
            queryUrl = 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
            this.searchOtherMoviesByDirector(queryUrl);
        }
        if (m === 'title') {
            queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
            this.performSearch(queryUrl, queryStr);
        }
    }

    performSearch(queryUrl, queryStr) {
        console.log('perform search', queryUrl, queryStr);
        if (queryStr) {
            this.props.history.push('/search/' + queryStr);
        }
        axios.get(queryUrl)
            .then(res => {
                console.log(this.props.match.params.query);
                let result = res.data.results;
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
        if (this.props.match.params.query) {
            let m = this.props.match.params.query.slice(0, this.props.match.params.query.indexOf('='));
            let q = this.props.match.params.query.slice(this.props.match.params.query.indexOf('=') + 1);
            this.setState({searchState: {mode: m, query: q}});
            let queryUrl;
            let queryPlusSeparated = this.replaceSpaces(q);
            if (m === 'director') {
                queryUrl = 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
                this.searchOtherMoviesByDirector(queryUrl);
            }
            if (m === 'title') {
                queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
                this.performSearch(queryUrl, null);
            }
        } else {
            console.log('query is empty');
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('new props', newProps.location.search);
        if (newProps.location.search) {
            let queryUrl = 'https://netflixroulette.net/api/api.php' + newProps.location.search;
            this.performSearch(queryUrl, null);
        } else {
            console.log('query is empty');
        }
    }

    render() {
        return (
            <div className="body">
                <Header search={this.triggerSearch.bind(this)} searchState={this.state.searchState} />
                <SubHeader sort={this.triggerSort.bind(this)} total={this.state.results.length}/>
                <Results results={this.state.results}/>
                <Footer/>
            </div>
        );
    }
}
