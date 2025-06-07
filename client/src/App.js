import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import HomePage from './features/HomePage.jsx';
import AlojamientoDetailPage from './features/AlojamientoDetailPage.jsx';
import About from './features/AboutPage.jsx';
import Layout from './features/Layout.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/alojamientos/:id" element={<AlojamientoDetailPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
