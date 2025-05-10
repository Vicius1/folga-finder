import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HolidaysPage from "./pages/HolidaysPage";
import UpcomingHolidaysPage from "./pages/UpcomingHolidaysPage";
import LongWeekendsPage from "./pages/LongWeekendsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feriados/:countryCode/:year" element={<HolidaysPage />} />
            <Route path="/proximos/:countryCode" element={<UpcomingHolidaysPage />} />
            <Route path="/feriadoes/:countryCode/:year" element={<LongWeekendsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
