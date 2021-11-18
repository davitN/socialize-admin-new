// import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
// import "primereact/resources/primereact.min.css"; //core css
// import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "./App.css";
import React from "react";
import { setLoaderRef } from "./services/loader.service";
import GlobalLoader from "./components/shared/GlobalLoader";
import { NotificationContainer } from "react-notifications";
import { Link, Outlet } from "react-router-dom";
import Layout from "./components/shared/Layout";

function App() {
  return (
    <>
      <div className="App">
        <Layout />
      </div>
      <NotificationContainer />
      <GlobalLoader ref={(ref) => setLoaderRef(ref)} />
    </>
  );
}

export default App;
