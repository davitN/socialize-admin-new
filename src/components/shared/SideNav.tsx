import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Link, useLocation } from 'react-router-dom';

const mainRoutes: Array<{name: string, route: string, active: boolean, iconName: string}> = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    active: false,
    iconName: 'bx bx-home-circle'
  },
  {
    name: 'Companies',
    route: '/companies',
    active: false,
    iconName: 'bx bx-home-circle'
  }
]
const useStyles = createUseStyles({
  container: { width: "250px", backgroundColor: "#2A3042" },
  logo: {
    height: '70px',
    color: '#FFF'
  }
});

export default function SideNav() {
  const classes = useStyles();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');

  React.useEffect(() => {
    setActiveRoute(location.pathname);
    // runs on location, i.e. route, change
    console.log('handle route change here', location)
  }, [location])
  return (
      <div className={`flex-vertical vertical-filled ${classes.container}`}>
        <div className={`flex-center ${classes.logo}`}>LOGO</div>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title text-start">Menu</li>
            {mainRoutes.map((item, index) => {
              return (
              <li key={`main_route_${index}`} className={`${item.route === activeRoute ? 'mm-active' : ''}`}>
                <Link to={item.route} className={`text-start ${item.route === activeRoute ? 'mm-active' : ''}`}>
                  <i className={item.iconName}></i>
                  <span>{item.name}</span>
                </Link>
              </li>)
            })}
          </ul>
        </div>
      </div>
  );
}
