import React from 'react';
import Link from 'redux-first-router-link';
import {connect} from 'react-redux';
import {getMovie, getDirector} from '../../selectors';

class FilmHeader extends React.Component {
    render() {
        return (
            <div className="film-header">
                <div className="film-header-logo-wrapper">
                    <span>netflixroulette</span>
                    <Link to={{type: 'ROUTER:HOME'}} className="button button-big active search-btn">
                        Search
                    </Link>
                </div>
                <div>
                    <img className="poster" src={'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path} alt=""/>
                    <div className="movie-description">
                        <h1 className="movie-title">{this.props.movie.title}<span className="rating-badge">{this.props.movie.vote_average}</span></h1>
                        <p>Year: {this.props.movie.release_date || 'N/A'} Runtime: {this.props.movie.runtime || 'N/A'}</p>
                        <p>{this.props.movie.summary}</p>
                        <p>Director: {this.props.director && this.props.director.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        movie: getMovie(state),
        director: getDirector(state)
    })
)(FilmHeader)
