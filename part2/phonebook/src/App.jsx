import { useEffect, useState } from 'react';
import agendaService from './services/Persons';
import Filter from './components/Filter';
import Form from './components/Form';
import Agenda from './components/Agenda';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  useEffect(() => {
    agendaService
      .getData()
      .then(response => setPersons(response));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      agendaService
        .create(personObject)
        .then(response => setPersons(persons.concat(response)));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setNewSearch(e.target.value);
  };

  const handleDeletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearch} />
      <h2>Add a new</h2>
      <Form 
        onSubmit={addName} 
        name={newName} 
        onChangeName={handleNewName} 
        number={newNumber} 
        onChangeNumber={handleNewNumber} 
      />
      <h2>Numbers</h2>
      <Agenda persons={filteredPersons} onDelete={handleDeletePerson}/>
    </div>
  );
};

export default App;
