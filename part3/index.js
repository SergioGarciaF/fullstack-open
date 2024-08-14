const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(data => response.json(data))
});

app.get('/api/info', (request, response) => {
    const length = persons.length;
    const date = new Date();
    const htmlResponse = `
        <p>Phonebook has info of ${length} persons.</p>
        <p>${date}</p>
    `;
    response.send(htmlResponse);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.send(`<div><p>${person.name}</p><p>${person.number}</p></div>`);
    } else {
        response.status(404).send('<p>Person not found</p>');
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);

    const personIndex = persons.findIndex(person => person.id === id);

    if (personIndex !== -1) {
        persons = persons.filter(person => person.id !== id);
        response.status(204).end();
    } else {
        response.status(404).json({ error: 'Person not found' });
    }
});

const generateId = () => {
    return Math.floor(Math.random() * 1000000000);
};

app.post('/api/persons', (request, response) => {
    const body = request.body;
  
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        });
    }
  
    const person = new Person({
        name: body.name,
        number: body.number
    });

    
    person.save()
        .then(savedPerson => response.json(savedPerson))
        
});


const PORT = process.env.PORT || 3001;
console.log(`PORT: ${PORT}`);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
