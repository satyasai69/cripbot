import { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";

import "./navbar.css"

function Navbar() {
  const [navToggle, setNavToggle] = useState(false);

  const width = useWindowWidth();
  useEffect(() => {
    if (width > 991) {
      setNavToggle(true);

    }
  }, [width]);

  

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="flex justify-content-between container">
        <a href="#" className="navbar-brand">
          <img src="/images/logo.png" alt="logo" />
        </a>
        <button
          onClick={() => setNavToggle(!navToggle)}
          aria-controls="basic-navbar-nav"
          type="button"
          aria-label="Toggle navigation"
          className={`navbar-toggler ${navToggle ? "" : "collapsed"} `}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse
          transition-all duration-300
           ease-in-out ${navToggle ? "height_toggle" : "h-[0]"}`}
          id="basic-navbar-nav"
        >
          <div className="mx-auto navbar-nav">
            <NavLink to={"/"} className={`nav-link`}>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            <NavLink className="nav-link" to="/staking">
              Staking
            </NavLink>
            <NavLink className="nav-link" to="/overview">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/swap">
              Swap
            </NavLink>
            <NavLink className="nav-link" to="/bridge">
              Bridge
            </NavLink>
          </div>
          <div className="desktop d-flex align-items-center gap-3">
            <div>
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.5005 38.9473C30.6894 38.9473 38.9493 30.6874 38.9493 20.4986C38.9493 10.3098 30.6894 2.04986 20.5005 2.04986C10.3117 2.04986 2.05181 10.3098 2.05181 20.4986C2.05181 30.6874 10.3117 38.9473 20.5005 38.9473ZM20.5005 40.9972C31.8219 40.9972 40.9991 31.8199 40.9991 20.4986C40.9991 9.17721 31.8219 0 20.5005 0C9.17917 0 0.00195312 9.17721 0.00195312 20.4986C0.00195312 31.8199 9.17917 40.9972 20.5005 40.9972Z"
                  fill="white"
                ></path>
                <path
                  d="M8.20117 32.418C8.20117 31.3592 8.99242 30.4645 10.046 30.3476C17.9534 29.4723 23.0831 29.5513 30.973 30.3671C31.367 30.4085 31.7405 30.5637 32.0477 30.8138C32.3549 31.0639 32.5827 31.3981 32.7031 31.7755C32.8235 32.1529 32.8315 32.5572 32.7259 32.939C32.6203 33.3209 32.4059 33.6637 32.1087 33.9257C22.7972 42.0421 17.4758 41.9304 8.85713 33.9339C8.43691 33.5444 8.20117 32.9909 8.20117 32.419V32.418Z"
                  fill="white"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30.867 31.3879C23.0396 30.5782 17.9837 30.5023 10.1573 31.3684C9.89968 31.3984 9.66218 31.5224 9.49028 31.7166C9.31838 31.9109 9.22415 32.1616 9.22565 32.421C9.22565 32.7141 9.34761 32.9919 9.55362 33.1846C13.8255 37.147 17.0623 38.9375 20.2262 38.9488C23.4014 38.9601 26.8124 37.1839 31.4348 33.1559C31.5817 33.0252 31.6874 32.8546 31.7391 32.665C31.7909 32.4753 31.7864 32.2747 31.7262 32.0875C31.6661 31.9004 31.5529 31.7347 31.4003 31.6107C31.2478 31.4866 31.0625 31.4096 30.867 31.3889V31.3879ZM9.93285 29.3309C17.9232 28.4463 23.1278 28.5263 31.0792 29.3493C31.6719 29.4112 32.2337 29.6445 32.6959 30.0208C33.158 30.397 33.5004 30.8998 33.6812 31.4677C33.862 32.0356 33.8732 32.6438 33.7136 33.218C33.554 33.7922 33.2305 34.3073 32.7826 34.7005C28.0936 38.7879 24.1886 41.014 20.2201 40.9986C16.2403 40.9843 12.5075 38.7202 8.16074 34.6871C7.84953 34.3972 7.60143 34.0463 7.43196 33.6562C7.26249 33.2661 7.17528 32.8453 7.17579 32.42C7.17429 31.6558 7.45478 30.918 7.96351 30.3478C8.47225 29.7776 9.17346 29.4151 9.93285 29.3298V29.3309Z"
                  fill="white"
                ></path>
                <path
                  d="M28.6996 16.3987C28.6996 18.5733 27.8358 20.6588 26.2981 22.1965C24.7604 23.7342 22.6748 24.5981 20.5002 24.5981C18.3256 24.5981 16.24 23.7342 14.7023 22.1965C13.1646 20.6588 12.3008 18.5733 12.3008 16.3987C12.3008 14.224 13.1646 12.1385 14.7023 10.6008C16.24 9.06308 18.3256 8.19922 20.5002 8.19922C22.6748 8.19922 24.7604 9.06308 26.2981 10.6008C27.8358 12.1385 28.6996 14.224 28.6996 16.3987Z"
                  fill="white"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.5002 22.5482C22.1312 22.5482 23.6954 21.9003 24.8486 20.7471C26.0019 19.5938 26.6498 18.0296 26.6498 16.3987C26.6498 14.7677 26.0019 13.2035 24.8486 12.0502C23.6954 10.897 22.1312 10.2491 20.5002 10.2491C18.8692 10.2491 17.3051 10.897 16.1518 12.0502C14.9985 13.2035 14.3506 14.7677 14.3506 16.3987C14.3506 18.0296 14.9985 19.5938 16.1518 20.7471C17.3051 21.9003 18.8692 22.5482 20.5002 22.5482ZM20.5002 24.5981C22.6748 24.5981 24.7604 23.7342 26.2981 22.1965C27.8358 20.6588 28.6996 18.5733 28.6996 16.3987C28.6996 14.224 27.8358 12.1385 26.2981 10.6008C24.7604 9.06308 22.6748 8.19922 20.5002 8.19922C18.3256 8.19922 16.24 9.06308 14.7023 10.6008C13.1646 12.1385 12.3008 14.224 12.3008 16.3987C12.3008 18.5733 13.1646 20.6588 14.7023 22.1965C16.24 23.7342 18.3256 24.5981 20.5002 24.5981Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <button className="header-button">Connect Wallet</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
