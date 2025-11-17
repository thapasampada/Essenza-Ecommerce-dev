import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>
          Explore Our Categories
        </h2>

        <div className="row g-4 justify-content-center">
          {categories.map((c) => (
            <div className="col-10 col-sm-6 col-md-4 col-lg-3" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="text-decoration-none text-dark"
              >
                <div
                  className="card text-center shadow-sm border-0 h-100 category-card"
                  style={{
                    borderRadius: "15px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    {/* Placeholder Circle for Category Initial */}
                    <div
                      className="d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#f3f4f6",
                        color: "#5e60ce",
                        fontWeight: "600",
                        fontSize: "1.3rem",
                      }}
                    >
                      {c.name.charAt(0).toUpperCase()}
                    </div>

                    <h5 className="card-title fw-semibold mb-0">{c.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Inline hover style */}
      <style>
        {`
          .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          }
          .category-card:hover .card-title {
            color: #5e60ce;
          }
        `}
      </style>
    </Layout>
  );
};

export default Categories;
