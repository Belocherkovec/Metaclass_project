import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import PageContent from 'components/PageContent';
import 'styles/style.scss';
import { QueryStoreProvider } from 'components/QueryStore';
import ScrollToTop from 'components/ScrollToTop';

const App = () => {
  return (
    <>
      <QueryStoreProvider>
        <Header />
        <PageContent isHasBg>
          <Outlet />
        </PageContent>
        <ScrollToTop />
      </QueryStoreProvider>
    </>
  );
};

export default App;
