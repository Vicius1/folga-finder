import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HolidaysPage from "./pages/HolidaysPage";
import UpcomingHolidaysPage from "./pages/UpcomingHolidaysPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feriados/:countryCode/:year" element={<HolidaysPage />} />
        <Route path="/proximos/:countryCode" element={<UpcomingHolidaysPage />} />
      </Routes>
    </Router>
  );
}

export default App;
