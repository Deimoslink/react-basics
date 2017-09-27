import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Footer} from './components/Footer.jsx';
import {Header} from './components/Header.jsx';
import {SubHeader} from './components/SubHeader.jsx';
import {Results} from './components/Results.jsx';

class App extends React.Component {
    render() {
        return (
                <Router>
                    <div className="body">
                        <Header/>
                        <SubHeader/>
                        <Switch>
                            <Route path="/movie" component={Header} />
                            <Route path="" component={Results} />
                            <Route path="*" component={Results} />
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));

if (PRODUCTION) {
    console.log('Production mode is on');
}