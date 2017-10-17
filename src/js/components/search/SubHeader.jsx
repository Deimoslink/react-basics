import React from 'react';

export class SubHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sortBy: 'vote_average'};
    }

    toggleSort(mode) {
        this.setState({sortBy: mode}, () => {
            this.props.sort(this.state.sortBy)
        });
    }

    render() {
        return (
            <div className="sub-header">
                <div>
                    <span hidden={this.props.total === 0}>{this.props.total} movies found</span>
                </div>
                <div className="filter-panel">
                    <span>Sort by</span>
                    <button onClick={this.toggleSort.bind(this, 'release_date')}
                            className={`button button-simple ${this.state.sortBy === 'release_date' ? 'active' : null}`}>
                        release date
                    </button>
                    <button onClick={this.toggleSort.bind(this, 'vote_average')}
                            className={`button button-simple ${this.state.sortBy === 'vote_average' ? 'active' : null}`}>
                        rating
                    </button>
                </div>
            </div>
        );
    }
}

SubHeader.propTypes = {
    total: React.PropTypes.number,
    sort: React.PropTypes.func
};