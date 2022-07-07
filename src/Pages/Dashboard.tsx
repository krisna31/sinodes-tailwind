import { Navigate } from "react-router-dom";

type UserDataInterface = {
  isLoggedIn: boolean;
};

export default function Dashboard({ getUserData }: { getUserData: UserDataInterface }) {
  return (
    <>
      {/* if (!getUserData) <Navigate to="/" replace />; else <Authorize /> */}
      {getUserData ? <Authorize /> : <Navigate to="/" replace />}
    </>
  );
}

const Authorize = () => {
  return (
    <div className="container min-w-full bg-slate-200 dark:bg-slate-400 flex-1 justify-center items-start flex flex-col relative">
      <div className="container my-4 min-h-full flex-1 bg-slate-100 dark:bg-slate-300 min-w-full">
        <h1 className="text-center bg-gradient-to-t from-slate-500 to-slate-800 text-transparent bg-clip-text text-3xl font-extrabold mt-2 mb-4">Simple Notes</h1>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <span className="fixed rounded-full  right-5 bottom-6 bg-slate-400 text-4xl p-5 h-auto w-auto cursor-pointer shadow-md hover:shadow-2xl">+</span>
    </div>
  );
};

const Card = () => {
  return (
    <>
      <div className="bg-slate-400 mx-auto w-1/2 md:w-2/5 p-3 rounded-lg text-center text-sm mb-3">
        <h2 className="mb-2 text-lg bg-gradient-to-b from-slate-900 to-slate-600 text-transparent bg-clip-text font-extrabold md:text-2xl">Lorem Judul</h2>
        <p className="mb-2 text-sm text-center font-serif md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ullam, odit qui dolorum cupiditate ipsa id, sit esse tenetur aliquam fuga?</p>
        <p className="mt-4 font-thin md:text-lg">Created At 1 January 1970</p>
        <div className="flex justify-center mt-3">
          <button type="submit" className="bg-slate-200 mx-3 rounded-xl py-1 px-2 font-serif hover:bg-slate-500 hover:text-white dark:bg-slate-300 md:text-md">
            Update
          </button>
          <button type="submit" className="bg-slate-200 mx-3 rounded-xl py-1 px-2 font-serif hover:bg-red-700 hover:text-white dark:bg-slate-300 md:text-md">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
