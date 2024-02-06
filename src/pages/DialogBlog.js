import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLanguage, selectTranslations } from '../rtk/slices/Translate-slice';
import { Link } from 'react-router-dom';
import logo from '.././images/Vita Logo2.png';
import lotion2 from '.././images/lotion2.png';
import { FaSearch } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import NavHeader from '../components/NavHeader';
import './dialogblog.css';

const DialogBlog = ({ isOpen, onCancel, blogContent  }) => {
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const pageLinkRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    
  }, [language]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onCancel();
    }
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

  return (
    <>
      {isOpen && blogContent  && (
        <div className="popup" onClick={handleOverlayClick}>
          <div className="popup-content">
          

            <div className="green-container">
              <div className="blog-container dialogContainer ">
                <div className="blog-flexDialog ">
                  <div className="blogimg ">
                    {blogContent .poster && (
                      <img src={`data:image/png;base64,${blogContent .poster}`} alt="Blog poster" />
                    )}
                  </div>
                  <div className="infoblog">
                    <div className="like-share">
                      <div className="share">
                        {/* ... (existing code) */}
                      </div>
                    </div>
                    <h5>{ blogContent .title}</h5>
                  <div className='share'>
                    <input
                      ref={pageLinkRef}
                      type="text"
                      readOnly
                      value={window.location.href}
                      style={{ position: 'absolute', left: '-9999px' }}
                    />
                    <IoMdShare
                      style={{ fontSize: '40px', cursor: 'pointer' }}
                      className='icon'
                      onClick={handleCopyLink}
                    />
                    {isCopied && <span style={{ marginLeft: '5px', color: '#3A7E89' }}>Link copied!</span>}
                  </div>
                    <p>{blogContent .descreption}</p>
                  </div>
                </div>
              </div>
         

              <div className='footerr blogfooter'>
        <div className=' header-container flex-footer'>
          <div className='footer-info'>
            <Link to={translations[language]?.links} className="footer-link">{translations[language]?.links}</Link>
            <Link to={translations[language]?.shipping} className="footer-link">{translations[language]?.shipping}</Link>
          </div>
          <div className='footer-info'>
            <Link to={translations[language]?.private} className="footer-link">{translations[language]?.private}</Link>
            <Link to={translations[language]?.cookies} className="footer-link">{translations[language]?.cookies}</Link>
          </div>
          <div className='footer-info'>
            <Link to={translations[language]?.info} className="footer-link">{translations[language]?.info}</Link>
            <Link to={translations[language]?.contactP} className="footer-link">{translations[language]?.contactP}</Link>
          </div>
          <div className='footer-info'>
            <Link to={translations[language]?.subscribe} className="footer-link">{translations[language]?.subscribe}</Link>
          </div>
        </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBlog;
