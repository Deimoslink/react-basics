import React from 'react';
import {connect} from 'react-redux';

export class SubHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    toggleSort(mode) {
        this.props.setSorting(mode);
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
                            className={`button button-simple ${this.props.sortBy === 'release_date' ? 'active' : null}`}>
                        release date
                    </button>
                    <button onClick={this.toggleSort.bind(this, 'vote_average')}
                            className={`button button-simple ${this.props.sortBy === 'vote_average' ? 'active' : null}`}>
                        rating
                    </button>
                </div>
            </div>
        );
    }
}

SubHeader.propTypes = {

};

export default connect(
    state => ({
        sortBy: state.sortBy,
        total: state.results.length
    }),
    dispatch => ({
        setSorting: (sorting) => {
            dispatch({
                type: 'SET_SORTING',
                payload: sorting
            })
        }
    })
)(SubHeader)