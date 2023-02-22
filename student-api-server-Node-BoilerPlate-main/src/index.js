const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
// Helper function to generate unique ids for new records
let nextId = initialData.length + 1;
function generateId() {
  let id = nextId;
  nextId++;
  return id;
}

// GET /api/student
app.get('/api/student', (req, res) => {
  res.status(200).json(initialData);
});

// GET /api/student/:id
app.get('/api/student/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let student = initialData.find((s) => s.id === id);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// POST /api/student
app.post('/api/student', (req, res) => {
  let { name, currentClass, division } = req.body;
  if (name && currentClass && division) {
    let id = generateId();
    let student = { id, name, currentClass, division };
    initialData.push(student);
    res.status(201).json({ id });
  } else {
    res.status(400).send('Incomplete details');
  }
});

// PUT /api/student/:id
app.put('/api/student/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let { name } = req.body;
  let student = initialData.find((s) => s.id === id);
  if (student && name) {
    student.name = name;
    res.status(200).send('Student record updated');
  } else {
    res.status(400).send('Invalid details');
  }
});

// DELETE /api/student/:id
app.delete('/api/student/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let index = initialData.findIndex((s) => s.id === id);
  if (index >= 0) {
    initialData.splice(index, 1);
    res.status(200).send('Student record deleted');
  } else {
    res.status(404).send('Student not found');
  }
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   