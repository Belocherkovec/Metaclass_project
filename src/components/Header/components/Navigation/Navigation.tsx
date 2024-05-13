import styles from './Navigation.module.scss';
import RouteList from 'config/RouteList';

const Navigation = () => {
  return (
    <nav className={`${styles.navigation}`}>
      <RouteList activeClass={styles.active} />
    </nav>
  );
};

export default Navigation;
