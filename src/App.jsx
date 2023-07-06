import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AccordionList from './AccordionList';
import ConfirmDialog from './ConfirmDialog';
import './App.css';

const App = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [filteredCelebrities, setFilteredCelebrities] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

 

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const response = await fetch('/src/celebrities.json');
        const celebritiesData = await response.json();
  
        console.log('Celebrities Data:', celebritiesData);
  
        setCelebrities(celebritiesData);
        setFilteredCelebrities(celebritiesData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCelebrities();
  }, []);
  const handleSearch = (event) => {
    const searchText = event.target.value.trim();
    if (searchText !== '') {
      const filteredCelebrities = celebrities.filter(
        (celebrity) =>
          celebrity.first?.toLowerCase().includes(searchText.toLowerCase()) ||
          celebrity.last?.toLowerCase().includes(searchText.toLowerCase())
      );
      const sortedCelebrities = filteredCelebrities.sort((a, b) =>
      a.first.localeCompare(b.first)
    );
      setFilteredCelebrities(sortedCelebrities);
    } else {
      setFilteredCelebrities(celebrities);
    }
  };
  
  const handleAccordionClick = (userId) => {
    setFilteredCelebrities((prevFilteredCelebrities) =>
      prevFilteredCelebrities.map((celebrity) => ({
        ...celebrity,
        open: celebrity.id === userId ? !celebrity.open : false,
      }))
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
    // You can also update the filteredCelebrities list here if needed
    setFilteredCelebrities((prevFilteredCelebrities) => {
      return prevFilteredCelebrities.map((celebrity) =>
        celebrity.id === user.id ? { ...celebrity, ...user } : celebrity
      );
    });
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const updatedCelebrities = celebrities.filter(
      (user) => user.id !== selectedUser.id
    );
    setCelebrities(updatedCelebrities);
    setFilteredCelebrities(updatedCelebrities);
    setIsDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };



  return (
    <div className="app">
      <h1>Celebrities</h1>
      <SearchBar handleSearch={handleSearch}  style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
      <br></br>
      <AccordionList
        celebrities={filteredCelebrities}
        handleAccordionClick={handleAccordionClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {isDeleteConfirmationOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      
    </div>
  );
};

export default App;
