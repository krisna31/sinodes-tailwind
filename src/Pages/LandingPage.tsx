import React from "react";

export default function LandingPage() {
  return (
    <div className="container bg-slate-400 flex-1 flex-col justify-center items-center flex min-w-full">
      <h1 className="font-extrabold text-transparent text-3xl bg-clip-text text-center bg-gradient-to-r from-green-800 to-blue-800 mb-3 px-5">Welcome To My Simple Notes Management System</h1>
      <blockquote className="pt-12 px-3 bg-gradient-to-l from-green-800 to-blue-800 text-transparent bg-clip-text font-extrabold text-center">If you have an account you can try login, otherwise you can sign up</blockquote>
    </div>
  );
}
