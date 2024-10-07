// src/context/MarkerContext.js
import React, { createContext, useState } from "react";

export const MarkerContext = createContext();

export const MarkerProvider = ({ children }) => {
  const [markers, setMarkers] = useState([
    {
      position: [22.996971351128252, 120.21404817885606],
      address: "世界健身俱樂部 台南Focus店",
      type: "default",
    },
    {
      position: [23.008515760635625, 120.21164015984951],
      address: "世界健身俱樂部 台南西門店",
      type: "default",
    },
    {
      position: [23.017525035441636, 120.22907661465433],
      address: "世界健身俱樂部 台南永康店",
      type: "default",
    },
    {
      position: [22.98441046331041, 120.21840223954375],
      address: "世界健身俱樂部 台南長榮店",
      type: "default",
    },
    {
      position: [22.98996278152292, 120.1882595410002],
      address: "臺南市永華國民運動中心",
      type: "default",
    },
  ]); // 初始標記

  const addMarker = (newMarker) => {
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };



  return (
    <MarkerContext.Provider value={{ markers, addMarker }}>
      {children}
    </MarkerContext.Provider>
  );
};