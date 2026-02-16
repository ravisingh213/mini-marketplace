import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorDashboard from "./VendorDashboard";
import ProductPage from "./ProductPage";
import PaymentStatus from "./PaymentStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/payment/:id" element={<PaymentStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;