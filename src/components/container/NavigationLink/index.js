import React from 'react';
import { NavLink } from 'reactstrap';
import history from '../../../history';

const NavigationLink = ({ active, route, children }) => {
  const goTo = () => {
    history.push(route);
  };
  return (
    <NavLink active={active} onClick={goTo}>
      {children}
    </NavLink>
  );
};

export default NavigationLink;
