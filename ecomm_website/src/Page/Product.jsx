import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Import CartContext
import { useParams } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';

const Product = () => {
  const { id } = useParams(); // Capture the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
   const { api} = useContext(Authcontext);
 

  useEffect(() => {
    // Fetch product details from Fake Store API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${api}products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{product.title}</h1>
          <p className="text-muted">{product.category}</p>
          <p className="fs-4">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <button className="btn btn-primary btn-lg">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
