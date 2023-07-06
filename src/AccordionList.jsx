import React from 'react';
import AccordionItem from './AccordionItem';



const AccordionList = ({ celebrities, handleEdit, handleDelete }) => {
  return (
    <div>
      {celebrities.map((celebrity) => (
        <AccordionItem
          key={celebrity.id}
          celebrity={celebrity}
          handleEdit={handleEdit} // Updated
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default AccordionList;


