import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderRef } from "./services/loader.service";
import GlobalLoader from "./components/shared/GlobalLoader";
import { NotificationContainer } from "react-notifications";
import Layout from "./components/shared/Layout";
import { checkSignedInAction } from "./store/ducks/authDuck";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.mainReducer);

  useEffect(() => {
    dispatch(checkSignedInAction());
  }, [dispatch]);

  return (
    <>
      {isLoading ? null : (
        <>
          <div className="App">
            <Layout />
          </div>
          <NotificationContainer />
          <GlobalLoader ref={(ref) => setLoaderRef(ref)} />
        </>
      )}
    </>
  );
}

export default App;
