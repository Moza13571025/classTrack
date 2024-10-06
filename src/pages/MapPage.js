// src/pages/MapPage.js
import React, { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
//引入Leaflet dependency
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MarkerContext } from "../context/MarkerContext"; // 導入Context

// 設定默認標記圖示 (預設健身房標記)
const gymIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], // 圖示大小
  iconAnchor: [12, 41], // 圖示的錨點
  popupAnchor: [1, -34], // 彈出視窗的錨點
  shadowSize: [41, 41], // 陰影大小
});

// 自定義使用者新增標記圖示 (不同樣式)
const customUserIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon-2x.png"), // 使用不同顏色的圖示
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "my-green-marker",
});

// 用來動態改變地圖中心的元件
const SetMapCenter = ({ position }) => {
  const map = useMap(); // 獲取地圖實例
  useEffect(() => {
    if (position) {
      map.setView(position, 13); // 當獲取到用戶位置時，將地圖中心設置為該位置
    }
  }, [position, map]);

  return null;
};

const MapPage = () => {
  const { markers } = useContext(MarkerContext); // 使用MarkerContext來獲取標記
  const [errorMessage, setErrorMessage] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // 儲存用戶位置
  const [loadingLocation, setLoadingLocation] = useState(true); // 控制地圖加載

  // 獲取用戶當前位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setLoadingLocation(false); // 設置加載完成
        },
        (error) => {
          console.error("Error fetching user's location: ", error);
          setErrorMessage("無法獲取您的位置，請檢查瀏覽器的定位權限設定。");
          setLoadingLocation(false); // 即使發生錯誤也設置加載完成
        }
      );
    } else {
      setErrorMessage("瀏覽器不支援定位功能。");
    }
  }, []);

  // 自動處理用戶提交地址
  // useEffect(() => {
  //   const geocodeAddress = async (address) => {
  //     if (!address) return; // 如果地址為空，則不處理

  //     try {
  //       const response = await axios.get(
  //         "https://nominatim.openstreetmap.org/search",
  //         {
  //           params: {
  //             q: address,
  //             format: "json",
  //           },
  //         }
  //       );

  //       // 確保有返回數據
  //       if (response.data.length > 0) {
  //         const { lat, lon } = response.data[0]; // 提取第一個匹配的地址結果
  //         const newMarker = {
  //           position: [parseFloat(lat), parseFloat(lon)],
  //           address,
  //           type: "custom", // 使用者新增的標記類型
  //         };
  //         setMarkers((prevMarkers) => [...prevMarkers, newMarker]); // 添加新標記
  //         setErrorMessage(null); // 清除錯誤信息
  //       } else {
  //         setErrorMessage("地址未找到，請再試一次。");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setErrorMessage("無法獲取地理位置。");
  //     }
  //   };
  //   geocodeAddress(address); // 觸發地理編碼
  // }, [address]); // 當 address 變化時觸發

  if (loadingLocation) {
    return <Typography>正在獲取您的位置...</Typography>;
  }

  return (
    <>
      {/* 顯示錯誤信息 */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* 地圖容器 */}
      <MapContainer
        center={userLocation || [22.9999, 120.227]} //預設中心為台南，或顯示用戶當前位置
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 設置地圖中心為用戶的位置 */}
        {userLocation && <SetMapCenter position={userLocation} />}
        {/* 如果用戶位置可用，顯示當前位置的標記 */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>您的位置</Popup>
          </Marker>
        )}

        {/* 將標記渲染到地圖上，根據標記類型使用不同的圖示 */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={marker.type === "gym" ? gymIcon : customUserIcon} // 根據類型設置圖標
          >
            <Popup>{marker.address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapPage;
