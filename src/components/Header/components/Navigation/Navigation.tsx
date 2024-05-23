import cn from 'classnames';
import RouteList from 'config/RouteList';
import styles from './Navigation.module.scss';

export type NavigationProps = {
  className?: string;
};

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  return (
    <nav className={cn(styles.navigation, className)}>
      <RouteList activeClass={styles.active} />
    </nav>
  );
};

export default Navigation;
