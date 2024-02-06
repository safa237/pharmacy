/*import React from "react";
import {  useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLanguage , selectLanguage , selectTranslations } from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart , FaSearch } from 'react-icons/fa';
import logo from '../../images/Vita Logo2.png' ;
import { FaTrash } from "react-icons/fa";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import product from '../../images/product.png';
import NavHeader from "../../components/NavHeader";
import axios from "axios";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal } from 'react-bootstrap';
import './confirmOrder.css';

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const cart = useSelector(state => state.cart);
  const bearerToken = useSelector(selectToken);

  useEffect(() => {
  }, [language]);


  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

 

  

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const allProducts = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.cart);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

 
  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    city: '',
    region: '',
    postalCode: '',
    phone: '',
    email: '',
    notes: '',
  });
  

 

  const [address, setAdress] = useState([]);

  const fetchUserAdresses = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/all',
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("addreses", response.data);
      setAdress(response.data.data.addresses);
    }
    catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };


  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setShowModal(false);

  const createOrder = async (addressId) => {
    try {
      const response = await axios.post(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/order/cart/on/${addressId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.status === 200) {
        setModalMessage('Order submitted successfully');
        setShowModal(true);
      } else {
        console.error('Error submitting order:', response.data);

        if (response.data && response.data.message) {
          setModalMessage(` ${response.data.message}`);
          setShowModal(true);
        } else {
          console.error('Unknown error:', response.data);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

 

  const handleSubmit = async (addressId) => {
    createOrder(addressId);
    console.log(addressId);
  };

  useEffect(() => {
    fetchUserAdresses();
  }, []);

  return(
    <div className="confirmPage">
       <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        
        handleProductClick={handleProductClick}
      />

<Container style={{ marginTop: '50px' }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th className="p-4">country</th>
          <th className="p-4">city</th>
          <th className="p-4">region</th>
          <th className="p-4">street</th>
          <th className="p-4">zipCode</th>
          <th>action</th>
          </tr>
        </thead>
        <tbody>
          {address.map((item) => (
            <tr >
              <td>{item.country}</td>
              <td>{item.city}</td>
              <td>{item.region}</td>
              <td>{item.street}</td>
              <td>{item.zipCode}</td>
            <td>
                <button 
                onClick={() => handleSubmit(item.addressId)}
                className="useaddress">confirm order in this address</button>
          </td>
            </tr>
          ))}
        </tbody>
      </Table>

      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ConfirmOrder;*/




import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../images/Vita Logo2.png";
import { FaTrash } from "react-icons/fa";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import product from "../../images/product.png";
import NavHeader from "../../components/NavHeader";
import axios from "axios";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal } from "react-bootstrap";
import "./confirmOrder.css";

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const bearerToken = useSelector(selectToken);
  const [countries, setCountries] = useState([]);
  const [newAddress, setNewAddress] = useState({
    country: "MOROCCO",
    city: "",
    region: "",
    street: "",
    zipCode: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUserAddresses();
    getCounries();
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const allProducts = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.cart);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [address, setAdress] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/all",
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      // console.log("addreses", response.data);
      setAdress(response.data.data.addresses);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const createOrder = async (addressId) => {
    try {
      const response = await axios.post(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/order/cart/on/${addressId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.status === 200) {
        setModalMessage("Order submitted successfully");
        setShowModal(true);
      } else {
        console.log("Error submitting order:", response.data);

        if (response.data && response.data.message) {
          setModalMessage(` ${response.data.message}`);
          setShowModal(true);
        } else {
          console.error("Unknown error:", response.data);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (addressId) => {
    createOrder(addressId);
    console.log(addressId);
  };

  const addNewAddress = async () => {
    try {
      const response = await axios.post(
        "https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/new",
        newAddress,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("adding new address successfully", response.data);
      fetchUserAddresses();
      setNewAddress({
        country: "MOROCCO",
        city: "",
        region: "",
        street: "",
        zipCode: "",
      });
    } catch (error) {
      console.log("error in add newAddress >>", error);
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;

    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [fieldName]: value,
    }));

    console.log(newAddress);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/delete/${addressId}`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("Deleted address successfully", response.data);
      fetchUserAddresses();
    } catch (error) {
      console.log("error in Delete Address >>", error);
    }
  };

  const getCounries = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-1-q7jb.onrender.com/api/v1/public/country/all",
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("countries>>", response.data.data.countries);
      setCountries(response.data.data.countries);
    } catch (error) {
      console.log("error in getting countries", error.message);
    }
  };

  return (
    <div className="confirmPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <Container style={{ marginTop: "50px" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="p-4">country</th>
              <th className="p-4">city</th>
              <th className="p-4">region</th>
              <th className="p-4">street</th>
              <th className="p-4">zipCode</th>
              <th className="p-4">action</th>
              <th className="p-4">delete</th>
            </tr>
          </thead>
          <tbody>
            {address.map((item) => (
              <tr>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.region}</td>
                <td>{item.street}</td>
                <td>{item.zipCode}</td>
                <td>
                  <button
                    onClick={() => handleSubmit(item.addressId)}
                    className="useaddress"
                  >
                    confirm order in this address
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteAddress(item.addressId)}
                    className="useaddress2"
                  >
                    Delete this address
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          {address.length > 4 ? (
            <h3>Max addresses 5</h3>
          ) : (
            <button
              className="useaddress"
              onClick={() => setShowForm(!showForm)}
            >
              Adding New Address
            </button>
          )}

          {showForm && (
            <>
              <Table striped bordered hover size="sm" className="mt-4">
                <thead>
                  <tr>
                    <th className="p-4">country</th>
                    <th className="p-4">city</th>
                    <th className="p-4">region</th>
                    <th className="p-4">street</th>
                    <th className="p-4">zipCode</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => handleInputChange(e, "country")}
                        value={"MOROCCO"}
                      >
                        <option value="MOROCCO" key={"MOROCCO"}>
                          Morocco
                        </option>
                        {/* {Object.keys(countries).map((countryKey) => (
                          <option
                            key={countryKey}
                            value={countries[countryKey]}
                          >
                            {countries[countryKey]}
                          </option>
                        ))} */}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e, "city")}
                        value={newAddress.city}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e, "region")}
                        value={newAddress.region}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e, "street")}
                        value={newAddress.street}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e, "zipCode")}
                        value={newAddress.zipCode}
                      />
                    </td>
                    <td>
                      <button
                        className="useaddress"
                        onClick={() => addNewAddress()}
                      >
                        Save this Address
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ConfirmOrder;

