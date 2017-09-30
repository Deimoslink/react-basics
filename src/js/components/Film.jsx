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

    movieExample = {
        category: "Thrillers",
        director: "Christopher Nolan",
        mediatype: 0,
        poster: "http://netflixroulette.net/api/posters/60022968.jpg",
        rating: "3.3",
        runtime: "N/A",
        show_cast: "Al Pacino, Robin Williams, Hilary Swank, Oliver 'Ole' Zemen, Martin Donovan, Paul Dooley, Nicky Katt, Larry Holden, Maura Tierney, Jonathan Jackson, Jay Brazeau, Katharine Isabelle",
        show_id: 60022968,
        show_title: "Insomnia",
        summary: "Sent to investigate a teenage girl's murder in a small Alaska town, a detective accidentally shoots his partner while trying to apprehend a suspect.",
        unit: 47451
    };

    componentWillMount() {
        this.setState({movie: this.props.location.state.movie}, () => {this.triggerSearch();})
    }

    render() {
        console.log('params', this.props.location.state.movie);
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

