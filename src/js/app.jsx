import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {Footer} from './components/Footer.jsx';
import {Header} from './components/Header.jsx';
import {SubHeader} from './components/SubHeader.jsx';
import {Results} from './components/Results.jsx';

class App extends React.Component {
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

render(<App/>, window.document.getElementById('app'));

if (PRODUCTION) {
    console.log('Production mode is on');
}