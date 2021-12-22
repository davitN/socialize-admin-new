import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/ducks/authDuck';
import { RootState } from '../../store/configureStore';
import { getInitialDataActionSG, setSelectedPlaceIdAction } from '../../store/ducks/initialDataDuck';
import { InitialDataModel, PlaceModel } from '../../types/initial-data';
import { MultiSelect } from 'primereact/multiselect';
import { AutoComplete } from 'primereact/autocomplete';
import { valuesIn } from 'lodash';

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
  const [selectedPlace, setSelectedPlace] = useState<PlaceModel>({
    _id: '',
    profile: {
      name: ''
    }
  });
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.authReducer?.userData?.role?.name);
  const { initialData } = useSelector((state: RootState) => state.initialDataReducer)

  const getInitialData = () => {
    dispatch(getInitialDataActionSG({
      success: (res: InitialDataModel) => {
        setSelectedPlace(res.places[0]);
      },
      error: () => {
        //
      }
    }));
  }

  useEffect(() => {
    if (selectedPlace._id) {
      dispatch(setSelectedPlaceIdAction(selectedPlace._id))
    }
  }, [selectedPlace]);

  const onSelectPlace = (value: PlaceModel) => {
    console.log(value)
    if (value._id) {
      setSelectedPlace(value);
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
        <AutoComplete
            dropdown={true}
            scrollHeight={'240px'}
            value={selectedPlace}
            field={'profile.name'}
            suggestions={initialData.places || []}
            // onChange={(e) => onSelectPlace(e.value)}
            onSelect={(e) => onSelectPlace(e.value)}
            placeholder="Select a Place"
            forceSelection={true}
        />
        <label className={classes.logOut} onClick={logOut}>log out</label>
        {/*<Link to="/companies">companies</Link> | <Link to="/app-users">app users</Link> | <Link to="/auth">log in</Link> |{" "}*/}
        {/*<Link to="/dashboard">dashboard</Link>*/}
      </div>
  );
};

export default Header;
