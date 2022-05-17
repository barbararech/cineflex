import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../../assets/styles/reset.css'
import '../App/style.css';

import Header from "../Header/Header";
import SelectMovie from "../SelectMovie/SelectMovie";
import SelectShowtime from "../SelectShowtime/SelectShowtime";
import SelectSession from "../SelectSession/SelectSession";
import SuccessScreen from "../SuccessScreen/SuccessScreen";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/" element={<SelectMovie />} />
        <Route path="/filme/id" element={<SelectShowtime />} />
         <Route path="/sessao/id" element={<SelectSession />} />
        <Route path="/sucesso" element={<SuccessScreen />} />  
      </Routes>
    </BrowserRouter>
  );
}
