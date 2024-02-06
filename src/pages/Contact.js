import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import clock from '../images/clock-svgrepo-com.png' ;
import email2 from '../images/email-1-svgrepo-com.png';
import path from '../images/path929.png';
import phone2 from '../images/phone-modern-svgrepo-com.png';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import { Link } from 'react-router-dom';

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import './contact.css';

function Contact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const allProducts = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Add logic to handle saving data
    setIsEditing(false);
  };

  return (
    <div className='help'>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
       
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr greenabout cartGreen ">
        <div className='contactContainer home-containerr'>
           
            <div className='flexcontact'>
                <div className='onecontact'>
                    <div className='flexonecontact'>
                        
                        <div className='imgcontact'>
                            <img src={path}/>
                        </div>
                        <div className='detailscontact'>
                            <h4>{translations[language]?.addresscontact}</h4>
                            <h2>LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M).</h2>
                            <h2>Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan</h2>
                        </div>
                     
                    </div>

                    <div className='flexonecontact'>
                        
                        <div className='imgcontact'>
                            <img src={clock}/>
                        </div>
                        <div className='detailscontact'>
                            <h4>{translations[language]?.hours}</h4>
                            <h2>{translations[language]?.day}</h2>
                            <h2>{translations[language]?.weekend}</h2>
                        </div>
                     
                    </div>

                    <div className='flexonecontact'>
                        
                        <div className='imgcontact'>
                            <img src={phone2}/>
                        </div>
                        <div className='detailscontact'>
                            <h4>{translations[language]?.phonenumber}</h4>
                            <h2>00212689831227</h2>
                        </div>
                     
                    </div>

                    <div className='flexonecontact'>
                        
                        <div className='imgcontact'>
                            <img src={email2}/>
                        </div>
                        <div className='detailscontact'>
                            <h4>{translations[language]?.email}</h4>
                            <h2>contact@vitaparapharma.com</h2>
                        </div>
                     
                    </div>


                </div>
                <div className='onecontactForm'>
                    <div className='formcontact'>
                        <h4>{translations[language]?.contactform}</h4>
                        <input
                           type="text"
                           placeholder="First Name"
                           name="name"        
                        />
                        <input
                           type="text"
                           placeholder="email"
                           name="email"        
                        />
                        <input placeholder='Message'/>
                    
                    </div>
                    <div className='contactbtn'>
                        <button>{translations[language]?.submitcontact}</button>
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
    </div>
  );
}

export default Contact;
