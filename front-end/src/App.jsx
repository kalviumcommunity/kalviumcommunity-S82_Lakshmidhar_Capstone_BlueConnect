import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workers from './pages/Workers';
import WorkerDetails from './pages/WorkerDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkerSignup from './pages/WorkerSignup';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/workers/:id" element={<WorkerDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/worker" element={<WorkerSignup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
