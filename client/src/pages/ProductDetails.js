import Layout from "../components/Layout/Layout"
import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])

  //initial p details
  useEffect(() => {
    if(params?.slug) getProduct()
  }, [params?.slug])
  //get products
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
  const getSimilarProduct =async (pid, cid) => {
    try{
      const {data} =await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    }catch(error){
      console.log(error)
    }
 }  
  return (
    <Layout>
        <div className="row container mt-3">
          <div className="col-md-6">
            {product?._id ?(
              <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
            ):(<p>Loading image...</p>)}
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: {product.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            <h6>Scent Family: {product.scentFamily}</h6>
            <button className="btn btn-secondary">Add To Cart</button>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <h2>Similar Products</h2>
          {relatedProducts.length < 1 && <p>No similar Products found</p>}
          <div className='d-flex flex-wrap'>
                {relatedProducts?.map((p) =>(
                  <div key={p._id} className="card m-2" style={{width: '18rem'}}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 30)}</p>
                        <p className="card-text">Rs.{p.price}</p>
                        <div>
                          <button className="btn btn-secondary">Add To Cart</button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
        </div>
    </Layout>
  )
}

export default ProductDetails