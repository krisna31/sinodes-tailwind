import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Dispatch, SetStateAction, useState } from "react";
import { UserDataType } from "../types/UserDataType";
import { Error } from "../types/Error";
import { Inputs } from "../types/Inputs";
import { MyForm } from "../molecules/MyForm";

export default function Register({ getUserData, setUserData }: { getUserData: UserDataType; setUserData: Dispatch<SetStateAction<UserDataType>> }) {
  const [getError, setError] = useState<Error>({ isError: false, message: "" });
  const [getStringInput, setStringInput] = useState<Inputs>({ email: "", password: "" });
  const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>();

  let navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        setUserData({ ...getUserData, isLoggedIn: true, uid: user.uid, email: user.email || "not have email", isVerified: user.emailVerified, isAnonymous: user.isAnonymous });
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = (error.message as string).replace("Firebase:", "").replace("(auth/weak-password).", "");
        setError({ isError: true, message: errorMessage.match("invalid-email") ? "Invalid Email" : errorMessage.match("network-request-failed") ? "Check Your Network Connection" : errorMessage });
        setStringInput({ email: "", password: "" });
      });
  };

  return (
    <div className="container px-1 mx-auto flex-1 min-w-full bg-slate-200 dark:bg-slate-400">
      <div className="flex flex-col text-left md:flex-row justify-evenly md:items-center my-5">
        <div className="w-2/3 md:w-1/2 lg:w-1/3 mx-auto md:mx-0">
          <div className="bg-slate-50 p-10 flex flex-col w-full shadow-xl rounded-xl dark:bg-slate-300">
            <h2 className="text-2xl font-bold text-gray-800 text-left">Sign Up</h2>
            <MyForm getError={getError}
              getStringInput={getStringInput}
              setStringInput={setStringInput}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              buttonText="Sign Up"
              linkText="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}