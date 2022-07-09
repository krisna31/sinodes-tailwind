import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthPageDataType } from "../types/AuthPageDataType";
import { CardInputType } from "../types/CardInputType";
import { noteType } from "../types/noteType";
import { UserDataType } from "../types/UserDataType";
import { writeUserData } from "../utils/firebase/CRUD";

const ModalBox = ({
  getAuthPageData, setAuthPageData, getUserData, getNotes, setNotes, getStringInput, setStringInput }:
  {
    getAuthPageData: AuthPageDataType;
    setAuthPageData: Dispatch<React.SetStateAction<AuthPageDataType>>;
    getUserData: UserDataType;
    getNotes: noteType;
    setNotes: React.Dispatch<React.SetStateAction<noteType>>;
    getStringInput: CardInputType;
    setStringInput: Dispatch<SetStateAction<CardInputType>>;
  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardInputType>();

  const [getError, setError] = useState<{ isError: boolean, message: string }>({ isError: false, message: " " });

  const [isAddDataToAPI, setIsAddDataToAPI] = useState(false)


  const onSubmit: SubmitHandler<CardInputType> = ({ title, content, date }) => {
    setIsAddDataToAPI(true)
    date = new Date().getTime().toString()
    writeUserData(getUserData.uid, getUserData.email, title, content, date)
      .then((res) => {
        setAuthPageData({ ...getAuthPageData, isShowModalBox: false })
        setError({ isError: false, message: " " })

        // PENYEBAB ERROR SAAT CARD KOSONG NAMUN DATA PERTAMA KALI DIMASUKIN setNotes({ ...getNotes, counter: getNotes.counter++ })

      })
      .catch((rej) => {
        if (rej.toString().match("Error: PERMISSION_DENIED: Permission denied"))
          setError({ isError: true, message: "You Are Log out, Please Login Again" })
        else setError({ isError: true, message: "Something Wrong Please Log out then login again if still occured contact developer" })
      })
      .finally(() => {
        setStringInput({ content: " ", date: " ", title: " " })
        setIsAddDataToAPI(false)
      })
  };


  return (
    <>
      {getAuthPageData.isShowModalBox && (
        <div className="fixed bg-black w-screen h-screen top-0 bottom-0 right-0 left-0 slateTransparent">
          <span
            className="fixed rounded-full right-2 top-4 text-4xl p-5 cursor-pointer text-red-600  w-1 h-1 flex justify-center items-center drop-shadow-lg hover:text-black"
            onClick={() => {
              setStringInput({ content: " ", date: " ", title: " " })
              setAuthPageData({ ...getAuthPageData, isShowModalBox: false })
            }}
          >
            x
          </span>

          <div className="container justify-center items-center  flex-1 min-w-full pt-5">
            <div className="flex flex-col text-left md:flex-row justify-evenly md:items-center mt-20">
              <div className="w-2/3 md:w-1/2 lg:w-1/3 mx-auto md:mx-0">
                <div className="bg-slate-50 p-10 flex flex-col w-full shadow-xl rounded-xl dark:bg-slate-300">
                  <h2 className="text-2xl font-bold text-gray-800 text-left">Add Note</h2>
                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className="w-0 h-0" aria-label="just run once" autoFocus onFocus={() => setStringInput({ content: " ", date: " ", title: " " })} />
                    <div id="input" className="flex flex-col w-full mb-5">
                      <label htmlFor="title" className="text-gray-500 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        placeholder="Please insert the title"
                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                        {...register("title", { required: true, maxLength: 20 })}
                        value={getStringInput.title}
                        onChange={(e) => setStringInput({ ...getStringInput, title: e.target.value })}
                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      {errors.title && <span className="text-red-700 text-xs font-bold mt-3">Type Title With only 20 Max Length</span>}
                    </div>
                    <div id="input" className="flex flex-col w-full my-5">
                      <label htmlFor="Content" className="text-gray-500 mb-2">
                        Content Atau Isi Note
                      </label>
                      <input
                        type="Content"
                        id="Content"
                        placeholder="Please insert your Content"
                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                        {...register("content", { required: true, maxLength: 50 })}
                        value={getStringInput.content}
                        onChange={(e) => setStringInput({ ...getStringInput, content: e.target.value })}
                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      {getError.isError && <span className="text-red-700 text-xs font-bold mt-3">{getError.message}</span>}
                      {errors.content && <span className="text-red-700 text-xs font-bold mt-3">Type Content With only 50 Max Length</span>}
                    </div>
                    <div id="button" className="flex flex-col w-full">
                      {isAddDataToAPI ? <button type="submit" className="w-full py-4 bg-green-500 rounded-lg text-green-100" disabled>
                        <div className="flex flex-row items-center justify-center">
                          <span className="flex h-3 w-3">
                            <span className="relative animate-ping inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          </span>
                          <div className="font-bold mx-2">Processing</div>
                          <span className="flex h-3 w-3">
                            <span className="relative animate-ping inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          </span>
                        </div>
                      </button> : <button type="submit" className="w-full py-4 bg-green-600 rounded-lg text-green-100">
                        <div className="flex flex-row items-center justify-center">
                          <div className="mr-2">
                            <span className="text-xl">+</span>
                          </div>
                          <div className="font-bold mr-2">Add Note</div>
                          <div className="mr-2">
                            <span className="text-xl">+</span>
                          </div>
                        </div>
                      </button>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default ModalBox