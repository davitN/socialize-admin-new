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
import Companies from "./routes/Companies";
import AppUsers from "./routes/AppUsers";
import Dashboard from "./routes/Dashboard";
import WithAuth from "./components/shared/WithAuth";
import WithoutAuth from "./components/shared/WithoutAuth";

export const store = configureStore();
storeRegistry.register(store);

sagaMiddleware.run(() => rootSaga());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route
              path="/companies"
              element={
                <WithAuth>
                  <Companies />
                </WithAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <WithAuth>
                  <Dashboard />
                </WithAuth>
              }
            />
            <Route path="app-users" element={<AppUsers />} />
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
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
