import Header from "components/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "styles/style.scss"
import Products from "pages/Products";
import About from "pages/About";
import Categories from "pages/Categories";

const App = () => {
  return(
  <BrowserRouter>
    <Header/>
    <div className="content">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
};

export default App;