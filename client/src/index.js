import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import App from './App';
import store from './store';
import UsersDataService from './services/users-data-service';
import { UsersDataServiceProvider } from './components/users-data-service-context';

import './scss/style.scss';

const usersDataService = new UsersDataService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <UsersDataServiceProvider value={usersDataService}>
          <Router>
            <App />
          </Router>
        </UsersDataServiceProvider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
