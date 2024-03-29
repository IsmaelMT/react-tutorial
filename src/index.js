import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-modal"
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


Modal.setAppElement("#root");

const AppWrapper = () => (
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>
)


ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
