import RouteList from 'config/RouteList';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={`${styles.navigation}`}>
      <RouteList activeClass={styles.active} />
    </nav>
  );
};

export default Navigation;
