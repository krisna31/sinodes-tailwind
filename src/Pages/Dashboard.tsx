import React, { Dispatch, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { AuthPageDataType } from "../types/AuthPageDataType";
import { CardInputType } from "../types/CardInputType";
import { UserDataType } from "../types/UserDataType";
import { getDatabase, onValue, push, ref, serverTimestamp, set } from "firebase/database";
import { deleteDataFromApi, writeUserData } from "../utils/firebase/CRUD";
import { contentNoteType } from "../types/ContentNoteType";


export default function Dashboard({ getUserData }: { getUserData: UserDataType }) {
  return (
    <>
      {getUserData.isLoggedIn ? <Authorize getUserData={getUserData} /> : <Navigate to="/" replace />}
    </>
  );
}

type noteType = {
  isExist: boolean;
  notes: any;
  counter: number;
}

const Authorize = ({ getUserData }: { getUserData: UserDataType }) => {
  const [getAuthPageData, setAuthPageData] = useState<AuthPageDataType>({ isShowModalBox: false });

  const [getNotes, setNotes] = useState<noteType>({ isExist: false, notes: {}, counter: 0 });

  useEffect(() => {
    const db = getDatabase();
    const notesRef = ref(db, 'notes/' + getUserData.uid);
    onValue(notesRef, (snapshot) => {
      const notes = snapshot.val();
      if (notes != null) setNotes({ isExist: true, notes, counter: getNotes.counter++ })
      else setNotes({ ...getNotes, isExist: false })
    });

    return () => {
      const db = getDatabase();
      const notesRef = ref(db, 'notes/' + getUserData.uid);
      onValue(notesRef, (snapshot) => {
        const notes = snapshot.val();
        if (notes != null) setNotes({ isExist: true, notes, counter: getNotes.counter++ })
        else setNotes({ ...getNotes, isExist: false })
      });
    }
  }, [getNotes?.counter])



  return (
    <>
      {getNotes.isExist ?
        <div className="container min-w-full bg-slate-200 dark:bg-slate-400 flex-1 justify-center items-start flex flex-col relative">
          <div className="container my-4 min-h-full flex-1 bg-slate-100 dark:bg-slate-300 min-w-full">
            <h1 className="text-center bg-gradient-to-t from-slate-500 to-slate-800 text-transparent bg-clip-text text-3xl font-extrabold mt-2 mb-4">Simple Notes</h1>
            {Object.keys(getNotes.notes).map((idNote: string) => {
              return (
                <Card title={getNotes.notes[idNote]["title"]} content={getNotes.notes[idNote]["content"]} date={
                  new Date(+getNotes.notes[idNote]["date"]).toLocaleDateString("in-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} noteID={idNote} userID={getUserData.uid} getNotes={getNotes} setNotes={setNotes} key={idNote} />
              )
            })
            }
          </div>
          <span
            className="fixed rounded-full right-5 bottom-6 bg-slate-400 text-4xl p-5 cursor-pointer shadow-md hover:shadow-2xl hover:bg-lime-500 flex justify-center items-center w-16 h-16"
            onClick={() => setAuthPageData({ ...getAuthPageData, isShowModalBox: true })}
          >
            +
          </span>
          <ModalBox getAuthPageData={getAuthPageData} setAuthPageData={setAuthPageData} getUserData={getUserData} getNotes={getNotes} setNotes={setNotes} />
        </div> : <div className="container min-w-full bg-slate-200 dark:bg-slate-400 flex-1 justify-center items-start flex flex-col relative">
          <div className="container my-4 min-h-full flex-1 bg-slate-100 dark:bg-slate-300 min-w-full flex justify-center items-center">
            <h1 className="text-center bg-gradient-to-t from-slate-500 to-slate-800 text-transparent bg-clip-text text-3xl font-extrabold mt-2 mb-4">You Have 0 Notes, Start to add one by clicking the add button on the bottom right screen</h1>
          </div>
          <span
            className="fixed rounded-full right-5 bottom-6 bg-slate-400 text-4xl p-5 cursor-pointer shadow-md hover:shadow-2xl hover:bg-lime-500 flex justify-center items-center w-16 h-16"
            onClick={() => setAuthPageData({ ...getAuthPageData, isShowModalBox: true })}
          >
            +
          </span>
          <ModalBox getAuthPageData={getAuthPageData} setAuthPageData={setAuthPageData} getUserData={getUserData} getNotes={getNotes} setNotes={setNotes} />
        </div>
      }
    </>
  );
};

const deleteNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: contentNoteType, userID: string, getNotes: noteType, setNotes: React.Dispatch<React.SetStateAction<noteType>>) => {
  e.stopPropagation();

  deleteDataFromApi(note.noteID, userID)
    .then((res) => {
      setNotes({ ...getNotes, counter: getNotes.counter++ })
    })
    .catch((error) => {
    });
}

const Card = ({ title, content, date, noteID, userID, getNotes, setNotes }: { title: string, content: string, date: string, noteID: string, userID: string, getNotes: noteType, setNotes: React.Dispatch<React.SetStateAction<noteType>> }) => {
  const note: contentNoteType = {
    title, content, date, noteID
  }
  return (
    <>
      <div className="bg-slate-400 mx-auto w-1/2 md:w-2/5 p-3 rounded-lg text-center text-sm mb-3" key={noteID}>
        <h2 className="mb-2 text-lg bg-gradient-to-b from-slate-900 to-slate-600 text-transparent bg-clip-text font-extrabold md:text-2xl">{title}</h2>
        <p className="mb-2 text-sm text-center font-serif md:text-base">{content}</p>
        <p className="mt-4 font-serif md:text-lg">{date}</p>
        <div className="flex justify-center mt-3">
          {/* <button type="submit" className="bg-slate-200 mx-3 rounded-xl py-1 px-2 font-serif hover:bg-slate-500 hover:text-white dark:bg-slate-300 md:text-md"
            onClick={e => updateNote(e, note, userID, getNotes, setNotes)}>>
            Update
          </button> */}
          <button type="submit" className="bg-slate-200 mx-3 rounded-xl py-1 px-2 font-serif hover:bg-red-700 hover:text-white dark:bg-slate-300 md:text-md"
            onClick={e => deleteNote(e, note, userID, getNotes, setNotes)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

const ModalBox = ({ getAuthPageData, setAuthPageData, getUserData, getNotes, setNotes }: {
  getAuthPageData: AuthPageDataType; setAuthPageData: Dispatch<React.SetStateAction<AuthPageDataType>>; getUserData: UserDataType, getNotes: noteType, setNotes: React.Dispatch<React.SetStateAction<noteType>>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardInputType>();

  const [getError, setError] = useState<{ isError: boolean, message: string }>({ isError: false, message: " " });

  const [getStringInput, setStringInput] = useState<CardInputType>({ title: " ", content: " ", date: " " });

  const onSubmit: SubmitHandler<CardInputType> = ({ title, content, date }) => {
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
      })
  };


  return (
    <>
      {getAuthPageData.isShowModalBox ? (
        <div className="fixed bg-black w-screen h-screen top-0 bottom-0 right-0 left-0 slateTransparent">
          <span
            className="fixed rounded-full right-2 top-4 text-4xl p-5 cursor-pointer text-red-600  w-1 h-1 flex justify-center items-center drop-shadow-lg hover:text-black"
            onClick={() => setAuthPageData({ ...getAuthPageData, isShowModalBox: false })}
          >
            x
          </span>

          <div className="container justify-center items-center  flex-1 min-w-full pt-5">
            <div className="flex flex-col text-left md:flex-row justify-evenly md:items-center mt-20">
              <div className="w-2/3 md:w-1/2 lg:w-1/3 mx-auto md:mx-0">
                <div className="bg-slate-50 p-10 flex flex-col w-full shadow-xl rounded-xl dark:bg-slate-300">
                  <h2 className="text-2xl font-bold text-gray-800 text-left">Add Note</h2>
                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div id="input" className="flex flex-col w-full my-5">
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
                      />
                      {getError.isError && <span className="text-red-700 text-xs font-bold mt-3">{getError.message}</span>}
                      {errors.content && <span className="text-red-700 text-xs font-bold mt-3">Type Title With only 50 Max Length</span>}
                    </div>
                    <div id="button" className="flex flex-col w-full">
                      <button type="submit" className="w-full py-4 bg-green-600 rounded-lg text-green-100">
                        <div className="flex flex-row items-center justify-center">
                          <div className="mr-2">
                            <span className="text-xl">+</span>
                          </div>
                          <div className="font-bold mr-2">Add Note</div>
                          <div className="mr-2">
                            <span className="text-xl">+</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
