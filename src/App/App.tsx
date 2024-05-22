import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import PageContent from 'components/PageContent';
import 'styles/style.scss';
import { QueryStoreProvider } from 'components/QueryStore';

const App = () => {
  return (
    <>
      <Header />
      <PageContent isHasBg>
        <Outlet />
      </PageContent>
    </>
  );
};

export default App;
