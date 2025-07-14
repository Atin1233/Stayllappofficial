import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeaturesPage } from "./pages/FeaturesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeaturesPage />} />
        <Route path="*" element={<FeaturesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
