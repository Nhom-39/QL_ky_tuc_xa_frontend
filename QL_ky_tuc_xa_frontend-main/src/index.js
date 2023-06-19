import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import GlobalStyles from '~/components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <React.StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
