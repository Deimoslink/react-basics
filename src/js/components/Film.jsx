import React from 'react';
import FilmHeader from "./film/FilmHeader.jsx";
import FilmSubHeader from "./film/FilmSubHeader.jsx";
import Results from "./search/Results.jsx";
import Footer from "./Footer.jsx";

class Film extends React.Component {
    render() {
        return (
            <div className="body">
                <FilmHeader/>
                <FilmSubHeader/>
                <Results/>
                <Footer/>
            </div>
        );
    }
}

export default Film;
