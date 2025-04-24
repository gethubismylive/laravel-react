import { useState, useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Authcontext } from "../context/AuthContext";
import "./Model.css"


const Brand = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { api, user } = useContext(Authcontext);
  const [brand, setbrand] = useState([]);
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

  const addbrand = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${api}brand`, {
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
      fetchbrand();
    }


  }

  const fetchbrand = async () => {
    const response = await fetch(`${api}brand`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setbrand(data.brand);
    }
    if (data.status === 204) {
      navigate("/admin/login");
    }
  };
 const updatebrand = async (e) => {
    e.preventDefault();
    const response = await fetch(`${api}brand/${formdata.id}`, {
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
      
      fetchbrand();
    }
  };
  
  const fetchbrandbyid = async (id)=>{
    const response = await fetch(`${api}brand/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      // setbrand(data.brand);
      setFormdata({
        id : data.brand.id,
        name: data.brand.name,
        status: data.brand.status,
      })
    }
    if (data.status === 204) {
      navigate("/admin/login");
    }
  }
  const deletebrand = async(id)=>{
    const response = await fetch(`${api}brand/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      fetchbrand();
    }

  }

  useEffect(()=>{
       fetchbrand();
       fetchbrandbyid()
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
                      brand
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
                        {brand.map((item)=>(
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            {item.status == 1 ? (
                              <td className="text-success">Enable</td>
                            ) : (
                              <td className="text-danger">Disable</td>
                            )}
                            <td>
                         <button className="btn btn-success" onClick={()=>{fetchbrandbyid(item.id); handleOpenModal()}}>Edit</button>  
                        <button className="btn btn-danger" onClick={()=> deletebrand(item.id)}>Delete</button> 
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
      <h5 className="modal-title">{formdata.id ? "update" : "add brand"}</h5>
      <button className="close-button" onClick={handleCloseModal}>
        &times;
      </button>
            <form onSubmit={formdata.id ? updatebrand :addbrand}>
              <div className="form-group">
                <label htmlFor="brandName">brand Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formdata.name}
                  onChange={handlechange}
                  placeholder="Enter brand name"
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
                {formdata.id? "Update brand" : "Add brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};



export default Brand;