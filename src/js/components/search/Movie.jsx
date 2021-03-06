import React from 'react';
import Link from 'redux-first-router-link';
import {connect} from 'react-redux';

class Movie extends React.Component {
    render() {
        return (
            <div className="movie">
                <Link to={{type: 'ROUTER:FILM', payload: {id: this.props.movie.id}}} style={{textDecoration: 'none', color: 'inherit'}}>
                    <img src={'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path} alt=""/>
                    <h2>{this.props.movie.title}</h2>
                    <span className="year">{this.props.movie.release_date.slice(0,4)}</span>
                </Link>
            </div>
        );
    }
}

export default Movie
