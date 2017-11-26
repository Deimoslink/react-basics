import React from 'react';
import Search from "./components/Search.jsx";
import Film from "./components/Film.jsx";
import {connect} from 'react-redux';


class App extends React.Component {
    render() {
        return this.props.isMovieSelected
            ? <Film />
            : <Search />;
    }
}

export default connect(
    state => ({
        isMovieSelected: !!state.movie
    })
)(App);
