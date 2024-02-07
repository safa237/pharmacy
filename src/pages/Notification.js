import './changepassword.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../rtk/slices/Auth-slice';
import { useEffect } from 'react';

import axios from 'axios';  // Import Axios
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import './notification.css';

function Notification() {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const bearerToken = useSelector(selectToken);
  const language = useSelector(selectLanguage);


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };



  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                  'Authorization': `Bearer ${bearerToken}`,
                  'Content-Type': 'application/json',
                  'Accept-Language': language,
                };
                const response = await axios.get('https://ecommerce-1-q7jb.onrender.com/api/v1/user/notifications', { headers });
                setNotifications(response.data);
                console.log('notificatio is : ', response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchData();
    }, []);

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen ">
        <div className="header-container">
          <h1>notification</h1>
         
        </div>
      </div>
    </div>
  );
}

export default Notification;
