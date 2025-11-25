import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'

const Search = () => {
  const [values] = useSearch()
  const navigate = useNavigate()
  const [cart, setCart] = useCart()

  return (
    <Layout title={'Search Results - Essenza'}>
      <div style={{ backgroundColor: '#FAF1E4', minHeight: '100vh', padding: '50px 0' }}>
        <div className='container'>
          <div className='text-center mb-4'>
            <h1
              style={{
                fontFamily: "'Playfair', serif",
                fontWeight: '700',
                fontSize: '3rem',
                color: '#435334',
                marginBottom: '10px',
              }}
            >
              Search Results
            </h1>
            <h6
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#5a6d3f',
              }}
            >
              {values?.results?.length < 1
                ? 'No Products Found'
                : `Found ${values.results.length} product(s)`}
            </h6>
          </div>

<div className='d-flex flex-wrap justify-content-center'>
            {values?.results?.map((p) => (
              <div
                    className='card m-2 flex-grow-1'
                style={{
                   minWidth: '250px',  // minimum width
        maxWidth: '300px',  // maximum width for large screens
                  backgroundColor: '#FFF9F0',
                  border: '1px solid #D7E9B9',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                key={p._id}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                  style={{
                    borderRadius: '15px 15px 0 0',
                    height: '250px',
                    objectFit: 'cover',
                  }}
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
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.9rem',
                      color: '#555',
                      minHeight: '40px',
                    }}
                  >
                    {p.description.substring(0, 50)}...
                  </p>
                  <p
                    className='card-text'
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '600',
                      color: '#5a6d3f',
                      fontSize: '1rem',
                    }}
                  >
                    Rs.{p.price}
                  </p>
                  <div className='d-flex justify-content-center gap-2'>
                    <button
                      className='btn'
                      style={{
                        padding: '8px 18px',
                        borderRadius: '25px',
                        backgroundColor: '#435334',
                        color: '#fff',
                        border: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s',
                      }}
                      onClick={() => navigate(`/product/${p.slug}`)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#5a6d3f')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#435334')}
                    >
                      See more details
                    </button>
                    <button
                      className='btn'
                      style={{
                        padding: '8px 18px',
                        borderRadius: '25px',
                        backgroundColor: '#5a6d3f',
                        color: '#fff',
                        border: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s',
                      }}
                      onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success('Item added to cart')
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#435334')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#5a6d3f')}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
