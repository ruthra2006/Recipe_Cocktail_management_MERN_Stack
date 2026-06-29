import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Home from "./Pages/Home";
import { BrowserRouter, Route , Routes } from "react-router-dom";
import "./App.css"
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {

 
  return (
    
    <BrowserRouter>
    
   <Routes>

    <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
          <Route path="/product/:id" element={<Product/>}/>
    

   </Routes>


    </BrowserRouter>
 
  );
}


export default App;