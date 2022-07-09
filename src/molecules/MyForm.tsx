import { DeepRequired, FieldErrorsImpl, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Error } from "../types/Error";
import { Inputs } from "../types/Inputs";

type MyFormType = {
  getError: Error;
  getStringInput: Inputs;
  setStringInput: Dispatch<SetStateAction<Inputs>>;
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  errors: FieldErrorsImpl<DeepRequired<Inputs>>;
  buttonText: string;
  linkText: string;
  toLink: string
}

export const MyForm = ({
  getError,
  getStringInput,
  setStringInput,
  register,
  handleSubmit,
  onSubmit,
  errors,
  buttonText,
  linkText,
  toLink
}: MyFormType) => {
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div id="input" className="flex flex-col w-full my-5">
        <label htmlFor="email" className="text-gray-500 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Please insert your email"
          className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
          required
          {...register("email")}
          value={getStringInput.email}
          onChange={(e) => setStringInput({ ...getStringInput, email: e.target.value })}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault(); }}
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
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault(); }}
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
            <div className="font-bold">{buttonText}</div>
          </div>
        </button>
        <div className="flex justify-evenly mt-5">
          <Link to={toLink} className="w-full text-center font-medium text-gray-500">
            {linkText}
          </Link>
        </div>
      </div>
    </form>
  );
};
