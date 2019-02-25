import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import './assets/css/bootstrap.css';
import './assets/css/animate.css';
import './assets/css/style.css';
import './assets/css/bootstrap-responsive.css';
import './assets/css/flexslider.css';
import './assets/css/camera.css';
import './assets/css/cslider.css';
import './assets/css/font-awesome-ie7.css';
import './assets/css/font-awesome.css';
import './assets/css/overwrite.css';
import './assets/css/prettyPhoto.css';
import './assets/css/shortcodes.css';
import './assets/css/default.css';
import './assets/css/jquery.bxslider.css';
import './assets/css/color/default.css';
import 'react-toastify/dist/ReactToastify.css';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
