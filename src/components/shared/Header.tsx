import React from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/ducks/authDuck';
const useStyles = createUseStyles({
  container: {
    height: '70px',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logOut: {
    alignSelf: 'flex-end',
    marginRight: 20,
    fontSize: 18,
  },
});
const Header: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutAction());
  };

  return (
    <div className={`flex-vertical ${classes.container}`}>
      <label className={classes.logOut} onClick={logOut}>log out</label>
      {/*<Link to="/companies">companies</Link> | <Link to="/app-users">app users</Link> | <Link to="/auth">log in</Link> |{" "}*/}
      {/*<Link to="/dashboard">dashboard</Link>*/}
    </div>
  );
};

export default Header;
