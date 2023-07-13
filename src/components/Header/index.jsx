import logo from "../../assets/images/logo_horizontal.png";
import "./Header.css";
const Header = () => {
  return (
    <div id="header-wrapper" className="flex justify-between">
      <div className="flex items-center">
        <img id="header-lion" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Header;