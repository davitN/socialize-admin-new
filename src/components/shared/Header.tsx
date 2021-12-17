import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/ducks/authDuck';
import { RootState } from '../../store/configureStore';
import { getInitialDataActionSG, setSelectedPlaceIdAction } from '../../store/ducks/initialDataDuck';
import { InitialDataModel, PlaceModel } from '../../types/initial-data';
import { getDashboardDataActionSG } from '../../store/ducks/dashboardDuck';
import { MultiSelect } from 'primereact/multiselect';

const useStyles = createUseStyles({
  container: {
    height: '70px',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: '0 20px'
  },
  logOut: {
    fontSize: 18,
  },
});
const Header: React.FC<{}> = () => {
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = useState<Array<PlaceModel>>([]);
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.authReducer?.userData?.role?.name);
  const { initialData } = useSelector((state: RootState) => state.initialDataReducer)

  const getInitialData = () => {
    dispatch(getInitialDataActionSG({
      success: (res: InitialDataModel) => {
        setSelectedPlace([res.places[0]]);
      },
      error: () => {
        //
      }
    }));
  }

  useEffect(() => {
    if (selectedPlace.length > 0) {
      dispatch(setSelectedPlaceIdAction(selectedPlace[0]._id))
    }
  }, [selectedPlace]);

  const onSelectPlace = (values: PlaceModel[]) => {
    if (values.length > 1) {
      setSelectedPlace([values[values.length - 1]]);
    }
  }

  useEffect(() => {
    console.log('user role is - ', userRole);
    if (userRole) {
      getInitialData();
    }
  }, [userRole]);

  const logOut = () => {
    dispatch(logoutAction());
  };

  return (
      <div className={`flex-horizontal ${classes.container}`}>
        <MultiSelect
            scrollHeight={'240px'}
            showSelectAll={false}
            value={selectedPlace}
            optionLabel={'profile.name'}
            options={initialData.places || []}
            onChange={(e) => onSelectPlace(e.value)}
            placeholder="Select a Place"
            filter={true}
        />
        <label className={classes.logOut} onClick={logOut}>log out</label>
        {/*<Link to="/companies">companies</Link> | <Link to="/app-users">app users</Link> | <Link to="/auth">log in</Link> |{" "}*/}
        {/*<Link to="/dashboard">dashboard</Link>*/}
      </div>
  );
};

export default Header;
