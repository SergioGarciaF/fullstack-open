import { useEffect, useState } from 'react';
import agendaService from './services/Persons';
import Filter from './components/Filter';
import Form from './components/Form';
import Agenda from './components/Agenda';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [addMessage, setAddMessage] = useState(null)

  useEffect(() => {
    agendaService
      .getData()
      .then(response => setPersons(response));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updateNumber = window.prompt('Enter the new number', existingPerson.number);
        if (updateNumber) {
          const updatedPerson = { ...existingPerson, number: updateNumber };
          agendaService
            .update(existingPerson.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : response));
              setAddMessage(`Number of ${newName} changed`)
              setTimeout(() => {
                setAddMessage(null)
              }, 5000);
            })
            .catch(error => {
              alert(`Failed to update ${existingPerson.name}. Error: ${error}`);
            });
        }
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      agendaService
        .create(personObject)
        .then(response => setPersons(persons.concat(response)),
          setAddMessage(`Added ${newName}`),
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        );
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
    agendaService
      .deleteData(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
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
      <Agenda persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
