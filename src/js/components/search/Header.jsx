import React from 'react';
import {connect} from 'react-redux';
import {setNewSearchQuery, setNewSearchState, performSearch} from '../../actions'

class Header extends React.Component {
    render() {
        const {searchState, searchQuery, setNewSearchQuery, setNewSearchState, performSearch} = this.props;
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
                        <button onClick={() => {
                            performSearch(this.props.searchState, this.props.searchQuery)
                        }} className="button button-big active">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        searchState: state.searchState,
        searchQuery: state.searchQuery
    }),
    {
        setNewSearchState,
        setNewSearchQuery,
        performSearch
    }
)(Header)
