// src/context/MarkerContext.js
import React, { createContext, useState } from "react";

export const MarkerContext = createContext();

export const MarkerProvider = ({ children }) => {
  const [markers, setMarkers] = useState([
    {
      position: [22.996971351128252, 120.21404817885606],
      address: "世界健身俱樂部台南Focus店",
      type: "gym",
    },
    {
      position: [23.008515760635625, 120.21164015984951],
      address: "世界健身俱樂部台南西門店",
      type: "gym",
    },
    {
      position: [23.017525035441636, 120.22907661465433],
      address: "世界健身俱樂部台南永康店",
      type: "gym",
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