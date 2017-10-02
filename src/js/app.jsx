import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Search} from "./components/Search.jsx";
import {Film} from "./components/Film.jsx";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/search/:query" component={Search} exact={false}/>
                    <Route path="/film/:title" component={Film} />
                    <Route path="*" component={Search}/>
                </Switch>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));

if (PRODUCTION) {
    console.log('Production mode is on');
}