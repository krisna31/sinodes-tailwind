import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";

type UserDataType = {
  isLoggedIn: boolean;
  uid: string;
  email: string;
  isVerified: boolean;
  isAnonymous: boolean;
};

const App = () => {
  const [getUserData, setUserData] = useState<UserDataType>({ isLoggedIn: false, uid: " ", email: " ", isVerified: false, isAnonymous: false });

  console.log(getUserData.isLoggedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home getUserData={getUserData} setUserData={setUserData} />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login getUserData={getUserData} setUserData={setUserData} />} />
          <Route path="register" element={<Register getUserData={getUserData} setUserData={setUserData} />} />
          <Route path="dashboard" element={<Dashboard getUserData={getUserData} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
