import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdShare } from 'react-icons/io';
import NavHeader from "../components/NavHeader";
import { useSelector , useDispatch } from "react-redux";
import { setLanguage , selectLanguage , selectTranslations } from "../rtk/slices/Translate-slice";
import { useRef } from "react";
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import { Link } from "react-router-dom";
import lotion2 from '../images/lotion2.png';
import { AiOutlineLike } from "react-icons/ai";
import { selectToken } from "../rtk/slices/Auth-slice";
import { AiOutlineDislike } from "react-icons/ai";
import { Modal , Button } from 'react-bootstrap';

function BlogDetails() {

  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState([]);
  /*const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, Poster: file });
  };*/
  const [isCopied, setIsCopied] = useState(false);
  const pageLinkRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const allProducts = useSelector((state) => state.products);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [searchTerm, setSearchTerm] = useState('');
  const bearerToken = useSelector(selectToken);
  const { blogId } = useParams();
  const [blogDetails, setblogDetails] = useState(null);
  const isUserLoggedIn = useSelector(selectToken) !== null;

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`https://ecommerce-1-q7jb.onrender.com/api/v1/public/content/${blogId}/en`);
        const data = await response.json();
        setblogDetails(data.data.post);
        console.log('data is' ,data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleCopyLink = () => {
    pageLinkRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  
  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };
  

  

  const [like, setLike] = useState([]);

 
  const isProductInWishlist = (blogPostId) => {
    return blogDetails && like.some(item => item.blogPostId === blogPostId);
  };
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const handleCloseModal = () => setShowModal(false); 
  
    
  const handleAddToLikes = async (blogPostId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage('please sign in first');
        setShowModal(true);
        return;
      }
      let updatedLike;
      
      if (isProductInWishlist(blogPostId)) {
       
        await handleDeleteFromLike(blogPostId);
        updatedLike = like.filter(item => item.blogPostId !== blogPostId);
      } else {
       
        await axios.put(
          `https://ecommerce-1-q7jb.onrender.com/api/v1/user/like/${blogPostId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
                'Accept-Language': language,
            },
          }
        );
        updatedLike = [...like, { blogPostId }];
        console.log('added like successfully');
      }
      setLike(updatedLike);
    } catch (error) {
      console.error('Error updating product in wishlist: ', error.message);
    }
  };
  
  
  const handleDeleteFromLike = async (blogPostId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage('please sign in first');
        setShowModal(true);
        return;
      }
      await axios.delete(`https://ecommerce-1-q7jb.onrender.com/api/v1/user/unlike/${blogPostId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
            'Accept-Language': language,
        
        },
      });
      console.log('deleted succefully');
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };
  

  const [isDisliked, setIsDisliked] = useState(false);

  const handleDislike = async (postId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage('please sign in first');
        setShowModal(true);
        return;
      }

      await axios.put(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/dislike/${postId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
              'Accept-Language': language,
          },
        }
      );
      console.log('Post disliked successfully');
      setIsDisliked(!isDisliked);
    } catch (error) {
      console.error('Error disliking post:', error.message);
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
   
       <div className='blog-container'>
           <div >
             <div className='blogContent'>
             <div className='blog-flex'>
               <div className='blogimg'>
               
  <img
    src={lotion2}
    alt="Product poster" />
               </div>
               <div className='infoblog'>

                 
               <div className='flexiconwithinput'>
                  <div className='flexblogicons'>
                <div  className='likeblog'>
                <AiOutlineLike
  style={{
    fontSize: '35px',
    cursor: 'pointer',
    color: isProductInWishlist(blogDetails?.blogPostId) ? 'blue' : 'white',
  }}
  className='icon'
  onClick={() => handleAddToLikes(blogDetails?.blogPostId)}
/>

                  </div>


                  <div  className='likeblog'> 
                <AiOutlineDislike
  style={{
    fontSize: '35px',
    cursor: 'pointer',
    color: isDisliked ? 'blue' : 'white',
  }}
  className='icon'
  onClick={() => handleDislike(blogDetails?.blogPostId)}
/>
                  </div>
               
                  <div className='share'>
                    <IoMdShare
                      style={{ fontSize: '35px', cursor: 'pointer' , color: 'white' }}
                      className='icon'
                      onClick={handleCopyLink}
                    />
                    
                  </div>
                 </div>
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

              {blogDetails ? (
        <div>
          <h5>{blogDetails.title}</h5>
        </div>
      ) : (
        <p>Loading...</p>
      )}
                 {blogDetails ? (
        <div>
          <h5>{blogDetails.content}</h5>
        </div>
      ) : (
        <p>Loading...</p>
      )}
               </div>
             </div>
             </div>

           </div>
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

export default BlogDetails;