import React from 'react';
import axios from 'axios';
import Header from "./search/Header.jsx";
import SubHeader from "./search/SubHeader.jsx";
import Results from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";
import {connect} from 'react-redux';

export class Search extends React.Component {

    constructor() {
        super();
        // this.state = {results: [], sortBy: 'vote_average', searchState: {mode: 'title', query: ''}};
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

    searchOtherMoviesByDirector(queryUrl, queryStr) {
        if (queryStr) {
            this.props.history.push('/search/' + queryStr);
        }
        axios.get(queryUrl)
            .then(res => {
                console.log('other movies by this director', res.data.results[0].known_for);
                this.props.setNewResults(res.data.results[0].known_for);
                // this.props.setNewResults({results: res.data.results[0].known_for});
            })
            .catch(err => {
                console.log(err);
                this.props.setNewResults([]);
                // this.props.setNewResults({results: []});
            });
    }

    triggerSearch(q, m) {
        let queryObj = {[m]: q};
        let queryStr = this.jsonToQueryString(queryObj);
        let queryPlusSeparated = this.replaceSpaces(q);
        let queryUrl;
        if (m === 'director') {
            queryUrl = 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
            this.searchOtherMoviesByDirector(queryUrl, queryStr);
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
                this.props.setNewResults([]);
                // this.props.setNewResults({results: []});
            });
    }

    triggerSort(mode) {
        console.log('trigger sort', mode);
        this.performSort(this.props.results);
    }

    performSort(result) {
        let arr = result.sort((a, b) => {
            if (a[this.props.sortBy] < b[this.props.sortBy]) return -1;
            if (a[this.props.sortBy] > b[this.props.sortBy]) return 1;
            return 0;
        });
        this.props.setNewResults(arr);
        // this.props.setNewResults({results: arr});
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
                this.searchOtherMoviesByDirector(queryUrl, null);
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
        console.log('search new props', newProps);
        // this.performSort(this.props.results);
        // if (newProps.location.search) {
        //     let queryUrl = 'https://netflixroulette.net/api/api.php' + newProps.location.search;
        //     this.performSearch(queryUrl, null);
        // } else {
        //     console.log('query is empty');
        // }
    }

    render() {
        return (
            <div className="body">
                <Header search={this.triggerSearch.bind(this)}/>
                <SubHeader sort={this.triggerSort.bind(this)}/>
                <Results/>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    state => ({
        results: state.results,
        sortBy: state.sortBy
    }),
    dispatch => ({
        setNewResults: (results) => {
            dispatch({
                type: 'SET_RESULTS',
                payload: results
            })
        }
    })
)(Search)