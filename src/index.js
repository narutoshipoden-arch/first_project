import express from 'express'
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let tasks = [
  { id: 1, title: "Learn CRUD", completed: false }
];

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (task) {
    task.title = req.body.title || task.title;
    task.completed = req.body.completed ?? task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})