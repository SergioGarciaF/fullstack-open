const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/api/info', (request, response) => {
    const length = persons.length;
    const date = new Date();
    const htmlResponse = `
        <p>Phonebook has info of ${length} persons.</p>
        <p>${date}</p>
    `;
    response.send(htmlResponse).end();
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id);
 
    if(person){
        response.send(`<div><p>${person.name}</p><p>${person.number}</p></div>`)
    } else {
        response.status(400).send('<p>Server status 400 bad request, try with other id.</p>').end()
    }
})



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
    const searchName = persons.find(person => person.name === body.name);

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number is missing' 
        });
    }

    if(searchName){
        return response.status(400).json({ 
            error: 'name already exists.' 
        });
    }
    

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(body.id)
    };

    persons = persons.concat(person);

    response.json(person);
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)