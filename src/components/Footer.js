import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container className="d-flex justify-content-around">
        <div className="footer-item">
          <a href="mailto:xed.education11@gmail.com" className="text-white text-decoration-none">
            <FontAwesomeIcon icon={faGoogle} size="2x" className="me-2" />
            Gmail
          </a>
        </div>
        <div className="footer-item">
          <a href="https://t.me/+BW_-sxO1CKo1NzZk" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
            <FontAwesomeIcon icon={faTelegram} size="2x" className="me-2" />
            Telegram
          </a>
        </div>
        <div className="footer-item">
          <a href="https://www.instagram.com/xed.ed?igsh=ZDVwaHVoeHhjbThy" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
            <FontAwesomeIcon icon={faInstagram} size="2x" className="me-2" />
            Instagram
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
