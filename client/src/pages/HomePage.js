import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
const HomePage = () => {
  const navigate = useNavigate()
  const [cart,setCart] = useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-categories');
      if (data?.success) setCategories(data?.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  const filteredProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
  }, [checked, radio]);

  return (
    <Layout title={'Home - Essenza Perfume E-Commerce'}>
      {/* Hero Section */}
      <section className='hero' style={{ backgroundColor: '#FAF1E4', padding: '80px 0' }}>
        <div className='container hero_content' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div className='hero_heading' style={{ flexBasis: '45%', minWidth: '280px' }}>
            <h1 style={{ fontFamily: "'Playfair', serif", fontSize: '4rem', fontWeight: '700', color: '#435334', marginBottom: '20px' }}>
              Your Scent,<br />Your Style!
            </h1>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem', marginBottom: '30px' }}>
              Embark on Your Fragrance Journey Today.
            </p>
            <button
              className='btn'
              style={{ padding: '12px 30px', fontSize: '1rem', borderRadius: '25px', backgroundColor: '#435334', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => setShowProducts(true)}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#5a6d3f')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#435334')}
            >
              Explore Now &#x2794;
            </button>
          </div>
          <div className='hero_image' style={{ flexBasis: '50%', textAlign: 'center' }}>
            <img src='/images/hero1.jpg' alt='Perfume' style={{ maxWidth: '100%', borderRadius: '20px' }} />
          </div>
        </div>
      </section>

      {/* Quiz Section - Below Hero */}
      <section className='find-scent' style={{ backgroundColor: '#FAF1E4', padding: '60px 0' }}>
        <div className='container find-scent_content' style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair', serif", fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', color: '#435334' }}>
            Find Your Scent
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', marginBottom: '30px', color: '#555' }}>
            Discover the perfect fragrance that resonates with your personality and style.
          </p>
          <a href='#' className='btn' style={{ padding: '12px 25px', fontSize: '1rem', borderRadius: '25px', backgroundColor: '#435334', color: '#fff', textDecoration: 'none', transition: 'all 0.3s' }}
             onMouseOver={(e) => (e.target.style.backgroundColor = '#5a6d3f')}
             onMouseOut={(e) => (e.target.style.backgroundColor = '#435334')}
          >
            Take the Quiz!
          </a>
          <div style={{ marginTop: '30px' }}>
            <img src='/images/hero3.jpg' alt='Quiz Image' style={{ maxWidth: '100%', borderRadius: '15px' }} />
          </div>
        </div>
      </section>

      {/* Products Section - Shown after clicking Explore */}
      {showProducts && (
        <div style={{ backgroundColor: '#FAF1E4', paddingBottom: '50px' }}>
          <div className='row mt-5'>
            {/* Filters */}
            <div className='col-md-2' style={{ backgroundColor: '#FAF1E4' }}>
              <h4 className='text-center' style={{ fontFamily: "'Playfair', serif", fontWeight: '700', marginBottom: '20px' }}>Filter By Category</h4>
              <div className='d-flex flex-column m-3'>
                {categories?.map((c) => (
                  <Checkbox key={c._id} className='mb-2' onChange={(e) => handleFilter(e.target.checked, c._id)} style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h4 className='text-center mt-4' style={{ fontFamily: "'Playfair', serif", fontWeight: '700', marginBottom: '20px' }}>Filter By Price</h4>
              <div className='d-flex flex-column m-3'>
                <Radio.Group className='mb-2' onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id} className='mb-2'>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className='d-flex flex-column m-3'>
                <button className='bth' onClick={() => window.location.reload()} style={{ fontFamily: "'Poppins', sans-serif'", cursor: 'pointer' }}>
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div className='col-md-9'>
              <h1
                className='text-center'
                style={{
                  fontFamily: "'Playfair', serif",
                  fontWeight: '700',
                  fontSize: '3rem',
                  color: '#435334',
                  marginBottom: '20px',
                }}
              >
                All Products
              </h1>

              <h2
                className='text-center'
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '600',
                  fontSize: '2rem',
                  color: '#5a6d3f',
                  marginBottom: '30px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Featured Products
              </h2>

              <div className='d-flex flex-wrap justify-content-center'>
                {products?.map((p) => (
                  <div
                    className='card m-3'
                    style={{
                      width: '18rem',
                      backgroundColor: '#FAF1E4',
                      border: '1px solid #D7E9B9',
                      borderRadius: '15px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className='card-img-top'
                      alt={p.name}
                      style={{ borderRadius: '15px 15px 0 0', height: '250px', objectFit: 'cover' }}
                    />
                    <div className='card-body text-center'>
                      <h5
                        className='card-title'
                        style={{
                          fontFamily: "'Playfair', serif",
                          fontWeight: '700',
                          fontSize: '1.3rem',
                          color: '#435334',
                          marginBottom: '10px',
                        }}
                      >
                        {p.name}
                      </h5>
                      <p
                        className='card-text'
                        style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#555' }}
                      >
                        {p.description.substring(0, 50)}...
                      </p>
                      <p
                        className='card-text'
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600', color: '#5a6d3f', fontSize: '1rem' }}
                      >
                        Rs.{p.price}
                      </p>
                      <div className='d-flex justify-content-center gap-2'>
                        <button className='btn btn-primary' 
                        onClick={()  => navigate(`/product/${p.slug}`)}>
                          See more details</button>
                        <button className='btn btn-secondary' onClick={()=> {
                          setCart([...cart,p])
                          localStorage.setItem('cart',JSON.stringify([...cart,p]))
                          toast.success('Item added to cart')
                        }}>

                        Add To Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {products && products.length < total && (
                <div className='m-2 p-3 text-center'>
                  <button
                    className='btn'
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                      loadMore();
                    }}
                  >
                    {loading ? 'Loading...' : 'Load more'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
