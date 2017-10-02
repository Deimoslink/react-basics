import React from 'react';
import {Link} from 'react-router-dom'

export class Movie extends React.Component {

    render() {
        return (
            <div className="movie">
                <Link to={{pathname: "/film/" + this.props.movie.show_title, state: {movie: this.props.movie}}}
                      style={{textDecoration: 'none', color: 'inherit'}}>
                    <img src={this.props.movie.poster} alt=""/>
                    <h2>{this.props.movie.show_title}</h2>
                    <span className="year">{this.props.movie.release_year}</span>
                    <span className="genre">{this.props.movie.category}</span>
                </Link>
            </div>
        );
    }
}

Movie.propTypes = {
    movie: React.PropTypes.object
};