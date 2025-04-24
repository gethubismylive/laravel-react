import { useState, useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Authcontext } from "../context/AuthContext";
import "./Model.css"

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { api, user } = useContext(Authcontext);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [formdata, setFormdata] = useState({
    title: "",
    category_id: "",
    brand_id: "",
    price: "",
    quantity: "",
    status: 1,
    description: "",
    image: null,
  });
  const {id} = formdata;
   const [showModal, setShowModal] = useState(false);
   
    const handleOpenModal = (id=null) => {
      if (id) fetchproductbyid(id); 
      setShowModal(true);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setFormdata({
        id: "",
      })
      setShowModal(false);
    };
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };
  console.log(formdata.id);
  
  const updateproduct = async (e) => {
    e.preventDefault(); // Add this to prevent form submission default behavior
    try {
      const formData = new FormData();
      formData.append("title", formdata.title);
      formData.append("category_id", formdata.category_id);
      formData.append("brand_id", formdata.brand_id);
      formData.append("price", formdata.price);
      formData.append("quantity", formdata.quantity);
      formData.append("status", formdata.status);
      formData.append("description", formdata.description);
      formData.append("_method", "PUT");
      if (formdata.image) {
        formData.append("image", formdata.image);
      } else {
        formData.append("old_image", formdata.old_image);
      }

      const response = await fetch(`${api}product/${formdata.id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: formData,
      });
      const json = await response.json();

      if (json.status === 200) {
          
          handleOpenModal();

      } else if (json.status === 400) {
        console.error("Validation Errors:", json.errors);
      } else {
        console.error("Error:", json.message);
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const addproduct = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formdata.title || !formdata.category_id || !formdata.brand_id || !formdata.price || !formdata.quantity) {
      console.error("Please fill all required fields");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", formdata.title);
    formData.append("category_id", formdata.category_id);
    formData.append("brand_id", formdata.brand_id);
    formData.append("price", formdata.price);
    formData.append("quantity", formdata.quantity);
    formData.append("status", formdata.status);
    formData.append("description", formdata.description);
  
    if (formdata.image) {
      formData.append("image", formdata.image);
    }
  
    try {
      const response = await fetch(`${api}product`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Log the full response
  
      if (data.status === 201) {
        setFormdata({
          title: "",
          category_id: "",
          brand_id: "",
          price: "",
          quantity: "",
          status: 1,
          description: "",
          image: null,
          old_image: null,
        });
        fetchproduct();
        handleCloseModal(); // Close the modal after successful creation
      } else {
        console.error("Error creating product:", data.message || "Unknown error");
        if (data.errors) {
          console.error("Validation errors:", data.errors);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

    const deleteproduct = async (id)=>{
      try {
      const respone =  await fetch(`${api}product/${id}`,{

          method:'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
             "Authorization": `Bearer ${user.token}`
          }
        })
        const data = await respone.json()
        if(data.status === 200){
          fetchproduct()

        }
      } catch (error) {
        console.error("Error adding product", error);

      }
    }

  const fetchcategory = async () => {
    const response = await fetch(`${api}category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setCategory(data.category);
    }
    if (data.status === 204) {
      navigate("/admin/login");
    }
  };
  const fetchbrand = async () => {
    const response = await fetch(`${api}brand`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setBrand(data.brand);
    }
  };

  const fetchproduct = async () => {
    const response = await fetch(`${api}product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    console.log(data);

    if (data.status === 200) {
      setProducts(data.products);
      console.log(products);
    }
  };

  const fetchproductbyid = async (id) => {
    const response = await fetch(`${api}product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setFormdata({
        id: data.product.id,
        title: data.product.title,
        category_id: data.product.category_id,
        brand_id: data.product.brand_id,
        price: data.product.price,
        quantity: data.product.quantity,
        status: data.product.status,
        description: data.product.description,
        old_image: data.product.image,
      });
    }
  };
  // useEffect(() => {
  //   fetchproductbyid()
  // }, );
  useEffect(() => {
    fetchproduct();
    fetchcategory();
    fetchbrand();
  }, []);
  return (
    <>
    <div className="container">
      <div className="page-inner">
        <div className="page-header">
          <h3 className="fw-bold mb-3">Product</h3>
          <ul className="breadcrumbs mb-3">
            <li className="nav-home">
              <a href="./index.php">
                <i className="icon-home" />
              </a>
            </li>
            <li className="separator">
              <i className="icon-arrow-right" />
            </li>
            <li className="nav-item">
              <a href="#">Product</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
                <div>
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Product
                    </h4>
                    <button
                      onClick={ handleOpenModal}
                      className="btn btn-primary"
                    >
                      New
                    </button>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>CategoryID</th>
                          <th>BrandID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.category_id}</td>
                            <td>{item.brand_id}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                              <img src={item.image_url} alt="" width={60} />
                            </td>

                            {item.status == 1 ? (
                              <td className="text-success">Enable</td>
                            ) : (
                              <td className="text-danger">Disable</td>
                            )}
                              <td>
                         <button className="btn btn-success" onClick={()=>{fetchproductbyid(item.id); handleOpenModal()}}>Edit</button>  
                        <button className="btn btn-danger" onClick={()=> deleteproduct(item.id)}>Delete</button> 
                      </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
             
               
              
            </div>
          </div>
        </div>
      </div>
    </div>
    {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h5 className="modal-title">{formdata.id ? "update" : "add product"}</h5>
      <button className="close-button" onClick={handleCloseModal}>
        &times;
      </button>

      <form className="text-dark text-start mt-3" onSubmit={formdata.id ? updateproduct : addproduct}>
      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Product Title</label>
            <input type="text" className="form-control text-dark" id="title" value={formdata.title} onChange={handlechange} />
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select className="form-control text-dark" id="category_id" value={formdata.category_id} onChange={handlechange}>
              <option value="">Select Category</option>
              {category.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="brand_id">Brand</label>
            <select className="form-control text-dark" id="brand_id" value={formdata.brand_id} onChange={handlechange}>
              <option value="">Select Brand</option>
              {brand.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control text-dark" id="price" value={formdata.price} onChange={handlechange} />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="text" className="form-control text-dark" id="quantity" value={formdata.quantity} onChange={handlechange} />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select className="form-control text-dark" id="status" onChange={handlechange} value={formdata.status}>
              <option value="">Select Status</option>
              <option value="1">Enable</option>
              <option value="0">Disable</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control text-dark" id="image" onChange={handleImageChange} />
            {formdata.old_image && (
              <div className="mt-2">
                <p>Current Image:</p>
                <img src={`http://localhost:8000/uploads/${formdata.old_image}`} alt="Current Product" width="100" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Width Fields */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control text-dark" id="description" value={formdata.description} onChange={handlechange} />
      </div>

      <button type="submit" className="btn btn-primary mt-3 d-block ">
        {formdata.id? "Update Product" : "Add Product"}
      </button>
    </form>
    </div>
  </div>
)}


  
    </>

  );
};

  

export default Products;
