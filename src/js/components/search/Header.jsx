import React from 'react';

export class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            searchBy: 'title',
            searchQuery: ''
        };
    }

    toggleSearch(mode) {
        this.setState({
            searchBy: mode
        });
        console.log('search by', mode);
    }

    onTriggerSearch() {
        this.props.search(this.state.searchQuery, this.state.searchBy);
    }

    onHandleChange(e) {
        this.setState({searchQuery: e.target.value});
    }

    componentWillMount() {
        this.setState({searchBy: this.props.searchState.mode, searchQuery: this.props.searchState.query})
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
                <div className="header-row input-wrapper">
                    <input type="text" placeholder="Christopher Nolan" value={this.state.searchQuery} onChange={(e) => this.onHandleChange(e)} />
                    <i className="fa fa-level-down"></i>
                </div>
                <div className="header-row button-wrapper">
                    <div className="filter-panel">
                        <span>Search by</span>
                        <button onClick={this.toggleSearch.bind(this, 'title')}
                                className={`button button-small ${this.state.searchBy === 'title' ? 'active' : null}`}>
                            Title
                        </button>
                        <button onClick={this.toggleSearch.bind(this, 'director')}
                                className={`button button-small ${this.state.searchBy === 'director' ? 'active' : null}`}>
                            Director
                        </button>
                    </div>
                    <div>
                        <button onClick={this.onTriggerSearch.bind(this)} className="button button-big active">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    search: React.PropTypes.func,
    searchState: React.PropTypes.object
};