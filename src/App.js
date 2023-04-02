import React, { useEffect, useState } from "react";
import ApplicationsView from "./components/ApplicationsView";
import CommunityView from "./components/CommunityView";
import LoginView from "./components/LoginView";
import SignUpView from "./components/SignUpView";
import ApplicationForm from './components/ApplicationForm';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import LeaderboardView from "./components/LeaderboardView";
import * as DataInterface from './components/DataInterface'
import ProfileView from "./components/ProfileView";
import { Account } from "./components/Account";
import { Status } from "./components/Status";

function App() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(true);
  }
  

  var text = "Burn Out"
  switch (location.pathname) {
    case '/':
      text = "My Applications"
      break;
    case '/community':
      text = "Community"
      break;
    case '/leaderboard':
      text = "Leaderboard"
      break;
    case '/profile':
      text = "Profile"
      break;
    default:
      text = "Burn Out"
      break;
  }


  return (
    <div className="App h-screen bg-beige">
      <Account>
          <Header text={text}/>
          <Status/>

          <Routes>
            <Route path='/' element={<LoginView/>}></Route>
            <Route path='/home' element={<ApplicationsView/>}></Route>
            <Route path="/login" element={<LoginView/>}></Route>
            <Route path='/signup' element={<SignUpView />}></Route>
            <Route path="/community" element={<CommunityView />}></Route>
            <Route path='/leaderboard' element={<LeaderboardView />}></Route>
            <Route path='/profile' element={<ProfileView />}></Route>
            <Route path='/applicationForm' element={<ApplicationForm />}></Route>
          </Routes>
      </Account>
      </div>
  )
}

export default App
