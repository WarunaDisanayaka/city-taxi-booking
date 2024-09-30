import React from 'react';
import ReactDOM from 'react-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import store from './store/store';
import { Provider } from 'react-redux';

import App from './App';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
