import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/ducks/authDuck';
import { RootState } from '../../store/configureStore';
import {
  getInitialDataActionSG,
  setSelectedPlaceIdAction,
} from '../../store/ducks/initialDataDuck';
import { InitialDataModel, PlaceModel } from '../../types/initial-data';
import { getDashboardDataActionSG } from '../../store/ducks/dashboardDuck';
import { MultiSelect } from 'primereact/multiselect';
import avatar1 from '../../assets/images/users/avatar-1.jpg';

const useStyles = createUseStyles({
  container: {
    height: '70px',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  logOut: {
    fontSize: 18,
  },
});
const Header: React.FC<{}> = () => {
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = useState<Array<PlaceModel>>([]);
  const dispatch = useDispatch();
  const userRole = useSelector(
    (state: RootState) => state.authReducer?.userData?.role?.name
  );
  const { userData } = useSelector((state: RootState) => state.authReducer);
  const { initialData } = useSelector(
    (state: RootState) => state.initialDataReducer
  );
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const getInitialData = () => {
    dispatch(
      getInitialDataActionSG({
        success: (res: InitialDataModel) => {
          setSelectedPlace([res.places[0]]);
        },
        error: () => {
          //
        },
      })
    );
  };

  useEffect(() => {
    if (selectedPlace.length > 0) {
      console.log(selectedPlace);
      dispatch(setSelectedPlaceIdAction(selectedPlace[0]._id));
    }
  }, [selectedPlace]);

  const onSelectPlace = (values: PlaceModel[]) => {
    if (values.length > 1) {
      setSelectedPlace([values[values.length - 1]]);
    }
  };

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
      <Dropdown
        isOpen={showMenu}
        toggle={() => setShowMenu(!showMenu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={avatar1}
            alt="Header Avatar"
          />
          <span
            className="d-none d-md-inline-block ms-2 me-1"
            style={{ fontWeight: 600 }}
          >
            {userData.firstName} {userData.lastName}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem
            className="dropdown-item"
            onClick={() => navigate('profile')}
          >
            {' '}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            <span>Profile</span>{' '}
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem className="dropdown-item" onClick={logOut}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/*<Link to="/companies">companies</Link> | <Link to="/app-users">app users</Link> | <Link to="/auth">log in</Link> |{" "}*/}
      {/*<Link to="/dashboard">dashboard</Link>*/}
    </div>
  );
};

export default Header;
