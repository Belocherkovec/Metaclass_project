import { Navigate, createBrowserRouter, createHashRouter } from 'react-router-dom';
import App from 'App/';
import About from 'pages/About';
import Categories from 'pages/Categories';
import ProductPage from 'pages/ProductPage';
import Products from 'pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />, // Перенаправляем на страницу продуктов
      },
      {
        path: '/products',
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ':id',
            element: <ProductPage />,
          },
        ],
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/products" replace />,
  },
]);

export default router;
