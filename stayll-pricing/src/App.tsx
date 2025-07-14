import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PricingPage } from "./pages/PricingPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PricingPage />} />
        <Route path="*" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
