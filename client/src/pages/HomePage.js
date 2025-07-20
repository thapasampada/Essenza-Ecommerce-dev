import React, { useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
  const[auth,setAuth]=useAuth()
    const sliderRef = useRef(null);

  const scrollBestSellers = (direction) => {
    const scrollAmount = 220;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += direction * scrollAmount;
    }
  };

    return (
        <Layout title={'Home - Essenza Perfume E-Commerce'}>
          <pre>{JSON.stringify(auth,null,4)} </pre>
            <section class="hero">
        <div class="container hero_content">
            <div class="hero_heading">
                <h1>Your Scent,<br />Your Stye!</h1>
                <p>Embark on Your Fragrance Journey Today.</p>
                <a href="" class="btn">Explore Now &#x2794;</a>
            </div>
            <div class="hero_image">
                <img src="/images/hero1.jpg" alt="Perfume" />
            </div>
        </div>
     </section>

     
    <section class="find-scent">
        <div class="container find-scent_content">
            <h2>Find Your Scent</h2>
            <p>Discover the perfect fragrance that resonates with your personality and style.</p>
            <a href="" class="btn">Take the Quiz!</a>
            <img src="/images/hero3.jpg" alt="Quiz Image" />
        </div>
    </section>

    <section className="home-products">
  <div className="container">
    <h2 className="section-title">Home Products</h2>
    <p className="section-description">Explore our most loved fragrances perfect for your everyday moments.</p>

    <div className="product-slider-wrapper">
      <button className="scroll-btn left" onClick={() => scrollBestSellers(-1)}>&#x276E;</button>
      <div className="product-slider" ref={sliderRef}>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 1" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Floral</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 2" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Citrus</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 3" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Woody</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 4" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Oriental</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 5" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Spice</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 6" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Musk</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 7" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Amber</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
        <div class="product-card">
          <img src="/images/product.jpg" alt="Product 8" class="product-card__image"  />
          <h3 class="product-card__title">Essenza Oud</h3>
          <p class="product-card__price">Rs.2500</p>
        </div>
      </div>
      <button className="scroll-btn right" onClick={() => scrollBestSellers(1)}>&#x276F;</button>
    </div>
  </div>
</section>

        </Layout>
    );
};



export default HomePage;