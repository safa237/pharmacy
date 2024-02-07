import React, { useState, useRef, useEffect } from 'react';
import './stylehome.css';
import './blog.css';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";

import { IoMdShare } from 'react-icons/io';
import logo from '../images/Vita Logo2.png';
import lotion2 from '../images/lotion2.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DialogBlog from './DialogBlog';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { useDispatch } from 'react-redux';
import NavHeader from '../components/NavHeader';
import { useNavigate } from 'react-router-dom';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import { FaSearch } from 'react-icons/fa';
import { selectToken } from '../rtk/slices/Auth-slice';


function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dialogBlogContent, setDialogBlogContent] = useState(null); 

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const pageLinkRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const bearerToken = useSelector(selectToken);

  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  const handleDetailsClick = () => {
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  const handleCopyLink = () => {
    pageLinkRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://ecommerce-1-q7jb.onrender.com/api/v1/public/content/all' ,
        {
          headers: {
            'Accept-Language': language,
          },
        }
        );
        setBlogs(response.data.data.posts);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  
  const handleBlogClick = async (clickedBlog) => { 
    try {                              
      const response = await axios.get(`https://ecommerce-1-q7jb.onrender.com/api/v1/public/content/${clickedBlog.blogPostId}`,
      {
        headers: {
          'Accept-Language': language,
        },
      }
      )
      setDetailsOpen(true);
      setDialogBlogContent(response.data.data.posts);
      navigate(`/blog/${clickedBlog.blogPostId}`);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    } finally {
      setLoading(false);
    }
  };


  const allProducts = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  
  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [searchTermBlog, setSearchTermBlog] = useState('');
  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true); // Reset the product exists flag if needed
  };

  const handleSearchChangeBlog = (e) => {
    const term = e.target.value;
    setSearchTermBlog(term.toLowerCase());
  };

  const handleSearchSubmitBlog = async (e) => {
    e.preventDefault();
    const foundBlog = blogs.find(
      (blog) =>
        blog.title.toLowerCase().includes(searchTermBlog) ||
        blog.content.toLowerCase().includes(searchTermBlog)
    );

    if (foundBlog) {
      navigate(`/blog/${foundBlog.blogPostId}`);
    } else {
      setProductExistsInCategory(false);
      setShowErrorMessage(true);
      setTimeout(() => {
        resetErrorMessage();
        setSearchTermBlog(''); // Clear the search term after showing the error message
      }, 3000);
    }
  };

 

 
  return (
   
     <div className="page-container">
       <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
       
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr">
        <div className='testtt'>
        <div className='searchBlog'>
        <form className='formsearchblog' onSubmit={handleSearchSubmitBlog}>
    <input
      placeholder='search blog'
      value={searchTermBlog}
      onChange={handleSearchChangeBlog}
    />
    <button type="submit">
      <FaSearch style={{fontSize: '25px'}}/>
    </button>
  </form>
  <div className="autocom-box autocom-blog">
              {productExistsInCategory === false && (
                <div className="error-message">
                  Blog not found. Please try another search.
                </div>
              )}
            </div>
          </div>
      {loading && (
      <div className="loading-spinner" style={{width: '50px' , height: '50px' , marginTop: '10em'}}>
      </div>
    )}
     {!loading && (
        <div className='blog-container'>
          {blogs.length > 0 && (
            <div >
              <div className='blogContent'>
              <div className='blog-flex'>
                <div className='blogimg'>
                  {/*<img
                    src={`data:image/png;base64,${selectedBlog ? selectedBlog.poster : blogs[0].poster}`}
                    alt="Blog poster"
          />*/}
          <img 
                       src={lotion2} 
                      alt="Blog poster"
                    />
                </div>
                <div className='infoblog'>
                  <div className='flexiconwithinput'>
                 
                 <div>
                 {isCopied && <span style={{ marginLeft: '5px', color: '#3A7E89' }}>Link copied!</span>}
                  <input
                      ref={pageLinkRef}
                      type="text"
                      readOnly
                      value={window.location.href}
                      style={{ position: 'absolute', left: '-9999px' }}
                    />
                  </div>
              </div>
                  <div >
                  {/*<h5>{selectedBlog ? selectedBlog.title : blogs[0].title}</h5>*/}
                  </div>
                  <h6>{selectedBlog ? selectedBlog.content : blogs[0].content.substring(0, 525)}...</h6>
                  <div className='readArticle'>
                     <button onClick={() => handleBlogClick(blogs[0])} className="read">
                         read article
                     </button>
                 </div>
                </div>
              </div>
              </div>
              <div className='card-blog header-container'>
                
                {blogs.slice(1).map((blog) => (
                  <div className='card1 card1blog' key={blog.blogPostId}>
                    <img 
                       src={lotion2} 
                      alt="Blog poster"
                    />
                    <p>{blog.content.substring(0, 125)}...</p>
                    
                    <div className='buttons'>
                      
                      <div className='readArticle'>
                      <button onClick={() => handleBlogClick(blog)} className="read">read article</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) }
        </div>
     )}
     </div>

       {/* <div className='header-container publicBlogs'> <p className='publicBlogs'>Blogues les plus populaires</p> </div>
      <div className='publicBlogs header-container card-blog'>
        <div className='card2'>
          <img src={lotion2} alt="lotion" />
          <p>6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It</p>
        </div>
        <div className='card2'>
          <img src={lotion2} alt="lotion" />
          <p>6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It</p>
        </div>
        <div className='card2'>
          <img src={lotion2} alt="lotion2" />
          <p>6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It</p>
        </div>
      </div>*/}
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
      <DialogBlog isOpen={detailsOpen} onCancel={handleCancelDetails} blogContent={dialogBlogContent} />
    </div>
      </div>
  
  );
}

export default Blog;