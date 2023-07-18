import React from "react";
import Root from "./components/Root";
import { createRoot } from "react-dom/client";
import "./index.css";
// Rendering code here

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<Root />);
