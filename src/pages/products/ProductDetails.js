import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaPlus , FaMinus } from "react-icons/fa";
import logo from '../../images/Vita Logo2.png' ;
import { Link } from "react-router-dom";
import StarRating from "../rate/StarRating";
import ReviewDialog from "./ReviewDialog";
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavHeader from "../../components/NavHeader";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal , Button } from 'react-bootstrap';
import axios from "axios";
import './ProductDetails.css';

function ProductDetails({rating}) {
  const navigate = useNavigate();
  const bearerToken = useSelector(selectToken);
  const products = useSelector((state) => state.products.products);
  const isUserLoggedIn = useSelector(selectToken) !== null;

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://ecommerce-1-q7jb.onrender.com/api/v1/public/product/en/${productId}`);
        const data = await response.json();
        setProductDetails(data.data.product);
        console.log('data is' ,data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);
 

  const [totalPrice, setTotalPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const allProducts = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };
 

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const handleCloseModal = () => setShowModal(false);
  
  const dispatch = useDispatch();

  const handleAddToCart = async (productId, product) => {
    if (!isUserLoggedIn) {
      setModalMessage('please sign in first');
      setShowModal(true);
      return;
    }
  
    const cartItem = {
      productId: productId,
      quantity: quantity, 
    };
  
    try {
      const response = await axios.put(
        'https://ecommerce-1-q7jb.onrender.com/api/v1/user/cart/update',
        cartItem,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Product added to cart:', response.data);
      setQuantity(0);
      setTotalPrice(0);
      
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };


  const handleDetailsClick = (selectedProduct) => {
        
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };
const [detailsOpen, setDetailsOpen] = useState(false);




  return (
    <div className="detailsPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
       
        handleProductClick={handleProductClick}
      />

        <div className="green-containerr">
          
          <div className="header-container flexContent">
            <div className="detailsflex">
            <div className="detailsflexabout">
              <h1>about this product : </h1>
              <p></p>
            </div>
            <div className="detailsfleximg">
            <div className="detailsIMG">
            
            {productDetails ? (
        <div>
          <img src={productDetails.pictureUrl} alt="Product details" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
            

            </div>
            <div className="detailsINFO">
              <h1>Product Details: </h1>
              <h1 style={{color: 'black'}}> <span></span></h1>
              <h1 style={{color: 'black'}}> <span></span></h1>
              <h1 style={{color: 'black'}}></h1>
              <h1 style={{color: 'black'}}></h1>
              <h1 style={{color: 'black'}}></h1>
              <h1 style={{color: 'black'}}></h1>
              <h1 style={{color: 'black'}}></h1>
              <h1 style={{color: 'black'}}></h1>
              <h1 style={{color: 'black'}}></h1>
            </div>
            </div>
            </div>
          </div>
          <div className="productFooter">
            <div className="header-container flexFooter">
              <div className="review">
                <button onClick={() => handleDetailsClick()}>Review</button>
              </div>
              <div className="middlefooter">
                <StarRating rating={rating} />
                <div style={{ marginLeft: "20px" }}>
                  
                  {productDetails ? ( 
             <h1>   {productDetails.price * quantity} $ </h1>
      ) : (
        <p>Loading...</p>
      )}
                  
                </div>
                <div className="counter">
                  <button style={{backgroundColor:'transparent' , color : 'white'}} onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button style={{backgroundColor:'transparent' , color : 'white'}} onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="review cart">
                <button onClick={() => handleAddToCart(productDetails.productId, productDetails)}>Add to Cart</button>
              </div>
            </div>
          </div>
          
        </div>
    
        <ReviewDialog
      isOpen={detailsOpen}
      onCancel={handleCancelDetails}
      productId={productId} 
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        
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

export default ProductDetails;

