import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dispatch, SetStateAction, useState } from "react";
import { UserDataType } from "../types/UserDataType";
import { Error } from "../types/Error";
import { Inputs } from "../types/Inputs";
import { MyForm } from "../molecules/MyForm";

export default function Login({ getUserData, setUserData }: { getUserData: UserDataType; setUserData: Dispatch<SetStateAction<UserDataType>> }) {
  const [getError, setError] = useState<Error>({ isError: false, message: "" });
  const [getStringInput, setStringInput] = useState<Inputs>({ email: "", password: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  let navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserData({ ...getUserData, isLoggedIn: true, uid: user.uid, email: user.email || "not have email", isVerified: user.emailVerified, isAnonymous: user.isAnonymous });
        navigate("/dashboard");
      })
      .catch((error) => {
        error = error + "";
        if (error.match("auth/user-not-found"))
          setError({ isError: true, message: "User Not Found, You Can Sign Up With Sign Up Button on Top Right Page" });
        else
          setError({ isError: true, message: "Login Failed Check Again Email And Password" });
        setStringInput({ email: "", password: "" });
      });
  };

  return (
    <div className="container px-1 mx-auto flex-1 bg-slate-200 dark:bg-slate-400 min-w-full">
      <div className="flex flex-col text-left md:flex-row justify-evenly md:items-center my-5">
        <div className="w-2/3 md:w-1/2 lg:w-1/3 mx-auto md:mx-0">
          <div className="bg-slate-50 p-10 flex flex-col w-full shadow-xl rounded-xl dark:bg-slate-300">
            <h2 className="text-2xl font-bold text-gray-800 text-left animate-pulse">Login</h2>
            <MyForm getError={getError}
              getStringInput={getStringInput}
              setStringInput={setStringInput}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              buttonText="Login"
              linkText="Sign Up"
              toLink="/register" />
          </div>
        </div>
      </div>
    </div>
  );
}