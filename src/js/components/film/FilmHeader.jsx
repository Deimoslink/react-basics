import React from 'react';

export class FilmHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBy: 'title',
            searchQuery: ''
        };
    }

    render() {
        return (
            <div className="header">
                <div className="header-row header-subtitle-wrapper">
                    <span>netflixroulette</span>
                </div>
                <div className="header-row header-title-wrapper">
                    <h1>Find your movie</h1>
                </div>
            </div>
        );
    }
}
