import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      // setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#FAF1E4",
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        <div className="container">
          <h4 className="text-center mb-2">Category - {category?.name}</h4>
          <h6 className="text-center mb-4">
            {products?.length} result(s) found
          </h6>

          <div className="row">
            <div className="col-md-9 offset-1">
              <div className="d-flex flex-wrap justify-content-center">
                {products?.map((p) => (
                  <div
                    className="card m-2 flex-grow-1"
                    style={{
                      minWidth: "250px",
                      maxWidth: "300px",
                      backgroundColor: "#FFF9F0",
                      border: "1px solid #D7E9B9",
                      borderRadius: "10px",
                    }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                      }}
                    />
                    <div className="card-body p-2 text-center">
                      <h5
                        className="card-title"
                        style={{ fontSize: "1.1rem", marginBottom: "5px" }}
                      >
                        {p.name}
                      </h5>
                      <p
                        className="card-text"
                        style={{
                          fontSize: "0.85rem",
                          marginBottom: "5px",
                          color: "#555",
                        }}
                      >
                        {p.description.substring(0, 50)}...
                      </p>
                      <p
                        className="card-text"
                        style={{
                          fontWeight: "600",
                          color: "#5a6d3f",
                          marginBottom: "8px",
                        }}
                      >
                        Rs {p.price}
                      </p>
                      <div className="d-flex justify-content-center gap-1">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Commented Load More section */}
              {/*
              <div className="m-2 p-3 text-center">
                {products && products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading ..." : "Load More"}
                  </button>
                )}
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
