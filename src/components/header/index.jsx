import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import "./index.css";
import { ReactComponent as FavouritesIcon } from '../../assets/images/favourites.svg';
import { ReactComponent as ListingIcon } from '../../assets/images/listing-icon.svg';
import { ReactComponent as AccountIcon } from '../../assets/images/account-icon.svg';
import { ReactComponent as MenuIcon } from '../../assets/images/menu-icon.svg';
import userReducer from '../../reducers/user';
import { logMeOut } from "../../actions/user";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { user } = useSelector(userReducer);
  const dispatch = useDispatch()
  let history = useHistory()

  const onLogout = useCallback(() => {
    dispatch(logMeOut());
    history.push("/")
  }, [dispatch, history])

  return (
    <div className="header-section">
      <div className="container">
        <div className={`header-content flex justify-between items-center ${isShowMenu ? 'show-menu' : ''}`}>
          <a href="/" title="" className="flippo-logo">
            <img
              src="https://cdn.dorik.com/61f8a32d3410bd0011e82758/6200cf380918f10012b1e49c/images/anotha1_8c5t0vdz.png"
              alt=""
            />
          </a>
          <div className="menu-icon" onClick={() => setIsShowMenu(!isShowMenu)}>
            <MenuIcon />
          </div>
          {!user && (
            <ul className="right-nav flex">
              <li>
                <a href="/login" title="Login" className="login">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" title="Join Us" className="btn">
                  Join Us
                </a>
              </li>
            </ul>
          )}
          {user && (
            <>
              <ul className="center-nav flex">
                <li className="flex items-center">
                  <Link to='/post'>
                    <button
                        className="btn btn-sm btn-info"
                        type="button"
                    >
                      New Listing
                    </button>
                  </Link>
                </li>
                <li>
                  <a href="/favorites" title="Favourites" className="flex items-center">
                    <FavouritesIcon />
                    Favourites
                  </a>
                </li>
                <li>
                  <a href="/myadverts" title="My Listings" className="flex items-center">
                    <ListingIcon />
                    My Posts
                  </a>
                </li>
              </ul>
              <ul className="right-nav flex">

                <li>
                  <a href="/user" title="Account" className="flex items-center">
                    <AccountIcon />
                  </a>
                </li>
                <li>
                  <div onClick={onLogout} title="Log Out">
                    Log Out
                  </div>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;