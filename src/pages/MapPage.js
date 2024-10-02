// src/pages/MapPage.js
import React, { useState } from "react";
import { Typography } from "@mui/material";
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

// 設定默認標記圖示
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapPage = () => {
  // 標記的位置
  const initialPosition = [51.505, -0.09]; // 例如倫敦的座標
  const [markers, setMarkers] = useState([]);

  // 自定義地圖點擊事件
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        // 每次點擊地圖時，根據點擊的經緯度，新增一個標記
        const newMarker = [e.latlng.lat, e.latlng.lng];
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      },
    });
    return null;
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        點擊地圖以添加標記
      </Typography>
      <MapContainer
        center={initialPosition}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 自定義的地圖點擊事件處理 */}
        <MapClickHandler />

        {/* 渲染已添加的標記 */}
        {markers.map((position, index) => (
          <Marker key={index} position={position}>
            <Popup>
              標記於: {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapPage;
