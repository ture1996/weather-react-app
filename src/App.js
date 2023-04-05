import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/components/Main";
import { DailyForecast } from "./pages/details/DailyForecast";
import { AddCity } from "./pages/components/AddCity";
import { NavBar } from "./pages/layouts/NavBar";

function App() {
  return (
    <NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dailyForecast/:date" element={<DailyForecast />} />
          <Route path="/addCity" element={<AddCity />} />
        </Routes>
      </BrowserRouter>
    </NavBar>
  );
}

export default App;
