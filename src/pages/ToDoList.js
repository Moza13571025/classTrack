import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (input.trim()) {
      if (editIndex !== null) {
        // 編輯待辦事項
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = input;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // 新增待辦事項
        setTodos([...todos, input]);
      }
      setInput('');
    }
  };

  const handleEditTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <TextField
        label="New Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleAddTodo}>
        {editIndex !== null ? 'Update' : 'Add'}
      </Button>

      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            <ListItemText primary={todo} />
            <IconButton onClick={() => handleEditTodo(index)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteTodo(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ToDoList;
