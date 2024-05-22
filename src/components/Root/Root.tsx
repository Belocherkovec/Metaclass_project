import { RouterProvider } from 'react-router-dom';
import router from 'config/Routes';
import { QueryStoreProvider } from 'components/QueryStore';

const Root = () => {
  return (
    <QueryStoreProvider>
      <RouterProvider router={router} />
    </QueryStoreProvider>
  );
};

export default Root;
