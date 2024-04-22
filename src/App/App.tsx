// import Header from "components/Header";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Products from 'pages/Products';
import About from 'pages/About';
import Categories from 'pages/Categories';
import Header from 'components/Header';

import './App.module.scss';
import 'styles/style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="content_bg">
        <div className="content">
          {/* Можно ли вынести логику навигации из App, в отдельный компонент, например <Content />. Как лучше это сделать? */}
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
