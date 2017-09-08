import '../css/main.scss';
import headerBackground from '../img/header-background.jpg';
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div>
                        <img src={headerBackground} alt=""/>
                    </div>
                    <div className="col-xs-10 col-xs-offset-1">
                        <h1>App Works!</h1>
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById('app'));
