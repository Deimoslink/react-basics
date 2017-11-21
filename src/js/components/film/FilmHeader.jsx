import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

export class FilmHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="film-header">
                <div className="film-header-logo-wrapper">
                    <span>netflixroulette</span>
                    <button className="button button-big active search-btn">
                        <Link to={{pathname: "/search"}} style={{textDecoration: 'none', color: 'inherit'}}>
                            Search
                        </Link>
                    </button>
                </div>
                <div>
                    <img className="poster" src={'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path} alt=""/>
                    <div className="movie-description">
                        <h1 className="movie-title">{this.props.movie.title}<span className="rating-badge">{this.props.movie.vote_average}</span></h1>
                        <p>Year: {this.props.movie.release_date || 'N/A'} Runtime: {this.props.movie.runtime || 'N/A'}</p>
                        <p>{this.props.movie.summary}</p>
                        <p>Director: {this.props.director.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        movie: state.movie,
        director: state.director
    })
)(FilmHeader)
