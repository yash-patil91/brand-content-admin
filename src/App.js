import "./App.css";
import { Route, Routes } from "react-router";
import CampaignManagement from "./components/CampaignManagement ";
import LoginPage from "./components/LoginPage";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/campaignmanagement" element={<CampaignManagement/>}/>
      </Routes>
    </>
  );
}

export default App;
