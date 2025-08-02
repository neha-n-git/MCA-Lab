import React from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Form from './components/Form.jsx'
import About from './components/About.jsx'

export default function App(){
    return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="form" element={<Form />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}


