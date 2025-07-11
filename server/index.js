console.log("🔧 Starting server...");

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// Optional root message
app.get('/', (req, res) => {
  res.send("ToDo API is running!");
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = { id: uuidv4(), ...req.body };
  todos.push(newTodo);
  res.json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  todos = todos.map(todo => (todo.id === id ? { ...todo, ...updated } : todo));
  res.json({ message: 'Todo updated' });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});
