import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Certificate from "./pages/Certificate";



const App = () => {

 return (

  <Router>

   <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/certificate" element={<Certificate />} />

   </Routes>

  </Router>

 );

};



export default App;