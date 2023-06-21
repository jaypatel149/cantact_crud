import React from "react";

const ShowContact = ({ contact, onClose }) => {
  return (
    <div className="card bg-light">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Add Details</h3>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <hr />
      <div>
        <div className="border d-flex justify-content-center align-items-center">
          <div>
            <p>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{contact.name}</p>
            <p>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {contact.email}</p>
            <p>Mobile: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{contact.mobile}</p>
            <p>Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{contact.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowContact;
