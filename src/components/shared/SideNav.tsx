import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useLocation } from 'react-router-dom';

const mainRoutes: Array<{ name: string; route: string; iconName: string }> = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    iconName: 'bx bx-home-circle',
  },
  {
    name: 'Venues',
    route: '/venues',
    iconName: 'bx bx-home-circle',
  },
  {
    name: 'Latest Posts',
    route: '/latest-posts',
    iconName: 'bx bx-home-circle',
  },
  {
    name: 'Top Customers',
    route: '/top-customers',
    iconName: 'bx bx-home-circle',
  }
];
const useStyles = createUseStyles({
  container: { width: '250px', backgroundColor: '#2A3042' },
  logo: {
    height: '70px',
    color: '#FFF',
  },
});

const SideNav: React.FC<{}> = () => {
  const classes = useStyles();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');

  React.useEffect(() => {
    setActiveRoute(location.pathname);
    // runs on location, i.e. route, change
    console.log('handle route change here', location);
  }, [location]);
  return (
    <div className={`flex-vertical vertical-filled ${classes.container}`}>
      <div className={`flex-center ${classes.logo}`}>LOGO</div>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title text-start">Menu</li>
          {mainRoutes.map((item, index) => {
            return (
              <li
                key={`main_route_${index}`}
                className={`${item.route === activeRoute ? 'mm-active' : ''}`}
              >
                <Link
                  to={item.route}
                  className={`text-start ${
                    item.route === activeRoute ? 'mm-active' : ''
                  }`}
                >
                  <i className={item.iconName}></i>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
