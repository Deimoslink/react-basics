import React from 'react';

export class SubHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sortBy: 'rating' };

    }

    toggleSort(mode) {
        this.setState({
            sortBy: mode
        });
        console.log('sort by', mode);
    }

    render() {
        return (
            <div className="sub-header">
                <div>
                    <span>8 movies found</span>
                </div>
                <div className="filter-panel">
                    <span>Sort by</span>
                    <button onClick={this.toggleSort.bind(this, 'date')} className={`button button-simple ${this.state.sortBy === 'date' ? 'active' : null}`}>release date</button>
                    <button onClick={this.toggleSort.bind(this, 'rating')} className={`button button-simple ${this.state.sortBy === 'rating' ? 'active' : null}`}>rating</button>
                </div>
            </div>
        );
    }
}
