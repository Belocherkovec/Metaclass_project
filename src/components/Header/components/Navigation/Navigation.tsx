import { BrowserRouter, Route, NavLink, Routes, Outlet } from 'react-router-dom';
import styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={`${styles.navigation}`}>
      <NavLink to="/" 
        className={({ isActive }) => isActive ? `${styles.active}` : ""}
      >Products</NavLink>
      <NavLink to="/categories"
        className={({ isActive }) => isActive ? `${styles.active}` : ""}
      >Categories</NavLink>
      <NavLink to="/about"
        className={({ isActive }) => isActive ? `${styles.active}` : ""}
      >About us</NavLink>
    </nav>
  );
};

export default Navigation;