import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Dispatch, SetStateAction, useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

type error = {
  isError: boolean;
  message: string;
};

export default function Register({ setUserData }: { setUserData: Dispatch<SetStateAction<boolean>> }) {
  const [getError, setError] = useState<error>({ isError: false, message: "" });
  const [getStringInput, setStringInput] = useState<Inputs>({ email: "", password: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  let navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        setUserData(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = (error.message as string).replace("Firebase:", "").replace("(auth/weak-password).", "");
        setError({ isError: true, message: errorMessage.match("invalid-email") ? "Invalid Email" : errorMessage.match("network-request-failed") ? "Check Your Network Connection" : errorMessage });
        setStringInput({ email: "", password: "" });
      });
  };

  // console.log(watch("nama"));

  return (
    <div className="container px-1 mx-auto flex-1 min-w-full bg-slate-400">
      <div className="flex flex-col text-left md:flex-row justify-evenly md:items-center my-5">
        <div className="w-2/3 lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-slate-50 p-10 flex flex-col w-full shadow-xl rounded-xl dark:bg-slate-300">
            <h2 className="text-2xl font-bold text-gray-800 text-left">Sign Up</h2>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="username" className="text-gray-500 mb-2">
                  Username
                </label>
                <input
                  type="email"
                  id="username"
                  placeholder="Please insert your username"
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  required
                  {...register("email")}
                  value={getStringInput.email}
                  onChange={(e) => setStringInput({ ...getStringInput, email: e.target.value })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="password" className="text-gray-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Please insert your password"
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  required
                  {...register("password")}
                  value={getStringInput.password}
                  onChange={(e) => setStringInput({ ...getStringInput, password: e.target.value })}
                />
                {getError.isError && <span className="text-red-700 text-xs font-bold mt-3">{getError.message}</span>}
                {errors.password && <span>This field is required</span>}
              </div>
              <div id="button" className="flex flex-col w-full">
                <button type="submit" className="w-full py-4 bg-green-600 rounded-lg text-green-100">
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                      </svg>
                    </div>
                    <div className="font-bold">Sign Up</div>
                  </div>
                </button>
                <div className="flex justify-evenly mt-5">
                  <Link to="/login" className="w-full text-center font-medium text-gray-500">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
