import React from 'react';
import {FilmHeader} from "./film/FilmHeader.jsx";
import {FilmSubHeader} from "./film/FilmSubHeader.jsx";
import {Results} from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";
import axios from 'axios';
import {connect} from 'react-redux';

export class Film extends React.Component {

    constructor() {
        super();
        this.state = {results: [], movie: {}, director: 'N/A', cast: []};
    }

    replaceSpaces(str) {
        return str.replace(/ /g, '+');
    }


    searchOtherMoviesByDirector(director) {
        let queryPlusSeparated = this.replaceSpaces(director);
        let queryUrl = 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
        axios.get(queryUrl)
            .then(res => {
                console.log('other movies', res.data.results[0].known_for);
                this.props.setNewResults(res.data.results[0].known_for);
                // this.props.setNewResults({results: res.data.results[0].known_for});
            })
            .catch(err => {
                console.log(err);
                this.props.setNewResults([]);
                // this.props.setNewResults({results: []});
            });
    }

    triggerSearch() {
        let id = this.state.movie.id;
        let query = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=f3444ae7a15965784cb64735f4647f14&append_to_response=credits';
        axios.get(query)
            .then(res => {
                let director;
                res.data.credits.crew.forEach(person => {
                    if (person.job === 'Director') {
                        director = person.name;
                    }
                });
                this.setState({director: director, cast: res.data.credits.cast});
                this.searchOtherMoviesByDirector(director);
            })
            .catch(err => {
                console.log(err);
                this.props.setNewResults([]);
                // this.props.setNewResults({results: []});
            });
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({movie: this.props.location.state.movie}, () => {
                this.triggerSearch();
            })
        } else {
            console.log('pure loading!!!', this.props.location.search);
            let queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + this.props.match.params.title;
            axios.get(queryUrl)
                .then(res => {
                    this.setState({movie: res.data.results[0]}, () => {
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
        let queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + newProps.match.params.title;
        axios.get(queryUrl)
            .then(res => {
                this.setState({movie: res.data.results[0]});
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="body">
                <FilmHeader movie={this.state.movie} director={this.state.director} cast={this.state.cast}/>
                <FilmSubHeader director={this.state.director}/>
                <Results/>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    state => ({
        results: state.results
    }),
    dispatch => ({
        setNewResults: (results) => {
            dispatch({
                type: 'SET_RESULTS',
                payload: results
            })
        }
    })
)(Film)

