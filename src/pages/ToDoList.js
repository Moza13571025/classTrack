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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  // const [input, setInput] = useState("");
  const [task, setTask] = useState(""); // 設定 task 為下拉選單的選擇
  const [date, setDate] = useState(dayjs());
  const [editIndex, setEditIndex] = useState(null);
  const [dateFilter, setDateFilter] = useState(dayjs()); //透過dayjs()初始化dateFilter為當前日期；動態更新dateFilter
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 用來存儲臨時選擇的日期
  const [openDialog, setOpenDialog] = useState(false); // 控制彈跳視窗開關
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // 控制刪除彈跳視窗
  const [deleteIndex, setDeleteIndex] = useState(null); // 記錄要刪除的待辦事項索引
  const handleOpenDialog = () => setOpenDialog(true); // 開啟彈跳視窗
  const handleCloseDialog = () => setOpenDialog(false); // 關閉彈跳視窗

  const handleOpenDeleteDialog = (index) => {
    setTask("");
    setDate(dayjs());
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setEditIndex(null);
  };
  // 預設任務選項
  const taskOptions = ["學習", "運動", "購物", "休息"];

  const handleAddTodo = () => {
    if (task.trim()) {
      // const newTodo = { task: input, date };
      if (editIndex !== null) {
        // 編輯待辦事項
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { task, date }; // 更新對應的待辦事項
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // 新增待辦事項
        setTodos([...todos, { task, date }]); // 將新待辦事項對象添加到陣列
        console.log(todos); //檢查新待辦事項是否正確設置
      }
      setTask(""); // 重置下拉選單
      setDate(dayjs()); // 重置日期
      handleCloseDialog(); // 新增或編輯後自動關閉彈跳視窗
    }
  };

  const handleEditTodo = (index) => {
    setTask(todos[index].task); // 只設置待辦事項的文本
    setDate(todos[index].date); // 分別設置日期
    setEditIndex(index);
    handleOpenDialog(); // 編輯時打開彈跳視窗
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    handleCloseDeleteDialog(); // 刪除確認後關閉彈跳視窗
  };

  // 點擊按鈕時才觸發篩選功能，根據 dateFilter 篩選待辦事項
  const handleFilterTodos = () => {
    setDateFilter(selectedDate);
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

        {/* 日期選擇器 DateTimePicker */}
        <DateTimePicker
          label="選擇要篩選的日期"
          value={selectedDate} // 用 selectedDate 儲存選擇的日期
          onChange={(newValue) => setSelectedDate(newValue)} // 只更新選擇的日期，不立即篩選
          slots={{ textField: TextField }}
        />
        <Button variant="contained" onClick={handleFilterTodos}>
          篩選
        </Button>

        {/* <TextField
          label="New Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAddTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </Button> */}

        {/* 篩選後的清單 */}
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
            {editIndex !== null ? "編輯待辦事項" : "新增待辦事項"}
          </DialogTitle>
          <DialogContent>
            {/* 使用下拉選單選擇任務 */}
            <FormControl fullWidth>
              <InputLabel id="task-label">選擇任務</InputLabel>
              <Select
                labelId="task-label"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                fullWidth
              >
                {taskOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
