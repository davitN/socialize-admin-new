import React from 'react';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  container: {
    height: '70px',
    backgroundColor: 'white',
  },
});
function Header() {
  const classes = useStyles();
  return (
    <div className={`flex-horizontal ${classes.container}`}>
      {/*<Link to="/companies">companies</Link> | <Link to="/app-users">app users</Link> | <Link to="/auth">log in</Link> |{" "}*/}
      {/*<Link to="/dashboard">dashboard</Link>*/}
    </div>
  );
}

export default Header;
