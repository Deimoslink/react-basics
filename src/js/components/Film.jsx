import React from 'react';
import FilmHeader from "./film/FilmHeader.jsx";
import FilmSubHeader from "./film/FilmSubHeader.jsx";
import {Results} from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";
import {connect} from 'react-redux';
import {performSearchByDirector, performSearchForAMovie} from '../actions'

export class Film extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        const {performSearchForAMovie} = this.props;
        performSearchForAMovie(this.props.location.search, this.props.match.params.title);
    }


    render() {
        return (
            <div className="body">
                <FilmHeader/>
                <FilmSubHeader/>
                <Results/>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    state => ({
        results: state.results,
        movie: state.movie
    }),
    {
        performSearchByDirector,
        performSearchForAMovie
    }
)(Film)
