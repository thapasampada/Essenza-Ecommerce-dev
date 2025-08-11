import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axiosInstance from "../utils/axiosInstance";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get products (for page 1 or initial load)
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // Load more products for pagination
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/product/product-list/${page}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Filter products
  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post("/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle category checkbox changes
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Initial load and category list + total count
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Load products initially and when page changes (except when page=1 and no filters)
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      if (page === 1) {
        getAllProducts();
      } else {
        loadMore();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Filter products when filters change
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
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
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((p) => (
                <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
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
              ))
            )}
          </div>
          <div className="m-2 p-3">
            {products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
