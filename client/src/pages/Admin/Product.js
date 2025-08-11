import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      {/* Inline CSS styles */}
      <style>{`
        /* Remove blue outline and default link styles on product cards */
        .product-link {
          text-decoration: none;
          color: inherit;
          outline: none;
          display: block;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-link:focus,
        .product-link:hover {
          text-decoration: none;
          outline: none;
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        /* Card styling */
        .card {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
          transition: box-shadow 0.3s ease;
          width: 18rem;
          margin: 0.5rem;
        }
        .card:hover {
          box-shadow: 0 12px 24px rgb(0 0 0 / 0.2);
        }
        /* Image styling */
        .card-img-top {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          object-fit: cover;
          height: 180px;
          width: 100%;
        }
        /* Buttons container */
        .card-body .d-flex {
          gap: 12px;
        }
        /* Buttons styling */
        .btn-primary {
          background-color: #126429ff;
          border: none;
          transition: background-color 0.3s ease;
          font-weight: 600;
          border-radius: 6px;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .btn-primary:hover {
          background-color: #043e17ff;
        }
        .btn-success {
          background-color: #6b9474ff;
          border: none;
          transition: background-color 0.3s ease;
          font-weight: 600;
          border-radius: 6px;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .btn-success:hover {
          background-color: #1e7e34;
        }
        /* Responsive fix */
        @media (max-width: 576px) {
          .card {
            width: 100% !important;
            margin: 0.5rem 0;
          }
        }
      `}</style>

      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Products List</h1>
          <div className="d-flex flex-wrap justify-content-start">
            {products.length === 0 && <p>No products found.</p>}
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button className="btn btn-primary">More Details</button>
                      <button className="btn btn-success">ADD TO CART</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
