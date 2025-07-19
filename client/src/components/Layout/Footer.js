import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer p-3">
            <h4 className="text-center">
                All Rights Reserved &copy; {new Date().getFullYear()} Essenza
            </h4>
            <p className="text-center mt-3">
                <Link to="/policy" className="text-white">Privacy Policy</Link> | 
                <Link to="/contact" className="text-white"> Contact Us</Link> | 
                <Link to="/about" className="text-white"> About Us</Link>
            </p>

        </div>
    );
};

export default Footer;