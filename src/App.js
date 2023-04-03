import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListing from "./components/ProductListing";
import Header from "./components/Header";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import ProductPage from "./components/ProductListing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
<Routes>
  
  <Route path="/" element={<ProductListing/>}/>
  <Route path="/product/:productId" element={<ProductDetails/>} />
  <Route>404 Not Found!</Route>

</Routes>
</BrowserRouter>
      
    </div>
  );
}

export default App;
