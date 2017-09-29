import React from 'react';

export class Movie extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="movie">
                <img src={this.props.movie.poster} alt="" />
                <h2>{this.props.movie.show_title}</h2>
                <span className="year">{this.props.movie.release_year}</span>
                <span className="genre">{this.props.movie.category}</span>
            </div>
        );
    }
}

// let obj = {
//     category: "Anime",
//     director: "",
//     mediatype: 1,
//     poster: "http://netflixroulette.net/api/posters/70299043.jpg",
//     rating: "4.6",
//     release_year: "2013",
//     runtime: "24 min",
//     show_cast: "Yuki Kaji, Yui Ishikawa, Marina Inoue, Daisuke Ono, Hiro Shimono, Hiroshi Kamiya, Keiji Fujiwara, Kishô Taniyama, Romi Park, Ryota Ohsaka",
//     show_id: 70299043,
//     show_title: "Attack on Titan",
//     summary: "For over a century, people have been living behind barricades to block out the giant Titans that threaten to destroy the human race. When a Titan destroys his hometown, young Eren Yeager becomes determined to fight back.",
//     unit: 883
// };

Movie.propTypes = {
    movie: React.PropTypes.object
};