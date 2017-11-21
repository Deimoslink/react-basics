import React from 'react';
import {Link} from 'react-router-dom'

export class Movie extends React.Component {

    render() {
        return (
            <div className="movie">
                <Link to={{pathname: "/film/" + this.props.movie.title, state: {movie: this.props.movie}}}
                      style={{textDecoration: 'none', color: 'inherit'}}>
                    <img src={'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path} alt=""/>
                    <h2>{this.props.movie.title}</h2>
                    <span className="year">{this.props.movie.release_date.slice(0,4)}</span>
                    {/*<span className="genre">{this.props.movie.category}</span>*/}
                </Link>
            </div>
        );
    }
}
