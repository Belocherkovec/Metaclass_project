// import Header from "components/Header";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Products from 'pages/Products';
import About from 'pages/About';
import Categories from 'pages/Categories';
import Header from 'components/Header';
import ProductPage from 'pages/ProductPage';
import PageContent from 'components/PageContent';

import 'styles/style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <PageContent>
        {/* Можно ли вынести логику навигации из App, в отдельный компонент, например <Content />. Как лучше это сделать? */}
        <Routes>
          <Route path="/products">
            {/* Отображается при переходе на /products */}
            <Route index element={<Products />} />

            {/* Отображается при переходе на /products/:id */}
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </PageContent>
    </BrowserRouter>
  );
};

export default App;

// background: $color-bg;
// min-height: calc(100vh - $header-height);
