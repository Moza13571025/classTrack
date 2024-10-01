import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [date, setDate] = useState(dayjs()); // 新增日期 state
  const [editIndex, setEditIndex] = useState(null);
  const [dateFilter, setDateFilter] = useState(dayjs()); //透過dayjs()初始化dateFilter為當前日期；動態更新dateFilter
  const [openDialog, setOpenDialog] = useState(false); // 控制彈跳視窗開關
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // 控制刪除彈跳視窗
  const [deleteIndex, setDeleteIndex] = useState(null); // 記錄要刪除的待辦事項索引

  const handleOpenDialog = () => setOpenDialog(true); // 開啟彈跳視窗
  const handleCloseDialog = () => setOpenDialog(false); // 關閉彈跳視窗

  const handleOpenDeleteDialog = (index) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleAddTodo = () => {
    if (input.trim()) {
      // const newTodo = { task: input, date };
      if (editIndex !== null) {
        // 編輯待辦事項
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { task: input, date }; // 更新對應的待辦事項
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // 新增待辦事項
        setTodos([...todos, { task: input, date }]); // 將新待辦事項對象添加到陣列

        console.log(todos); //檢查新待辦事項是否正確設置
      }
      setInput("");
      setDate(dayjs()); // 重置日期
      handleCloseDialog(); // 新增或編輯後自動關閉彈跳視窗
    }
  };

  const handleEditTodo = (index) => {
    setInput(todos[index].task); // 只設置待辦事項的文本
    setDate(todos[index].date); // 分別設置日期
    setEditIndex(index);
    handleOpenDialog(); // 編輯時打開彈跳視窗
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    handleCloseDeleteDialog(); // 刪除確認後關閉彈跳視窗
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
        {/* 新增待辦事項按鈕，點擊打開彈跳視窗 */}
        <Button variant="contained" onClick={handleOpenDialog}>
          Add Todo
        </Button>

        {/* 日期篩選 DateTimePicker */}
        <DateTimePicker
          label="Filter by Date"
          value={dateFilter}
          onChange={(newValue) => setDateFilter(newValue)}
          slots={{ textField: TextField }}
        />

        {/* <TextField
          label="New Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAddTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </Button> */}

        <List>
          {filteredTodos.map((todos, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={todos.task} // 顯示待辦事項（字串）
                secondary={
                  todos.date
                    ? dayjs(todos.date).format("YYYY-MM-DD")
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

        {/* 彈跳視窗 (Dialog) */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {editIndex !== null ? "Edit Todo" : "New Todo"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <DateTimePicker
              label="Due Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              fullWidth
              slots={{ textField: TextField }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddTodo}>
              {editIndex !== null ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 刪除確認彈跳視窗 */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this todo?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={handleDeleteTodo}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}

export default ToDoList;
