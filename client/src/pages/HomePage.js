import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get total count
  const getTotal = async() =>{
    try{
      const {data} = await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() =>{
    if(page===1) return
      loadMore()
  },[page])

  //load more
  const loadMore = async() => {
    try{
      setLoading(true)
      const {data} =await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    }
    catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(()=>{
    getTotal();
  }, [])

  //get all categories
  const getAllCategory = async () => {
    try{
      const {data} = await axios.get('/api/v1/category/get-categories');
      if(data?.success){
        setCategories(data?.categories || []); 
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  // Fetch products 
  const getAllProducts = async () =>{
    try{
      setLoading(true)
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    }
    catch(error){
      setLoading(false)
      console.log(error);
    }
  }

  // Filter products by category
  const handelFilter =  (value, id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  }

  useEffect(() => {
    if(!checked.length || !radio.length)getAllProducts()
    }, [checked.length, radio.length])

    useEffect(() =>{
      if(checked.length || radio.length) filteredProduct()
    },[checked, radio])
  //get filtered product
  const filteredProduct = async () => {
    try{
      const {data} = await axios.post('/api/v1/product/product-filters',{checked, radio})
      setProducts(data?.products)
    }catch(error){
      console.log(error)
    }
  }
    
    return (
        <Layout title={'Home - Essenza Perfume E-Commerce'}>
        
          <div className='row mt-3'>
            <div className='col-md-2'>
              <h4 className='text-center'>Filter By Category</h4>
              <div className='d-flex flex-column m-3'>
                { categories?.map((c) => (
                <Checkbox key={c._id} className='mb-2' onChange={(e) => handelFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
              ))}
              </div>
              {/*Price Filter*/ }
              <h4 className='text-center mt-4'>Filter By Price</h4>
              <div className='d-flex flex-column m-3'>
                <Radio.Group className='mb-2' onChange={e => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id} className='mb-2'>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className='d-flex flex-column m-3'>
                <button className='bth' onClick={() => window.location.reload()}>Reset Filters</button>
              </div>
            </div>
            <div className='col'>
              {JSON.stringify(radio,null,4)}
              <h1 className='text-center'>All Products</h1>
              <h2 className='text-center'>Featured Products</h2>
              <div className='d-flex flex-wrap'>
                {products?.map((p) =>(
                  <div key={p._id} className="card m-2" style={{width: '18rem'}}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 30)}</p>
                        <p className="card-text">Rs.{p.price}</p>
                        <div>
                          <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>see more details</button>
                          <button className="btn btn-secondary" onClick={() => {
                            setCart([...cart,p])
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success('Item addes to cart')
                          }}>Add To Cart</button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='m-2 p-3'>{products && products.length < total && (
                <button className='btn' onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}>
                  {loading ? "Loading...": "Load more"}
                </button>
              )}</div>
            </div>
          </div>
          
    

   {/* 
   <section class="hero">
        <div class="container hero_content">
          <div class="hero_heading">
            <h2>Find Your Scent</h2>
            <p>Discover the perfect fragrance that resonates with your personality and style.</p>
            <a href="" class="btn">Take the Quiz!</a>
          </div>
          <div class="hero_image">
            <img src="/images/hero1.jpg" alt="Perfume" />
          </div>
        </div>
    </section>
   <section class="hero">
          <div class="container hero_content">
              <div class="hero_heading">
                  <h1>Your Scent,<br />Your Stye!</h1>
                  <p>Embark on Your Fragrance Journey Today.</p>
                  <a href="/" class="btn">Explore Now &#x2794;</a>
              </div>
              <div class="hero_image">
                  <img src="/images/hero1.jpg" alt="Perfume" />
                  <img src="/images/hero3.jpg" alt="Quiz Image" />
              </div>
          </div>
        </section> 
  <section className="best-sellers">
    <div class="container">
      <h2 class="section-title">Best Sellers</h2>
        <p class="section-description">Explore our most popular fragrances loved by our customers.</p>
        <div class="product-slider-container">
            <button class="scroll-btn scroll-left" onclick="scrollBestSellers(-1)">&#x276E;</button>
            <button class="scroll-btn scroll-right" onclick="scrollBestSellers(1)">&#x276F;</button>
        </div>
      <div class="product-slider">
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
    </div>
  </section> */}
        </Layout>
    );
};


export default HomePage;