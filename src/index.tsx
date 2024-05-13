import React from "react";
import ReactDOM from "react-dom/client";

import styles from "./styles.module.scss";
import sun from "./sun.png";

type Props = {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({children}: Props) =>{
  return <div>{children}</div>
}

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
  root.render(<div className={styles.title}>React приложение <img src={sun}><Button children="aboba" /></img></div>);
});

if (module.hot) {
  module.hot.accept();
}
