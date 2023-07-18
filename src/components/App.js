import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}
