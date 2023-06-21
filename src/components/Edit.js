import React, { useState,useEffect } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";


const Edit = ({ contactId, onCloseForm, fetchContacts })=> {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
 
  useEffect(() => {
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  const fetchContact = () => {
    axios
      .get(`http://localhost:3001/contacts/${contactId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:3001/contacts/${contactId}`, formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Contact updated successfully");
        setFormData({ name: "", email: "", mobile: "", address: "" });
        fetchContacts();
        onCloseForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormReset = () => {
    setFormData({ name: "", email: "", mobile: "", address: "" });
  };

  return (
    <div className="card">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Add Contact</h3>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onCloseForm}
        ></button>
      </div>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary me-4">
            Update
          </button>
          <button
            type="button"
            onClick={handleFormReset}
            className="btn btn-dark"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
