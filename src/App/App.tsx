import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import PageContent from 'components/PageContent';
import 'styles/style.scss';

const App = () => {
  return (
    <>
      <Header />
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};

export default App;
