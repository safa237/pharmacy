/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setLanguage , selectLanguage , selectTranslations } from '../../rtk/slices/Translate-slice';
import './sign.css';
import { jwtDecode } from 'jwt-decode';
import { loadWishlistFromStorage } from '../../rtk/slices/Wishlist-slice';
import { addToWishlist } from '../../rtk/slices/Wishlist-slice';
import { setAuthData } from '../../rtk/slices/Auth-slice';

const SignInForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Default role is user
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  const handleInputChange = (field, value) => {
    setErrors({});
    const role = value.includes('admin') ? 'admin' : 'user';
    setFormData({ ...formData, [field]: value, role });
  };

  
  const handleUserLogin = () => {
   
    axios.post('https://mostafaben.bsite.net/api/Users/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        console.log('API Response:', result.data);

        const { token, email , id } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', email);
        dispatch(setAuthData({ email, token, id }));
        console.log('Logged in with id:', id);
  
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
        setErrors({ general: 'Invalid email or password' });
      });
  };
  
  
  
  
  

  const handleAdminLogin = () => {
    console.log('Admin Login Payload:', formData); // Log the payload
    
    axios.post('https://mostafaben.bsite.net/api/Admins/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err.response); 
        console.log(err);
        setErrors({ general: 'Invalid email or password for admin' });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (formData.email === '' || formData.email === null) {
      isValid = false;
      validationErrors.email = 'Email required; ';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = 'Email is not valid; ';
    }

    if (formData.password === '' || formData.password === null) {
      isValid = false;
      validationErrors.password = 'Password required; ';
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      formData.role === 'user' ? handleUserLogin() : handleAdminLogin();
    }
  };

  return (
    <>
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-12">
            <label>
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(event) => handleInputChange('email', event.target.value)}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3 col-md-12">
            <label>
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(event) => handleInputChange('password', event.target.value)}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
        </div>
        {errors.general && <div className="text-danger">{errors.general}</div>}
       
        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>
    </>
  );
};

export default SignInForm;*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, selectLanguage, selectTranslations } from '../../rtk/slices/Translate-slice';
import { setAuthData } from '../../rtk/slices/Auth-slice';
import { selectToken } from '../../rtk/slices/Auth-slice';
import { setToken } from '../../rtk/slices/Auth-slice';
import { setEmail } from '../../rtk/slices/Auth-slice';
import { useEffect } from 'react';

import './sign.css';

const SignInForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const bearerToken = useSelector(selectToken);

  const handleUserLogin = () => {
  const isEmail = formData.email.includes('@');
  const requestBody = {
    email: isEmail ? formData.email : '',
    phone: isEmail ? '' : formData.email,
    password: formData.password,
  };

  axios
    .post('https://ecommerce-1-q7jb.onrender.com/api/v1/auth/login', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
    })
    .then((result) => {
      console.log("Result data:", result.data);
      console.log("Result data:", result.data.message);
      setRegistrationMessage(result.data.message);

      // Dispatch the setToken action to update the Redux store
      dispatch(setToken(result.data.data.token));
      dispatch(setEmail(result.data.data.email));
      // Update localStorage
      localStorage.setItem('token', result.data.data.token);
      localStorage.setItem('email', result.data.data.email);
      // Use the token directly from the response
      console.log("token is : ", result.data.data.token);
      console.log("email is : ", result.data.data.email);
      // Navigate after dispatching the action
      navigate('/home');
    })
    .catch((err) => {
      console.log(err);
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if ((formData.email === '' && formData.phone === '') || (formData.email === null && formData.phone === null)) {
      isValid = false;
      validationErrors.email = 'Email or Phone required; ';
    }

    if (formData.password === '' || formData.password === null) {
      isValid = false;
      validationErrors.password = 'Password required; ';
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      handleUserLogin();
    }
  };

  return (
    <>
     {registrationMessage && <p className="text-success">{registrationMessage}</p>}
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <div className="mb-3 col-md-12">
          <label>
            Email or Phone<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="emailOrPhone"
            className="form-control"
            placeholder="Enter Email or Phone"
            autoComplete="off"
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3 col-md-12">
          <label>
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(event) => handleInputChange('password', event.target.value)}
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        {errors.general && <div className="text-danger">{errors.general}</div>}
       
        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>
    </>
  );
};

export default SignInForm;





