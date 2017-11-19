import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Search from "./components/Search.jsx";
import Film from "./components/Film.jsx";
import store from './store'

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

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    window.document.getElementById('app')
);
