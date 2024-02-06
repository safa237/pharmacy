import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, addToWishlist, removeFromWishlist } from '../rtk/slices/Product-slice';
import { Button, Container, Table } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavHeader from '../components/NavHeader';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../rtk/slices/Auth-slice';
import axios from 'axios';

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const [wishlist, setWishlist] = useState([]);

  const bearerToken = useSelector(selectToken);
  

  const fetchUserFavourite = async () => {
    try {
      const language = 'en'; 
  
      const response = await axios.get(`https://ecommerce-1-q7jb.onrender.com/api/v1/user/wishlist/${language}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      const favouriteData = response.data.data; 
      
      if (favouriteData && favouriteData.wishlist) {
        setWishlist(favouriteData.wishlist.wishlistItems || []); 
        console.log('Success fetch wishlist', favouriteData.wishlist.wishlistItems);
      } else {
        console.error('Error fetching user favourite: Unexpected response structure');
      }
      console.log('success fetch wishlost' , response.data.data.wishlist.wishlistItems);
    
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  const handleDeleteFromWishlist = async (productId) => {
    try {
      await axios.delete(`https://ecommerce-1-q7jb.onrender.com/api/v1/user/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      await fetchUserFavourite();
      console.log('success delete from wishlist ' , productId);
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };

  useEffect(() => {
   
    fetchUserFavourite();
  }, []);

  return (
    <div className="wishlistContainer">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Container style={{ marginTop: '50px' }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            
          </tr>
        </thead>
        <tbody>
          {wishlist.map((product, index) => (
            <tr key={index}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              {/*<td>
                <button
                onClick={() => handleDeleteFromWishlist(product.productId)}>
                delete</button>
          </td>*/}
            </tr>
          ))}
        </tbody>
      </Table>

      </Container>
    </div>
  );
}

export default Wishlist;


