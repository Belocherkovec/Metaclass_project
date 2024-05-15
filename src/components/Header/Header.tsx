import { Link } from 'react-router-dom';

import Logo from 'components/Logo';
import PageContent from 'components/PageContent';
import Bag from 'components/icons/BagIcon';
import User from 'components/icons/UserIcon';
import Navigation from './components/Navigation';

import styles from './Header.module.scss';

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
