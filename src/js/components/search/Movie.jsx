import React from 'react';

export class Movie extends React.Component {
    render() {
        return (
            <div className="movie">
                <img src="" alt=""/>
                <h2>{this.props.title}</h2>
                <span className="year"></span>
                <span className="genre"></span>
            </div>
        );
    }
}
