import { Navigate } from "react-router-dom";
import { UserDataType } from "../types/UserDataType";
import Authorize from "../molecules/Authorize";


export default function Dashboard({ getUserData }: { getUserData: UserDataType }) {
  let userData = JSON.parse(localStorage.getItem("datauser") || '{}');
  if (!userData.isLoggedIn) localStorage.setItem("datauser", JSON.stringify(getUserData))
  userData = JSON.parse(localStorage.getItem("datauser") || '{}');

  getUserData = userData;

  return (
    <>
      {getUserData.isLoggedIn || userData.isLoggedIn ? <Authorize getUserData={getUserData} /> : <Navigate to="/" replace />}
    </>
  );
}