<<<<<<< HEAD
import "react-notifications/lib/notifications.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore, { sagaMiddleware } from "./store/configureStore";
import rootSaga from "./store/sagas";
import storeRegistry from "./store/storeRegistry";
import Login from "./routes/Login";
import AddVanue from './routes/AddVanue';
import WithAuth from "./components/shared/WithAuth";
import WithoutAuth from "./components/shared/WithoutAuth";
import Dashboard from './routes/Dashboard';
=======
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
import Dashboard from './routes/Dashboard';
import AddVenue from './routes/AddVenue';
import WithAuth from './components/shared/WithAuth';
import WithoutAuth from './components/shared/WithoutAuth';
>>>>>>> 02a7af8ddadb6797b6657b28f3bf501e469a68e7

export const store = configureStore();
storeRegistry.register(store);

sagaMiddleware.run(() => rootSaga());

ReactDOM.render(
<<<<<<< HEAD
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route path="/" element={<Navigate to="/auth"/>}/>
              <Route
                  path="/dashboard"
                  element={
                    <WithAuth>
                      <Dashboard/>
                    </WithAuth>
                  }
              />
              <Route
                  path="/add-vanue"
                  element={
                    <WithAuth>
                      <AddVanue/>
                    </WithAuth>
                  }
              />
              <Route path="auth" element={<Login/>}/>
              <Route
                  path="auth"
                  element={
                    <WithoutAuth>
                      <Login/>
                    </WithoutAuth>
                  }
              />
              <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
=======
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route
              path="/dashboard"
              element={
                <WithAuth>
                  <Dashboard />
                </WithAuth>
              }
            />
            <Route
              path="/add-venue"
              element={
                <WithAuth>
                  <AddVenue />
                </WithAuth>
              }
            />
            <Route
              path="auth"
              element={
                <WithoutAuth>
                  <Login />
                </WithoutAuth>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>{"There's nothing here!"}</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> 02a7af8ddadb6797b6657b28f3bf501e469a68e7
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
