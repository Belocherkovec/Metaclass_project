import { Link } from 'react-router-dom';
import cn from 'classnames';

import Logo from 'components/Logo';
import Navigation from './components/Navigation';
import User from 'components/icons/UserIcon';
import Bag from 'components/icons/BagIcon';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={cn('content', styles.content)}>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation />
        <div className={styles.navbar}>
          <Bag />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
