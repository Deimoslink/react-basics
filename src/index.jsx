import './css/main.scss';
import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import App from './js/App.jsx';
import store from './js/store';

hydrate(
    <Provider store={store}>
        <App/>
    </Provider>,
    window.document.getElementById('app')
);
