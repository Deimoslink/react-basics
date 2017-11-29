import React from 'react';
import {connect} from 'react-redux';
import Link from 'redux-first-router-link';
import {setNewSearchQuery, setNewSearchState} from '../../actions';
import {getSearchQuery, getSearchState} from '../../selectors'

class Header extends React.Component {
    render() {
        const {searchState, searchQuery, setNewSearchQuery, setNewSearchState} = this.props;
        return (
            <div className="header">
                <div className="header-row header-subtitle-wrapper">
                    <span>netflixroulette</span>
                </div>
                <div className="header-row header-title-wrapper">
                    <h1>Find your movie</h1>
                </div>
                <div className="header-row input-wrapper">
                    <input type="text" placeholder="Christopher Nolan" value={searchQuery} onChange={(e) => {
                        setNewSearchQuery(e.target.value);
                    }} />
                    <i className="fa fa-level-down"></i>
                </div>
                <div className="header-row button-wrapper">
                    <div className="filter-panel">
                        <span>Search by</span>
                        <button onClick={() => {
                            setNewSearchState('title');
                        }} className={`button button-small ${searchState === 'title' ? 'active' : null}`}>
                            Title
                        </button>
                        <button onClick={() => {
                            setNewSearchState('director')
                        }} className={`button button-small ${searchState === 'director' ? 'active' : null}`}>
                            Director
                        </button>
                    </div>
                    <div>
                        <Link
                            to={{type: 'ROUTER:SEARCH', payload: {type: this.props.searchState, query: this.props.searchQuery}}}
                            className="button button-big active">
                            Search
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        searchState: getSearchState,
        searchQuery: getSearchQuery
    }),
    {
        setNewSearchState,
        setNewSearchQuery
    }
)(Header)
