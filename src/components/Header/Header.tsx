import { Link } from 'react-router-dom';

import Logo from 'components/Logo';
import Navigation from './components/Navigation';
import User from 'components/icons/UserIcon';
import Bag from 'components/icons/BagIcon';

import styles from './Header.module.scss';
import PageContent from 'components/PageContent';

const Header = () => {
  return (
    <header className={styles.header}>
      <PageContent className={styles.content}>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation />
        <div className={styles.navbar}>
          <Bag />
          <User />
        </div>
      </PageContent>
    </header>
  );
};

export default Header;
