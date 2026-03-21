import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"
import { scrollToTop } from '../../Comman/ScrollOnTop.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'bi bi-facebook', url: '#', label: 'Facebook' },
    { icon: 'bi bi-instagram', url: 'https://www.instagram.com/mobiteq_pay/', label: 'Instagram' },
    { icon: 'bi bi-linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'bi bi-twitter-x', url: '#', label: 'Twitter' },
    { icon: 'bi bi-pinterest', url: '#', label: 'Pinterest' },
    { icon: 'bi bi-youtube', url: '#', label: 'YouTube' }
  ];

  const accountLinks = [
    { to: '/login', text: 'Login' },
    { to: '/about', text: 'About Us' },
    { to: '/blog', text: 'Blog' },
    { to: '/contact-us', text: 'Contact Us' },
    { to: '/sign-up', text: 'Create Account' },
    { to: '/become-vendor', text: 'Become Vendor' }
  ];

  const quickLinks = [
    { to: '/cart', text: 'Cart' },
    { to: '/faq', text: 'FAQ' },
    { to: '/', text: 'Home' },
    { to: '/compare', text: 'Compare' },
    { to: '/all-product/0/all-categories', text: 'All Product' },
    { to: '/privacy-policy', text: 'Privacy Policy' },
    { to: '/terms-conditions', text: 'Term & Conditions' }
  ];

  const contactInfo = [
    { icon: 'bi bi-geo-alt', text: 'Address:  B-86, FIRST FLOOR, SECTOR-60, NOIDA, GAUTAM BUDDHA NAGAR, UTTAR PRADESH-201301' },
    { icon: 'bi bi-telephone', text: 'Call us: +91- 9588347500' },
    { icon: 'bi bi-envelope', text: 'email us: care@mobiteqpay.com' },
    { icon: 'material-symbols-outlined', text: 'Fax 123456', symbol: 'deskphone' }
  ];

  return (
    <>
      <section id='footerSection'>
        <footer className="footer spad">
          <div className="container">
            <div className="row quickLink">
              {/* Company Info */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer__about">
                  <div className="footer__about__logo">
                    <Link to="/" onClick={scrollToTop}>
                      <img src="/assets/images/logo/mobiteqLogo.png" alt="Parijat Handicraft Logo" width="150" />
                    </Link>
                  </div>
                  <p style={{textAlign:"justify"}}>
                   We offer a curated collection of premium handcrafted products designed with passion and precision. From beautifully hand-painted pottery to intricately embroidered textiles, each piece reflects authentic craftsmanship and timeless elegance. Discover unique creations that add charm and character to your everyday life.
                  </p>
                </div>
              </div>

              {/* Links Section */}
              <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1 quickLink">
                <div className="row">
                  <div className="col-6">
                    <h6>My account</h6>
                    <ul>
                      {accountLinks.map((link, index) => (
                        <li key={index}>
                          <Link to={link.to} onClick={scrollToTop}>
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6">
                    <h6>Quick links</h6>
                    <ul>
                      {quickLinks.map((link, index) => (
                        <li key={index}>
                          <Link to={link.to} onClick={scrollToTop}>
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact & Newsletter */}
              <div className="col-lg-4 col-md-12">
                <h6>Contact us</h6>
                <div className="contact-info">
                  <ul>
                    {contactInfo.map((item, index) => (
                      <li key={index}>
                        {item.icon === 'material-symbols-outlined' ? (
                          <span className={`${item.icon} me-3`}>{item.symbol}</span>
                        ) : (
                          <i className={`${item.icon} me-3`}></i>
                        )}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="footer__widget">
                  <form onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="site-btn">
                      {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    </button>
                  </form>
                  
                  <div className="footer__widget__social">
                    <h6>Follow us</h6>
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="row">
              <div className="col-lg-12">
                <div className="footer__copyright">
                  <div className="footer__copyright__text">
                    <div className="sub-footer-contain">
                      <p>
                        <span>2016 - {currentYear} @ </span>
                        copyright by <Link to="/">Parijat Handicraft</Link> powered by Parijat Handicraft.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  )
}






