import React from 'react';
import logo from './logo.svg';
import Home from "./Home";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home/*" element={<Home />} />
          <Route path="/Search/*" element={<Search />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App;
