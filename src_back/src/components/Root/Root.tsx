import { RouterProvider } from 'react-router-dom';
import router from 'config/Routes';

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;
