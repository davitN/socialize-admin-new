import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { RouteModel } from '../../types/route';

const logoImgPath = `${process.env.PUBLIC_URL}/logo.png`;

const mainRoutes: RouteModel[] = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    iconName: 'bx bx-home-circle',
  },
  {
    name: 'Companies',
    route: '/company',
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
    iconName: 'bx bxs-detail',
  },
  {
    name: 'Reports',
    route: '/reports',
    iconName: 'bx bxs-megaphone',
  },
  {
    name: 'Top Customers',
    route: '/top-customers',
    iconName: 'bx bxs-user-detail',
  },
  {
    name: 'Admin Management',
    route: '/admin-management',
    iconName: 'bx bx-home-circle',
  },
  {
    name: 'App Users',
    route: '/app-users',
    iconName: 'bx bx-home-circle',
  },
];
const useStyles = createUseStyles({
  container: { width: '250px', backgroundColor: '#2A3042' },
  logo: {
    height: '70px',
    color: '#FFF',
    '& img': {
      height: 50,
    },
  },
});

const SideNav: React.FC<{}> = () => {
  const userRole = useSelector(
      (state: RootState) => state.authReducer?.userData?.role?.name
  );
  const [routes, setRoutes] = useState<RouteModel[]>([]);
  const classes = useStyles();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    const activeRoutes: RouteModel[] = mainRoutes.filter((route) => {
      if (userRole === 'SuperAdmin') {
        return true;
      }
      if (
          route.route === '/company' ||
          route.route === '/app-users' ||
          route.route === '/admin-management' ||
          route.route === '/reports'
      ) {
        return false;
      }
      if (userRole === 'CompanyAdministrator') {
        if (route.route === '/venues') {
          return false;
        }
      }
      return true;
    });
    setRoutes(activeRoutes);
  }, [userRole]);

  React.useEffect(() => {
    setActiveRoute(location.pathname);
    // runs on location, i.e. route, change
  }, [location]);
  return (
      <div className={`flex-vertical vertical-filled ${classes.container}`}>
        <div className={`flex-center ${classes.logo}`}>
          <img src={logoImgPath} alt="logo"/>
        </div>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title text-start">Menu</li>
            {routes.map((item, index) => {
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
                      <i className={item.iconName}/>
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
