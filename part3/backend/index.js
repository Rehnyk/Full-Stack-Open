require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person.js')


morgan.token('postData', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    }

    if (error.name === 'ValidationError') {
        return response.status(403).send({ error: error.message });
    }


    next(error);
};

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :postData'));
app.use(express.static('dist'));


app.get('/info', (request, response) => {
    Person.count().then(count => {
        response.send(
            `<p>Phonebook has info for ${count} people</p>
              <p>${new Date()}</p>`);
    });
});

// Show all people
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    });
});

// Show single person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    })
        .catch(error => next(error))
});

// Delete a person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
});

// Add a new person
app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    const person = new Person ({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

        .catch(error => next(error))
});

// Change number of a person
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.status(400).json({ error: error.message });
            } else {
                next(error);
            }
        });
})

app.use(unknownEndpoint);
app.use(errorHandler);


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});