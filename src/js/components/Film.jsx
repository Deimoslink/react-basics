import React from 'react';
import {FilmHeader} from "./film/FilmHeader.jsx";
import {FilmSubHeader} from "./film/FilmSubHeader.jsx";
import {Results} from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";

import axios from 'axios';

export class Film extends React.Component {

    constructor() {
        super();
        this.state = {results: [], movie: {}};
    }

    triggerSearch() {
        let queryStr = this.state.movie.director;
        let queryUrl = 'https://netflixroulette.net/api/api.php?director=' + queryStr;
        axios.get(queryUrl)
            .then(res => {
                let result = [];
                if (res.data instanceof Array) {
                    result = res.data;
                } else {
                    result = [res.data];
                }
                this.setState({results: result});
            })
            .catch(err => {
                console.log(err);
                this.setState({results: []});
            });
    }

    componentWillMount() {
        console.log('component will mount', this.props.location);
        if (this.props.location.state) {
            this.setState({movie: this.props.location.state.movie}, () => {
                this.triggerSearch();
            })
        } else {
            console.log('pure loading!!!', this.props.location.search);
            let queryUrl = 'https://netflixroulette.net/api/api.php' + this.props.location.search;
            axios.get(queryUrl)
                .then(res => {
                    this.setState({movie: res.data}, () => {
                        this.triggerSearch();
                    });
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('receive new props', newProps.location.search);
        let queryUrl = 'https://netflixroulette.net/api/api.php' + newProps.location.search;
        axios.get(queryUrl)
            .then(res => {
                this.setState({movie: res.data});
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="body">
                <FilmHeader movie={this.state.movie}/>
                <FilmSubHeader director={this.state.movie.director}/>
                <Results results={this.state.results}/>
                <Footer/>
            </div>
        );
    }
}

