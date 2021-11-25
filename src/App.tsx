import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoaderRef } from './services/loader.service';
import GlobalLoader from './components/shared/GlobalLoader';
// import { NotificationContainer } from 'react-notifications';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NotificationContainer } = require('react-notifications');

import Layout from './components/shared/Layout';
import { checkSignedInAction } from './store/ducks/authDuck';
import { RootState } from './store/configureStore';

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.mainReducer);

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
};

export default App;
