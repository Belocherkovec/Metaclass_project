import React from "react";
import ReactDOM from "react-dom/client";

import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Проверяем, существует ли элемент с id "root" в DOM
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Элемент root не найден в DOM.");
    return;
  }

  // Создаем корневой элемент с помощью ReactDOM.createRoot
  const root = ReactDOM.createRoot(rootElement);

  // Рендерим компонент React
  root.render(<div className="title">React приложение</div>);
});

if (module.hot) {
  module.hot.accept();
}
