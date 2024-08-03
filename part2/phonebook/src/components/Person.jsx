import Button from "./Button";
import agendaService from '../services/Persons';

const Person = ({ id, name, number, onDelete }) => {

  const handleDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      agendaService
        .deleteData(id)
        .then(() => {
          onDelete(id);
        })
        .catch(error => {
          alert(`Failed to delete ${name}. Error: ${error}`);
        });
    }
  };

  return (   
    <div>
      <p>{name} {number}</p> 
      <Button onClick={handleDelete} text='delete'/>
    </div>
  );
};

export default Person;
