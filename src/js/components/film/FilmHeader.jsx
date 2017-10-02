import React from 'react';
import {Link} from "react-router-dom";

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
                    <img className="poster" src={this.props.movie.poster} alt=""/>
                    <div className="movie-description">
                        <h1 className="movie-title">{this.props.movie.show_title}<span className="rating-badge">{this.props.movie.rating}</span></h1>
                        <p>{this.props.movie.category}</p>
                        <p>Year: {this.props.movie.release_year || 'N/A'} Runtime: {this.props.movie.runtime || 'N/A'}</p>
                        <p>{this.props.movie.summary}</p>
                        <p>Director: {this.props.movie.director || 'N/A'}</p>
                        <p>Cast: {this.props.movie.show_cast || 'N/A'}</p>
                    </div>
                </div>
            </div>
        );
    }
}

FilmHeader.propTypes = {
    movie: React.PropTypes.object
};
