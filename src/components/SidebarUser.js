// SidebarUser.js
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaHeart, FaShoppingCart , FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineWifiPassword } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useEffect } from 'react';
import ChangePassword from '../pages/ChangePassword';
import './sidebaruser.css';

function SidebarUser({ isOpen, onClose , handleLogout  }) {
  
  const handleLogoutClick = () => {
    handleLogout();
    onClose();
};

const handleIconClick = (event) => {
  event.stopPropagation();
  if (!isOpen) {
    onClose();
  }
};




    return (
        <div className={`sidebaruser ${isOpen ? 'open' : ''}`}>
           {/*<div className="user-info">
                
                <div className="user-name">User NameUser NameUser Name</div>
            </div>
            <hr className="separator" /> */}
            <nav className="sidebar-nav">
            <Link to="/profile" className="cart-link">
              <FaUser style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>My Profile</h5>
            </Link>

            <Link to="/order" className="cart-link">
              <FaBars style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>orders</h5>
            </Link>
            <Link to="/wishlist" className="cart-link">
              <FaHeart style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>wishlist</h5>
            </Link>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>cart</h5>
            </Link>
            <Link to="/changePassword" className="cart-link">
              <MdOutlineWifiPassword style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>Change Password</h5>
            </Link>
            <Link  onClick={handleLogoutClick} className="cart-link">
              <IoIosLogOut style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>Log Out</h5>
            </Link>
    
            </nav>
           
        </div>
    );
}

export default SidebarUser;
