import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseProvider } from './components/Firebase';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <FirebaseProvider>
        <Router>
        <App/> 
        </Router>
    </FirebaseProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
