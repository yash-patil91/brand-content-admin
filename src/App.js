import "./App.css";
import { Route, Routes } from "react-router";
import CampaignManagement from "./components/CampaignManagement ";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<CampaignManagement/>}/>
      </Routes>
    </>
  );
}

export default App;
