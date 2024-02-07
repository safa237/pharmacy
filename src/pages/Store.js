import React from 'react';
import './stylehome.css'; 
import logo from '../images/Vita Logo2.png' ;
import product from '../images/product.png' ;
import { FaSearch } from 'react-icons/fa';
import { FaHeart, FaShoppingCart , FaEye } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import Slider from './slider/Slider';
import StarRating from './rate/StarRating';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { fetchProducts , setProducts} from '../rtk/slices/Product-slice';
//import { addToWishlist , removeFromWishlist  } from '../rtk/slices/Wishlist-slice';
//import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from './products/DetailsDialog';
import { addToCart } from '../rtk/slices/Cart-slice';
import { CiStar } from "react-icons/ci";
import NavHeader from '../components/NavHeader';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import SidebarUser from '../components/SidebarUser';
import { addToWishlist , removeFromWishlist } from '../rtk/slices/Wishlist-slice';
import { clearWishlist } from '../rtk/slices/Wishlist-slice';
import loginimg from '../images/loginIcon.png';
import logoutimg from '../images/logouticon.png';
import cartimg from '../images/Cart.png';
import { selectToken } from '../rtk/slices/Auth-slice';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import './store.css';

function Store  ()  {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const cart = useSelector(state => state.cart);
  

  const navigate = useNavigate();
  /*const [products, setProducts] = useState([]);*/
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  const userId = useSelector((state) => state.auth.id);
  const bearerToken = useSelector(selectToken);

  
  const products = useSelector((state) => state.products.products);

  const [ratingFilter, setRatingFilter] = useState(0);


 
  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    setPriceRange((prevRange) => ({ ...prevRange, max: value }));
  };
  
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    // Fetch user's wishlist on component mount
    fetchUserFavourite();
  }, []);
  
  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };
  
    
  const handleAddToFavorites = async (productId) => {
    try {
      if (isProductInWishlist(productId)) {
       
        await handleDeleteFromWishlist(productId);
      } else {
        
        await axios.put(
          `https://ecommerce-1-q7jb.onrender.com/api/v1/user/wishlist/add/${productId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
              'Accept-Language': language,
            },
          }
        );
        await fetchUserFavourite();
      }
    } catch (error) {
      console.error('Error updating product in wishlist: ', error.message);
    }
  };
  
  const handleDeleteFromWishlist = async (productId) => {
    try {
      await axios.delete(`https://ecommerce-1-q7jb.onrender.com/api/v1/user/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Accept-Language': language,
        },
      });
      await fetchUserFavourite();
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };
  
  const fetchUserFavourite = async () => {
    try {
      const language = 'en';
      const response = await axios.get('https://ecommerce-1-q7jb.onrender.com/api/v1/user/wishlist/my', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Accept-Language': language,
        },
      });
  
      const favouriteData = response.data.data;
  
      if (favouriteData && favouriteData.wishlist) {
        setWishlist(favouriteData.wishlist.wishlistItems || []);
        console.log('Success fetch wishlist', favouriteData.wishlist.wishlistItems);
      } else {
        console.error('Error fetching user favourite: Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };
  
  
  

  const handleDetailsClick = (selectedProduct) => {
   
    setSelectedProduct(selectedProduct);
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
       
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);



  const checkLoggedInStatus = () => {
    const userToken = localStorage.getItem('token');
    setIsLoggedIn(!!userToken);

    // Load wishlist from localStorage
    /*if (userToken) {
      const storedWishlist = localStorage.getItem('wishlist');
      const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      // Dispatch the addToWishlist action to update the store
      parsedWishlist.forEach((productId) => {
        dispatch(addToWishlist(productId));
      });
    }*/
  };


  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
   
    setIsLoggedIn(false); // Update the login status
    setIsDropdownOpen(false); // Close the dropdown after logout
   
  };

  const rating = product.rate;

  
  const handleRatingChange = (newRating) => {
    setRatingFilter((prevRating) => (prevRating === newRating ? 0 : newRating));
  };
  
  
  

  const handleAddToCart = async (productId, product) => {
    if (!isLoggedIn) {
      alert('Please sign in to add to cart.');
      return;
    }
  
    const cartItem = {
      productId: productId,
      quantity: 1, 
    };
  
    try {
      const response = await axios.put(
        'https://ecommerce-1-q7jb.onrender.com/api/v1/user/cart/update',
        cartItem,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
        }
      );
  
      console.log('Product added to cart:', response.data);
  
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };
 

  const detailsBtn = () => {
    if (!isLoggedIn) {
      alert('Please sign in to view details.');
      return;
    }
    
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  
  
 

  /*const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };*/

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
 /* const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
     
    navigate(`/store?category=${categoryId}`); 
    dispatch(fetchProducts(categoryId));
  };*/

  const [selectedCategory, setSelectedCategory] = useState(null);
  

  const handleCategoryFilter = async (categoryId) => {
    try {
      let url;
      if (categoryId === null) {
        url = 'https://ecommerce-1-q7jb.onrender.com/api/v1/public/product/all'
      } else {
        url = `https://ecommerce-1-q7jb.onrender.com/api/v1/public/category/${categoryId}`;
      }

      const response = await fetch(url, {
        headers: {
          'Accept-Language': language,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setProducts(data.data.products));
      } else {
        console.error('Error fetching products by category:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };
  
  

  

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
    const matchesPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
    
    const matchesRating = ratingFilter
      ? product.rating >= ratingFilter && product.rating < ratingFilter + 1
      : true;
    return matchesSearch && matchesCategory && matchesPriceRange && matchesRating ;
  });

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-1-q7jb.onrender.com/api/v1/public/category/all', {
          headers: {
            'Accept-Language': language,
          },
        });
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [language]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromUrl = queryParams.get('search') || '';
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
        checkLoggedInStatus();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setSearchTerm(searchTermFromUrl);

    const categoryIdFromUrl = queryParams.get('category');
  setSelectedCategoryId(categoryIdFromUrl ? parseInt(categoryIdFromUrl) : null);
  }, [language, searchTermFromUrl]);
  
  // ...

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Update the URL when the search term changes
    navigate(`/store?search=${term}`);
  };


  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  






  const [selectedCategoryIdTwo, setSelectedCategoryIdTwo] = useState(null);


  const handleSelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    handleCategoryFilter(categoryId);
  };

  
 /* const handleSelectTwo  = (categoryId) => {
    setSelectedCategoryIdTwo(categoryId);
    navigate(`/store?category=${categoryId}`);
  };*/
  
  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  const handleSearchSubmit = () => {
    
    const productsInSelectedCategory = filteredProducts.filter(product => product.categoryId === selectedCategoryId);
  
    
    const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : '';
    const productsMatchingSearch = productsInSelectedCategory.filter(product => {
      const productNameLowerCase = product.name ? product.name.toLowerCase() : '';
      return productNameLowerCase.includes(searchTermLowerCase);
    });
  
    if (selectedCategoryId !== null && productsMatchingSearch.length === 0) {
      setProductExistsInCategory(false);
      setShowErrorMessage(true);
      setTimeout(resetErrorMessage, 3000);
    } else {
      navigate(`/store?search=${searchTerm}${selectedCategoryId !== null ? `&category=${selectedCategoryId}` : ''}`);
    }
  };
  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true); 
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [userRating, setUserRating] = useState(0);
  


    return (
      <div className="page-container">
      {/* Header Container */}
      <NavHeader
        userId={userId}
        searchTermm={searchTerm}
        handleSearchChange={handleSearchChange}
        //filteredProductss={filteredProducts}
        handleProductClick={handleProductClick}
      />
  
      {/* Green Container */}
      <div className="green-containerr">
       
        <div className='home-containerr testtt'>
       {/**  <div  className="search-container searchStore">
                <input type="text" style={{background: 'white'}} placeholder="Search" className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div> */}

         <div className='store-flex'>
         {loading && (
      <div className="loading-spinner" style={{width: '50px' , height: '50px' , marginTop: '10px'}}>
      
      </div>
    )}
    {!loading && (
          <div className="card-store">
        {filteredProducts.map((product) => (
          <div className="cards " key={product.productId}>
            <div className="card-body">
            <div className="card-icons">
           
            <FaHeart
      onClick={() => handleAddToFavorites(product.productId)}
      style={{ color: isProductInWishlist(product.productId) ? 'red' : '#3EBF87' }}
    />
          

           <FaEye className="cart-iconPro"
                 onClick={() => handleDetailsClick(product)}
               /> 
                              

              </div>
              <div className="card-imgstore" >
              
              <Link to={`/home/product/${product.productId}`}>
          <img src={product.pictureUrl} alt="Product poster" />
        </Link>
                  
              </div>
              <div className='card-info card-infoStore'>
                <h2>{product.name}</h2>
                
                <div className='rate'>
                
                {isLoggedIn && <StarRating
                           initialRating={product.rating}
                          isClickable={false}
                        /> }
  
                </div>
                <div className="price">
          {product.discount && (
            <div className="discounted-price">{`$${product.afterDiscount}`}</div>
          )}
          {product.discount && <div className="old-price">{`$${product.price}`}</div>}
          {!product.discount && <div className="price">{`$${product.price}`}</div>}
        </div>
              </div>
              <button
  className="proBtn"
  onClick={() => handleAddToCart(product.productId, product)}
>
  add to cart
</button>
              
             
            </div>
          </div>
        ))}
          </div>
     )}
           
          <div className='storeside'>
            <p></p>
          <div >
            <div style={{marginBottom: '30px' }}>
          <h5 style={{ color : 'black'}}>{translations[language]?.rating}</h5>
          <StarRating
              initialRating={ratingFilter}
              onRatingChange={handleRatingChange}
              isClickable={true} 
            />
           </div>
          <div style={{marginBottom: '30px' }}>
           <h5 style={{ color : 'black'}}>{translations[language]?.price} : {priceRange.max}</h5>
   <div  className="range-slider">
      <input
        type="range"
        min="0"
        max="2000"
        value={priceRange.max}
        onChange={handlePriceRangeChange}
      />
     
    </div>
    </div>
          <h5 style={{color : 'black'}}>{translations[language]?.category}</h5>
          <div className='filterCatdiv'>
          <div className='rateFilter'>
          <button
                    color="primary"
                    onClick={() => handleCategoryFilter(null)}
                    className='filterbycat'
                  >
                    {translations[language]?.AllCategories}
                  </button>
  {categories.map(category => (
    <button
    key={category.categoryId}
    color="primary"
    onClick={() => handleCategoryFilter(category.categoryId)}
    className={`filterbycat ${selectedCategory === category.categoryId ? 'active' : ''}`}
  >
      {category.name}
    </button>
  ))}
</div>
</div>
         {/*<p style={{marginTop:'5em'}}>filter by category</p>
          <div className='rateFilter'>
            <div ><CiStar /> Five Only</div>
            <div > <CiStar />four Only</div>
            <div> <CiStar />three Only</div>
            <div><CiStar /> two Only</div>
            <div><CiStar /> one Only</div>
  </div>*/}

          
          </div>
          </div>
          
      </div>
  
          <div className='marks'>
           
          </div>
  
        </div>
        
        <div className='footerr footerPhr'>
          <div className=' header-container '>
            <div className='flexFooter'>
                <div className='cartfooter'>
                    <div className='important'>
                        <h1>important links</h1>
                        <Link className='footerlink'>privacy policy </Link>
                        <Link className='footerlink'>cookies policy </Link>
                        <Link className='footerlink'>Terms & conditions </Link>
                    </div>
                    <div className='information'>
                        <h1>Informations sur la livraison</h1>
                        <h2>Informations d'expédition Pour garantir que vos achats arrivent sans problème, assurez-vous de fournir l'adresse et le numéro de téléphone corrects pour garantir une 
                        expérience d'achat pratique et efficace. Assurez-vous que vos informations d'expédition sont à jour, y compris les détails de l'adresse et le délai de livraison souhaité, pour 
                        vous assurer de recevoir votre commande rapidement et sans retards inutiles.
                        </h2>
                    </div>
                </div>
                <div className='cartfooter cartfootertwo'>
                <div className='important'>
                        <h1>coordonnées</h1>
                        <h2>Contactez-nous pour toute demande de renseignements ou d'assistance dont vous avez besoin, nous sommes là pour vous fournir soutien et conseils
                        </h2>
                    </div>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={address}/>
                        <h2>l'adresse:</h2>
                        </div>
                        <h2>LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M) <br />
                        Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan
                        </h2>
                    </div>
                    <div className='flexphoneemail'>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={phone}/>
                        <h2>Phone:</h2>
                        </div>
                        <h2>00212689831227</h2>
                    </div>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={email}/>
                        <h2>Email:</h2>
                        </div>
                        <h2>contact@vitaparapharma.com</h2>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <DetailsDialog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
          product={selectedProduct}
          rating = {rating}
       />
    </div>
    );
};

export default Store;