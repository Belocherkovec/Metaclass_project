import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import PageContent from 'components/PageContent';
import 'styles/style.scss';
import ScrollToTop from 'components/ScrollToTop';

const App = () => {
  return (
    <>
      <Header />
      <PageContent isHasBg>
        <Outlet />
      </PageContent>
      <ScrollToTop />
    </>
  );
};

export default App;
