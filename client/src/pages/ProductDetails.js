import Layout from "../components/Layout/Layout"
import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])

  //initial product details
  useEffect(() => {
    if(params?.slug) getProduct()
  }, [params?.slug])

  //get product
  const getProduct = async () => {
    try{
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product._id, data?.product.category._id)
    }catch(error){
      console.log(error)
    }
  }

  //get similar products
  const getSimilarProduct = async (pid, cid) => {
    try{
      const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Layout>
      <div style={{ backgroundColor: '#FAF1E4', minHeight: '100vh', padding: '40px 0', fontFamily: "'Playfair', serif" }}>
        <div style={{ marginBottom: '20px' }}>
  <a 
    href="/" 
    style={{ 
      fontSize: '1.1rem', 
      fontWeight: '500', 
      color: '#435334', 
      textDecoration: 'none', 
      border: '1px solid #435334', 
      padding: '8px 20px', 
      borderRadius: '25px', 
      transition: '0.3s' 
    }}
    onMouseOver={(e) => { e.target.style.backgroundColor = '#435334'; e.target.style.color = '#fff'; }}
    onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#435334'; }}
  >
    &#8592; Back to Home
  </a>
</div>

        <div className="row container mt-3">
          <div className="col-md-6">
            {product?._id ? (
              <img 
                src={`/api/v1/product/product-photo/${product._id}`} 
                className="card-img-top" 
                alt={product.name} 
                style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', borderRadius: '20px', marginBottom: '20px' }}
              />
            ) : (<p style={{ fontSize: '1.3rem', color: '#555' }}>Loading image...</p>)}
          </div>
          
          <div className="col-md-6" style={{ color: '#435334' }}>
            <h1 className="text-center" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '25px' }}>Product Details</h1>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Name: {product.name}</h4>
            <h5 style={{ fontSize: '1.25rem', marginBottom: '15px', lineHeight: '1.6' }}>Description: {product.description}</h5>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Price: Rs.{product.price}</h4>
            <h5 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Category: {product?.category?.name}</h5>
            <h5 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Scent Family: {product.scentFamily}</h5>
            
            <button 
              className="btn btn-secondary" 
              style={{ backgroundColor: '#435334', border: 'none', color: '#fff', borderRadius: '25px', padding: '12px 30px', fontSize: '1.2rem', cursor: 'pointer', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5a6d3f'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#435334'}
            >
              Add To Cart
            </button>
          </div>
        </div>

        <hr style={{ borderTop: '2px solid #D7E9B9', margin: '40px 0' }} />

        <div className="row mt-3">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#435334', marginBottom: '25px' }}>Similar Products</h2>
          {relatedProducts.length < 1 && <p style={{ fontSize: '1.2rem', color: '#555' }}>No similar Products found</p>}

          <div className='d-flex flex-wrap' style={{ gap: '20px' }}>
            {relatedProducts?.map((p) => (
              <div key={p._id} className="card" style={{ flex: '1 1 25%', minWidth: '220px', maxWidth: '280px', backgroundColor: '#FAF1E4', border: '1px solid #D7E9B9', borderRadius: '15px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <img 
                  src={`/api/v1/product/product-photo/${p._id}`} 
                  className="card-img-top" 
                  alt={p.name} 
                  style={{ borderRadius: '15px 15px 0 0', height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <h5 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#435334', marginBottom: '10px' }}>{p.name}</h5>
                  <p style={{ fontSize: '1rem', color: '#555', marginBottom: '10px' }}>{p.description.substring(0, 30)}...</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#5a6d3f' }}>Rs.{p.price}</p>
                  <button 
                    className="btn btn-secondary" 
                    style={{ backgroundColor: '#435334', border: 'none', color: '#fff', borderRadius: '25px', padding: '8px 20px', fontSize: '1rem', marginTop: '10px' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5a6d3f'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#435334'}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
