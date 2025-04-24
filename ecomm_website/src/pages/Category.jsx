import { useState, useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Authcontext } from "../context/AuthContext";
import "./Model.css"


const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { api, user } = useContext(Authcontext);
  const [category, setCategory] = useState([]);
  const [formdata, setFormdata] = useState({
    name:"",
    status: 1,
   
  });
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formdata);
  

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addcategory = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${api}category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body:JSON.stringify(formdata)
    });
    const data = await response.json();
    console.log(data);
    
    if (data.status === 201) {
      setFormdata({
        name:"",
        status:"",
      })
      fetchcategory();
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
 const updatecategory = async (e) => {
    e.preventDefault();
    const response = await fetch(`${api}category/${formdata.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formdata),
    });
    const data = await response.json();
    if (data.status === 200) {
      
      fetchcategory();
    }
  };
  
  const fetchcategorybyid = async (id)=>{
    const response = await fetch(`${api}category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      // setCategory(data.category);
      setFormdata({
        id : data.category.id,
        name: data.category.name,
        status: data.category.status,
      })
    }
    if (data.status === 204) {
      navigate("/admin/login");
    }
  }
  const deletecategory = async(id)=>{
    const response = await fetch(`${api}category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      fetchcategory();
    }

  }

  useEffect(()=>{
       fetchcategory();
       fetchcategorybyid()
  },[])

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
                      category
                    </h4>
                    <button
                      className="btn btn-primary"
                      onClick={handleOpenModal}
                    >
                      New
                    </button>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.map((item)=>(
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            {item.status == 1 ? (
                              <td className="text-success">Enable</td>
                            ) : (
                              <td className="text-danger">Disable</td>
                            )}
                            <td>
                         <button className="btn btn-success" onClick={()=>{fetchcategorybyid(item.id); handleOpenModal()}}>Edit</button>  
                        <button className="btn btn-danger" onClick={()=> deletecategory(item.id)}>Delete</button> 
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

      {/* Modal */}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h5 className="modal-title">{formdata.id ? "update" : "add category"}</h5>
      <button className="close-button" onClick={handleCloseModal}>
        &times;
      </button>
            <form onSubmit={formdata.id ? updatecategory :addcategory}>
              <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formdata.name}
                  onChange={handlechange}
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
            <label htmlFor="status">Status</label>
            <select className="form-control text-dark" id="status" name="status" onChange={handlechange} value={formdata.status}>
              <option value="">Select Status</option>
              <option value="1">Enable</option>
              <option value="0">Disable</option>
            </select>
          </div>
              <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary">
                {formdata.id? "Update category" : "Add category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};



export default Category;