const express = require('express')
const app = express()

const persons = [
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

app.get('/api/agenda/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/agenda/info', (request, response) => {
    const length = persons.length;
    const date = new Date();
    const htmlResponse = `
        <p>Phonebook has info of ${length} persons.</p>
        <p>${date}</p>
    `;
    response.send(htmlResponse).end();
});

app.get('/api/agenda/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id);

    if(person){
        response.send(`<div><p>${person.name}</p><p>${person.number}</p></div>`)
    } else {
        response.status(400).send('<p>Server status 400 bad request, try with other id.</p>').end()
    }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)