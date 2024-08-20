import "./App.css";
import { Route, Routes } from "react-router";
import CampaignManagement from "./components/CampaignManagement ";
import LoginPage from "./components/LoginPage";
import AuthcodeManagement from "./components/AuthcodeManagement";
import InfluencerManagement from "./components/InfluencerManagement";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/campaignmanagement" element={<CampaignManagement/>}/>
        <Route path="/authcodemanagement" element={<AuthcodeManagement/>}/>
        <Route path="/influencermanagement" element={<InfluencerManagement/>}/>
      </Routes>
    </>
  );
}

export default App;
