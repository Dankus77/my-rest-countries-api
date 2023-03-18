import React, { FC } from "react";

interface HeaderProps {
  onClick: () => void;
  darkMode: boolean;
}

const Header: FC<HeaderProps> = ({ onClick, darkMode }) => {
  return (
    <div>
      <div className={`header ${darkMode ? 'darkMode': ''}`}>
        <div className="header-container">
          <h2 className="logo">Where in the world?</h2>
          <div className="switch-mode" onClick={onClick}>
            <i className="fas fa-moon"></i>
            <h3>Dark Mode</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
