import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';

function Category({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
     const { api} = useContext(Authcontext);
  

  async function fetchData() {
    try {
      const { data } = await axios.get(`${api}products`);
      console.log(data);
      
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="categoryProducts" className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h3 className="fw-bold">Our Products</h3>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="row gx-3 gy-3 justify-content-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-6 col-md-4 col-lg-3 d-flex align-items-stretch"
              >
                <div className="card w-100 h-100 text-center">
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img
                      className="img-fluid"
                      src={product.image_url}
                      alt={product.title}
                      style={{
                        objectFit: 'contain',
                        height: '150px',
                        background: '#f9f9f9',
                        padding: '10px',
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-bold text-truncate">{product.title}</h6>
                      <div className="fw-bold">
                        <span className="text-primary">${product.price}</span>
                      </div>
                    </div>
                    <button
                    className="btn btn-sm btn-primary mb-2"
                  >
                    Add to Cart
                  </button>
                  </Link>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Category;
