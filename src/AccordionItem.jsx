import React, { useState } from 'react';
import EditUserModal from './EditUserModal';
import './AccordionItem.css';

const AccordionItem = ({ celebrity, handleEdit, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const saveUser = (updatedUser) => {
    handleEdit(updatedUser);
    setIsEditModalOpen(false);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={toggleAccordion}>
        {celebrity.first} {celebrity.last}
      </div>
      {isOpen && (
        <div className="accordion-content">
          <img src={celebrity.picture} alt="Celebrity" />
          <div>Gender: {celebrity.gender}</div>
          <div>Country: {celebrity.country}</div>
          <div>Description: {celebrity.description}</div>
          <div>E-mail: {celebrity.email}</div>
          <div className="accordion-actions">
            <button onClick={() => toggleEditModal(celebrity)}>Edit</button>
            <button onClick={() => handleDelete(celebrity)}>Delete</button>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onSave={saveUser}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AccordionItem;
