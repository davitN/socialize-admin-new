import 'react-notifications/lib/notifications.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore, { sagaMiddleware } from './store/configureStore';
import rootSaga from './store/sagas';
import storeRegistry from './store/storeRegistry';
import Login from './routes/Login';
import WithAuth from './components/shared/WithAuth';
import WithoutAuth from './components/shared/WithoutAuth';
import Dashboard from './routes/Dashboard';
import Venues from './routes/Venues';
import LatestPosts from './routes/LatestPosts';
import TopCustomers from './routes/TopCustomers';
import VenueForm from './routes/VenueForm';
import Companies from './routes/Companies';
import CompanyForm from './routes/CompanyForm';
import AppRoutes from './routes/AppRoutes';

export const store = configureStore();
storeRegistry.register(store);

sagaMiddleware.run(() => rootSaga());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
