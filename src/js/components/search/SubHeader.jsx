import React from 'react';
import {connect} from 'react-redux';
import {setSorting} from '../../actions';
import {getSortBy} from '../../selectors';

class SubHeader extends React.Component {
    render() {
        const {setSorting} = this.props;
        return (
            <div className="sub-header">
                <div>
                    <span hidden={this.props.total === 0}>{this.props.total} movies found</span>
                </div>
                <div className="filter-panel">
                    <span>Sort by</span>
                    <button onClick={() => setSorting('release_date')}
                            className={`button button-simple ${this.props.sortBy === 'release_date' ? 'active' : null}`}>
                        release date
                    </button>
                    <button onClick={() => setSorting('vote_average')}
                            className={`button button-simple ${this.props.sortBy === 'vote_average' ? 'active' : null}`}>
                        rating
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        sortBy: getSortBy(state),
        total: Object.keys(state.results || {}).length
    }),
    {
        setSorting
    }
)(SubHeader)
