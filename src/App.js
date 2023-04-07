import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/components/Main";
import { DailyForecast } from "./pages/components/DailyForecast";
import { AddCity } from "./pages/components/AddCity";
import { NavBar } from "./pages/layouts/NavBar";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Main />} />
          <Route path="/:location/:date" element={<DailyForecast />} />
          <Route path="/addCity" element={<AddCity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
