import React, { useEffect, useState } from "react";
import "./ShowDetail.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";
import Add from "../Add";
import ShowContact from "../ShowContact";
import Edit from "../Edit";

const ShowDetail = () => {
  const [contact, setContact] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [editContactId, setEditContactId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false);
  };


  useEffect(() => {
    fetchContacts();
  },[]);
  const fetchContacts = ()=>{
    axios.get("http://localhost:3001/contacts").then((response) => {
      setContact(response.data);
    });
  }

  // delet fuction
  const deleteContact = (id) => {
    axios.delete(`http://localhost:3001/contacts/${id}`).then((response) => {
      if (response.status === 200) {
        setContact((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
        toast.success("Contact deleted successfully");
      }
    });
  };

  // search Contact 
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContacts = contact.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

// view contact show 
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseContact = () => {
    setSelectedContact(null);
  };

  const handleEditContact = (contactId) => {
    setEditContactId(contactId);
    setIsEditOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditOpen(false);
    setEditContactId(null);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="add">
            <span>All Contact</span>
            <IconButton
              style={{ color: "white" }}
              onClick={() => setShowForm(!showForm)}
            >
              <AddCircleOutlineOutlinedIcon style={{ fontSize: "30px" }} />
            </IconButton>
          </div>
          <div className="seach-input">
            <input
              type="text"
              className="form-control"
              placeholder="Search Contact"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="pt-3">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="card-item my-2">
                <div>{contact.id}</div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="me-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Profile"
                      width="40px"
                      height="40px"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h6 className="name">{contact.name}</h6>
                    <h6 className="name">{contact.mobile}</h6>
                  </div>
                </div>
                <div>{contact.number}</div>
                <div>
                  <IconButton onClick={() => handleViewContact(contact)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteContact(contact.id)}>
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                  <IconButton onClick={() => handleEditContact(contact.id)}>
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          {showForm && <Add onCloseForm={handleCloseForm}/>}
          {selectedContact && (
            <ShowContact contact={selectedContact} onClose={handleCloseContact} />
          )}
          {isEditOpen && (
        <Edit
          contactId={editContactId}
          onCloseForm={handleCloseEditForm}
          fetchContacts={fetchContacts}
        />
      )}


        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
