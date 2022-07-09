import { Navigate } from "react-router-dom";
import { UserDataType } from "../types/UserDataType";
import Authorize from "../molecules/Authorize";


export default function Dashboard({ getUserData }: { getUserData: UserDataType }) {
  return (
    <>
      {getUserData.isLoggedIn ? <Authorize getUserData={getUserData} /> : <Navigate to="/" replace />}
    </>
  );
}