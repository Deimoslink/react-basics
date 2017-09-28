import React from 'react';
import {FilmHeader} from "./film/FilmHeader.jsx";
import {FilmSubHeader} from "./film/FilmSubHeader.jsx";
import {FilmResults} from "./film/FilmResults.jsx";
import {Footer} from "./Footer.jsx";

export class Film extends React.Component {
    render() {
        return (
            <div className="body">
                <FilmHeader />
                <FilmSubHeader/>
                <FilmResults/>
                <Footer/>
            </div>
        );
    }
}
