import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Add from "./components/Add";
import Edit from "./components/Edit";
import ShowDetail from "./components/show/ShowDetail";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer autoClose={2000}/>
      <Routes>
        <Route path="/" element={<ShowDetail/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
