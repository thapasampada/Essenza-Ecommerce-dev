import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
    return (
        <Layout title={'About us - Essenza Perfume E-Commerce'}>
            <div className="row aboutus ">
                <div className="col-md-4 ">
                <img
                    src="/images/logo.png"
                    alt="aboutus"
                    style={{ width: "100%" }}
                />
                </div>
                <div className="col-md-6">
                <p className="text-justify mt-2">
                    The Essenza Perfume E-Commerce System is a modern web-based platform designed to provide users with a seamless, engaging, and personalized perfume shopping experience. With the rapid rise of digital commerce, consumers increasingly expect convenience, interactivity, and tailored product suggestions when making purchases online. Essenza addresses these needs by integrating core e-commerce functionalities such as user registration, intuitive product browsing, search and filtering mechanisms, shopping cart management, secure checkout, and the ability to leave product reviews.
                </p>
                </div>
            </div>
        </Layout>
    );
};


export default About;