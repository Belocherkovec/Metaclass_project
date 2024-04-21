import Logo from "components/Logo";
import { Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import styles from "./Header.module.scss";

const Header = () => {
  return(
    <header className={`${styles.header}`}>
      <div className={`${styles.content} content`}>
        <Link to="/"><Logo/></Link>
        <Navigation/>
        <div>
          logos
        </div>
      </div>
    </header>
  )
};

export default Header;