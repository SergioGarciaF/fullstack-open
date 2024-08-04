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
  const [addMessage, setAddMessage] = useState(null);
  const [conn, setConn] = useState(null);

  useEffect(() => {
    agendaService
      .getData()
      .then(response => setPersons(response))
      .catch(error => {
        setConn(false)
        setAddMessage(`Failed to fetch data. Error: ${error}`);
        setTimeout(() => {
          setAddMessage(null);
        }, 5000);
      });
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
              setConn(true);
              setAddMessage(`Number of ${newName} changed`);
              setTimeout(() => {
                setAddMessage(null);
              }, 5000);
            })
            .catch(error => {
              setConn(false)
              setAddMessage(`Failed to update ${existingPerson.name}. Error: ${error}`);
              setTimeout(() => {
                setAddMessage(null);
              }, 5000);
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
        .then(response => {
          setPersons(persons.concat(response));
          setConn(true);
          setAddMessage(`Added ${newName}`);
          setTimeout(() => {
            setAddMessage(null);
          }, 5000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setConn(false)
          setAddMessage(`Failed to add ${newName}. Error: ${error}`);
          setTimeout(() => {
            setAddMessage(null);
          }, 5000);
        });
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
    setConn(false);
    setAddMessage('Person eliminated.');
    setTimeout(() => {
      setAddMessage(null);
    }, 5000);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const notificationStyles = {
    background: '#c1c7c3',
    border: conn ? '2px solid green' : '2px solid red',
    borderRadius: '10px',
    color: conn ? 'green' : 'red',
    fontSize: '24px'
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={notificationStyles} message={addMessage} />
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
