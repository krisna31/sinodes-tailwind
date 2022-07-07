import React from "react";
import { Navigate } from "react-router-dom";

export default function Dashboard({ getUserData }: { getUserData: boolean }) {
  return (
    <>
      {/* if (!getUserData) <Navigate to="/" replace />; else <Authorize /> */}
      {getUserData ? <Authorize /> : <Navigate to="/" replace />}
    </>
  );
}

const Authorize = () => {
  return (
    <div className="container min-w-full bg-slate-400 flex-1 justify-center items-start flex">
      <div className="container my-6">
        <h1 className="text-center">Dashboard</h1>
      </div>
    </div>
  );
};
