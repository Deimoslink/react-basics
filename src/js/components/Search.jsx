import React from 'react';
import Header from "./search/Header.jsx";
import SubHeader from "./search/SubHeader.jsx";
import Results from "./search/Results.jsx";
import {Footer} from "./Footer.jsx";
import {connect} from 'react-redux';

class Search extends React.Component {
    render() {
        return (
            <div className="body">
                <Header/>
                <SubHeader/>
                <Results/>
                <Footer/>
            </div>
        );
    }
}

export default Search
