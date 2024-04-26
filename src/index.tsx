import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

ReactDom.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// import * as React from 'react';
// import * as ReactDom from 'react-dom/client';
// import { BrowserRouter, Route, Routes, Navigate, Outlet, RouterProvider } from 'react-router-dom';

// import App from './App';
// import Products from 'pages/Products';
// import About from 'pages/About';
// import Categories from 'pages/Categories';
// import ProductPage from 'pages/ProductPage';
// import path from 'path';

// const root = document.getElementById('root') as HTMLElement;

// const router = [
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/products',
//         element: <Products />,
//         children: [
//           {
//             path: ':id',
//             element: <ProductPage />,
//           },
//         ],
//       },
//       {
//         path: '/categories',
//         element: <Categories />,
//       },
//       {
//         path: '/about',
//         element: <About />,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <Navigate to="/products" replace />,
//   },
// ];

// ReactDom.createRoot(root).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );
