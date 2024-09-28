import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//導入DateTimePicker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// 引入 isSameOrAfter 插件；因為dayjs 目前不支援 isSameOrAfter 函數
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [dateFilter, setDateFilter] = useState(dayjs()); //透過dayjs()初始化dateFilter為當前日期；動態更新dateFilter

  const handleAddTodo = () => {
    if (input.trim()) {
      const newTodo = {
        task: input,
        date: dayjs(), //目前日期作為待辦事項的日期
      }

      if (editIndex !== null) {
        // 編輯待辦事項
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo; // 更新對應的待辦事項
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // 新增待辦事項
        setTodos([...todos, newTodo]); // 將新待辦事項對象添加到陣列
        console.log(newTodo); //檢查新待辦事項是否正確設置
      }
      setInput("");
    }
  };

  const handleEditTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  //篩選日期晚於/等於dateFilter的待辦事項，並儲存在filteredTodos陣列中
  const filteredTodos = todos.filter((todo) =>
    dayjs(todo.date).isSameOrAfter(dateFilter)
  );

  // 在渲染之前打印 filteredTodos
  console.log("Filtered Todos:", filteredTodos);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <TextField
          label="New Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAddTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </Button>

        {/* DateTimePicker 作為過濾條件 */}
        <DateTimePicker
          label="Filter by Date"
          value={dateFilter}
          onChange={(newValue) => setDateFilter(newValue)}
          slots={{ textField: TextField }} // 替換 renderInput
        />

        <List>
          {filteredTodos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={todo.task} // 顯示待辦事項
                secondary={
                  todo.date
                    ? dayjs(todo.date).format("YYYY-MM-DD HH:mm")
                    : "No date available"
                } //顯示日期，設定3元條件式防止 todo.date 為 undefined 時導致的 TypeError 錯誤。
              />
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
    </LocalizationProvider>
  );
}

export default ToDoList;
