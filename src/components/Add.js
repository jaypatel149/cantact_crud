import React from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Add = ({ onCloseForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    axios
      .post("http://localhost:3001/contacts", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Contact added successfully");
        reset(); // Reset the form after successful submission
        onCloseForm();
      })
      .catch((error) => {
        console.log(error);
      });
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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="form-control"
          />
          {errors.name && <span className="text-danger">Name is required</span>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Enter your email"
            className="form-control"
          />
          {errors.email && (
            <span className="text-danger">
              Please enter a valid email address
            </span>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            {...register('mobile', { 
              required: true, 
              pattern: /^\d{10}$/ 
            })}        
            placeholder="Enter your mobile number"
            className="form-control"
          />
          {errors.mobile && (
            <span className="text-danger">Please enter a valid 10-digit mobile number</span>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            {...register("address", { required: true })}
            placeholder="Enter your address"
            className="form-control"
          ></textarea>
          {errors.address && (
            <span className="text-danger">Address is required</span>
          )}
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary me-4">
            Submit
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-dark"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
