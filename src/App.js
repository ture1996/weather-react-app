import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Main} from "./pages/layouts/Main";
import { DailyForecast } from "./pages/details/DailyForecast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dailyForecast/:date" element={<DailyForecast/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
