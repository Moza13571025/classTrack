import React, { useContext, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom"; // 導入 Link 組件
//導入DateTimePicker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { MarkerContext } from "../context/MarkerContext";

// 引入 isSameOrAfter 插件；因為dayjs 目前不支援 isSameOrAfter 函數
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

function ToDoList() {
  const [todos, setTodos] = useState([]);
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
  const { addMarker } = useContext(MarkerContext); // 使用 addMarker 函數
  const [address, setAddress] = useState(""); // 儲存用戶輸入的地址
  const { markers, getMarkerAddresses } = useContext(MarkerContext);
  const markerLocations = getMarkerAddresses(); //獲取標記地址
  const [errorMessage, setErrorMessage] = useState(null);

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
  const taskOptions = [
    "飛輪有氧",
    "拳擊有氧",
    "空中瑜珈",
    "皮拉提斯",
    "間歇訓練",
  ];

  const handleAddTodo = async () => {
    if (task.trim()) {
      if (editIndex !== null) {
        // 編輯待辦事項
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { task, date, address }; // 更新對應的待辦事項
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // 新增待辦事項
        setTodos([...todos, { task, date, address }]); // 將新待辦事項對象添加到陣列
        console.log(todos); //檢查新待辦事項是否正確設置

        // 將地址轉換為經緯度並新增標記
        try {
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: {
                q: address,
                format: "json",
              },
            }
          );

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const newMarker = {
              position: [parseFloat(lat), parseFloat(lon)],
              address,
            };
            addMarker(newMarker); // 使用context中的 addMarker 函數;
            setErrorMessage(null); // 清除錯誤信息
          } else {
            setErrorMessage("地址未找到，請再試一次。");
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("無法獲取地理位置。");
        }
      }
      setTask(""); // 重置下拉選單
      setDate(dayjs()); // 重置日期
      setAddress(""); // 清除地址輸入欄
      handleCloseDialog(); // 新增或編輯後自動關閉彈跳視窗
    }
  };

  const handleEditTodo = (index) => {
    setTask(todos[index].task); // 只設置待辦事項的文本
    setDate(todos[index].date); // 分別設置日期
    setAddress(todos[index].address);
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
                secondary={`Due:
                  ${
                    todos.date
                      ? dayjs(todos.date).format("YYYY-MM-DD")
                      : "No date available"
                  },
                    address: ${todos.address}
                `} //顯示日期，設定3元條件式防止 todo.date 為 undefined 時導致的 TypeError 錯誤。
              />
              <IconButton onClick={() => handleEditTodo(index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTodo(index)}>
                <DeleteIcon />
              </IconButton>

              {/* 地圖圖示按鈕 */}
              <Link to={`/map`}>
                <IconButton>
                  <MapIcon />
                </IconButton>
              </Link>
            </ListItem>
          ))}
        </List>

        {/* 彈跳視窗 (Dialog) */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {editIndex !== null ? "編輯待辦事項" : "新增待辦事項"}
          </DialogTitle>
          <DialogContent>
            {/* 使用 Autocomplete 來支持下拉選單與自定義輸入 */}
            <Autocomplete
              freeSolo // 支持用戶自行輸入
              options={taskOptions} // 預設選項
              value={task}
              onChange={(event, newValue) => {
                setTask(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setTask(newInputValue); // 更新用戶輸入值
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Task"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            {/* 新增地點輸入欄位 */}
            {/* <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)} // 設置地點
              variant="outlined"
              fullWidth
            /> */}

            {/* 地址輸入框 */}
            <Autocomplete
              freeSolo
              options={[...markerLocations]} // 預設標記地點
              value={address}
              onChange={(event, newValue) => {
                setAddress(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setAddress(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Address"
                  variant="outlined"
                  fullWidth
                />
              )}
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
