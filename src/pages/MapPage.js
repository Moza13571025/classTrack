// src/pages/MapPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // 用來獲取 URL 中的參數
import { Typography, TextField, Button } from "@mui/material";
//引入Leaflet dependency
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// 設定默認標記圖示
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapPage = () => {
  const [markers, setMarkers] = useState([
    {
      position: [22.996971351128252, 120.21404817885606],
      address: "世界健身俱樂部台南Focus店",
    },
    {
      position: [23.008515760635625, 120.21164015984951],
      address: "世界健身俱樂部台南西門店",
    },
    {
      position: [23.017525035441636, 120.22907661465433], // 健身房3的位置
      address: "世界健身俱樂部台南永康店",
    },
  ]); // 預設多個健身房標記
  const [address, setAddress] = useState(""); // 儲存用戶輸入的地址
  const [errorMessage, setErrorMessage] = useState(null);
  // const { location } = useParams(); // 獲取URL中的地點參數;
  // const position = location.split(",").map(Number); // 解析成經緯度數組

  // 處理用戶提交地址
  const handleGeocode = async () => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address, // 用戶輸入的地址
            format: "json", // 返回 JSON 格式的數據
          },
        }
      );

      // 確保有返回數據
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0]; // 提取第一個匹配的地址結果
        const newMarker = {
          position: [parseFloat(lat), parseFloat(lon)],
          address,
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]); // 添加新標記
        setErrorMessage(null); // 清除錯誤信息
      } else {
        setErrorMessage("地址未找到，請再試一次。");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("無法獲取地理位置。");
    }
  };

  // 標記的位置
  // const initialPosition = [51.505, -0.09]; // 例如倫敦的座標
  // const [markers, setMarkers] = useState([]);

  // 自定義地圖點擊事件
  // const MapClickHandler = () => {
  //   useMapEvents({
  //     click(e) {
  // 每次點擊地圖時，根據點擊的經緯度，新增一個標記
  //       const newMarker = [e.latlng.lat, e.latlng.lng];
  //       setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  //     },
  //   });
  //   return null;
  // };

  return (
    <>
      {/* <Typography variant="h4" align="center" gutterBottom>
        點擊地圖以添加標記
      </Typography> */}

      {/* 地址輸入框 */}
      <TextField
        label="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Button variant="contained" onClick={handleGeocode}>
        Add Marker
      </Button>

      {/* 顯示錯誤信息 */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* 地圖容器 */}
      <MapContainer
        center={[22.9999, 120.227]}//台南市中心
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 將標記渲染到地圖上 */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapPage;
