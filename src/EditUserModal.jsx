import React, { useState } from 'react';
import './EditUserModel.css';
const EditUserModal = ({ user, onSave, onCancel }) => {
  const [first, setFirst] = useState(user.first);
  const [last, setLast] = useState(user.last);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      first,
      last,
      email,
    };
    onSave(updatedUser);
    console.log(updatedUser);
  };

  return (
    <div className="Body">
      <h2>Edit User</h2>
      <div >
        <label>First Name:</label>
        <input type="text" value={first} onChange={(e) => setFirst(e.target.value)} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={last} onChange={(e) => setLast(e.target.value)} />
      </div>
     <div>
      <label>Email :</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> 
     </div>
     
      <button onClick={handleSave} className="save-button">Save</button>
      <button onClick={onCancel} className="cancel-button">Cancel</button>
    </div>
  );
};

export default EditUserModal;
