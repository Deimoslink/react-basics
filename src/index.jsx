import './css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './js/App.jsx';
import store from './js/store'

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    window.document.getElementById('app')
);
