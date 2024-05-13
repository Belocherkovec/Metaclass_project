import { NavLink } from 'react-router-dom';

const RouteList = ({ activeClass }: { activeClass: string }): JSX.Element => {
  return (
    <>
      <NavLink to="/products" className={({ isActive }) => (isActive ? `${activeClass}` : '')}>
        Products
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => (isActive ? `${activeClass}` : '')}>
        Categories
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? `${activeClass}` : '')}>
        About us
      </NavLink>
    </>
  );
};

export default RouteList;
