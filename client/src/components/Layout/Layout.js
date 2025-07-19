import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title, description, keywords, author}) => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta name="description" content="{description}" />
                <meta name="keywords" content="{keywords}" />
                <meta name="author" content="{author}" />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{minHeight: '70vh'}}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: 'Essenza Perfume E-Commerce',
    description: 'Essenza Perfume E-Commerce is your go-to platform for all your fragrance needs.',
    keywords: 'perfume, e-commerce, online shopping, fragrances',
    author: 'Essenza Team'
};

export default Layout;