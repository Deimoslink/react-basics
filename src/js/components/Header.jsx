import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-row header-subtitle-wrapper">
                    <span>netflixroulette</span>
                </div>
                <div className="header-row header-title-wrapper">
                    <h1>Find your movie</h1>
                </div>
                <div className="header-row input-wrapper">
                    <input type="text" placeholder="Quentin Tarantino"/>
                    <i className="fa fa-level-down" aria-hidden="true"></i>
                </div>
                <div className="header-row button-wrapper">
                    <div className="filter-panel">
                        <span>Search by</span>
                        <button className="button button-small active">Title</button>
                        <button className="button button-small">Director</button>
                    </div>
                    <div>
                        <button className="button button-big active">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}
