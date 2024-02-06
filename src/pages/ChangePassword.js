import './changepassword.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../rtk/slices/Auth-slice';

import axios from 'axios';  // Import Axios
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const bearerToken = useSelector(selectToken);
  
  const handleSaveClick = async () => {
    try {
      const apiUrl = 'https://ecommerce-1-q7jb.onrender.com/api/v1/user/password/update';

      const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json', 
      };

      const response = await axios.put(apiUrl, {
        oldPassword: currentPassword,
        newPassword: newPassword,
      }, { headers });

      if (response.data && response.data.success) {
        console.log('Password updated successfully');
      } else {
        console.error('Failed to update password:', response.data);
      }
    } catch (error) {
      console.error('Error updating password:', error);
     
    }
  };


  

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen ">
        <div className="header-container">
          <div className='changePasswordText'>
            <h2>Change Your Password</h2>
            <h6>Choose a strong password and don't reuse it for other accounts.</h6>
            <h6>Changing your password will sign you out of all your devices. You will need to enter your new password on all your devices.</h6>
          </div>
          <div className='changePasswordInputs'>
            <input
              className="name"
              type="password"
              name="newPassword"
              placeholder="New Password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              className="name"
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <div className="flexinput flexbutton">
              <button onClick={handleSaveClick}>Save</button>
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
