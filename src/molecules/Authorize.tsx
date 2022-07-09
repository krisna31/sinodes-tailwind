import { useEffect, useState } from "react";
import { AuthPageDataType } from "../types/AuthPageDataType";
import { UserDataType } from "../types/UserDataType";
import { getDatabase, onValue, ref } from "firebase/database";
import ModalBox from "./ModalBox";
import Card from "../atoms/Card";
import { noteType } from "../types/noteType";
import { CardInputType } from "../types/CardInputType";
import CardSkeleton from "../atoms/CardSkeleton";

const Authorize = ({ getUserData }: { getUserData: UserDataType }) => {
  const [getAuthPageData, setAuthPageData] = useState<AuthPageDataType>({ isShowModalBox: false });

  const [getNotes, setNotes] = useState<noteType>({ isExist: false, notes: {}, counter: 0 });

  const [getStringInput, setStringInput] = useState<CardInputType>({ title: " ", content: " ", date: " " });

  const [isFetch, setIsFetch] = useState<boolean>(true)

  useEffect(() => {
    const db = getDatabase();
    const notesRef = ref(db, 'notes/' + getUserData.uid);
    onValue(notesRef, (snapshot) => {
      const notes = snapshot.val();
      if (notes != null) setNotes({ isExist: true, notes, counter: getNotes.counter++ })
      else setNotes({ ...getNotes, isExist: false })
      setIsFetch(false)
    });

    return () => {
      const db = getDatabase();
      const notesRef = ref(db, 'notes/' + getUserData.uid);
      onValue(notesRef, (snapshot) => {
        const notes = snapshot.val();
        if (notes != null) setNotes({ isExist: true, notes, counter: getNotes.counter++ })
        else setNotes({ ...getNotes, isExist: false })
        setIsFetch(false)
      });
    }
  }, [getNotes?.counter])



  return (
    <>
      {isFetch ?
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
        : getNotes.isExist ?
          <div className="container min-w-full bg-slate-200 dark:bg-slate-400 flex-1 justify-center items-start flex flex-col relative">
            <div className="container my-4 min-h-full flex-1 bg-slate-100 dark:bg-slate-300 min-w-full">
              <h1 className="text-center bg-gradient-to-t from-slate-500 to-slate-800 text-transparent bg-clip-text text-3xl font-extrabold mt-2 mb-4 transition-all ease-in-out scale-100 hover:animate-pulse">Simple Notes</h1>
              {Object.keys(getNotes.notes).map((idNote: string) => {
                return (
                  <Card title={getNotes.notes[idNote]["title"]} content={getNotes.notes[idNote]["content"]} date={
                    new Date(+getNotes.notes[idNote]["date"]).toLocaleString("ID-id").replaceAll("/", "-").replaceAll('.', ':')} noteID={idNote} userID={getUserData.uid} getNotes={getNotes} setNotes={setNotes} key={idNote} />
                )
              })
              }
            </div>
            <span
              className="fixed rounded-full right-5 bottom-6 bg-slate-400 text-4xl p-5 cursor-pointer shadow-md hover:shadow-2xl hover:bg-lime-500 flex justify-center items-center w-16 h-16 transition-all ease-in-out delay-75 duration-200 hover:scale-125 hover:-translate-y-4"
              onClick={() => setAuthPageData({ ...getAuthPageData, isShowModalBox: true })}
            >
              +
            </span>
            <ModalBox getAuthPageData={getAuthPageData} setAuthPageData={setAuthPageData} getUserData={getUserData} getNotes={getNotes} setNotes={setNotes} getStringInput={getStringInput} setStringInput={setStringInput} />
          </div> : <div className="container min-w-full bg-slate-200 dark:bg-slate-400 flex-1 justify-center items-start flex flex-col relative">
            <div className="container my-4 min-h-full flex-1 bg-slate-100 dark:bg-slate-300 min-w-full flex justify-center items-center">
              <h1 className="text-center bg-gradient-to-t from-slate-500 to-slate-800 text-transparent bg-clip-text text-3xl font-extrabold mt-2 mb-4">You Have 0 Notes, Start to add one by clicking the add button on the bottom right screen</h1>
            </div>
            <span
              className="fixed rounded-full right-5 bottom-6 bg-slate-400 text-4xl p-5 cursor-pointer shadow-md hover:shadow-2xl hover:bg-lime-500 flex justify-center items-center w-16 h-16 transition-all ease-in-out delay-75 duration-200 hover:scale-125 hover:-translate-y-4"
              onClick={() => {
                setStringInput({ content: " ", date: " ", title: " " })
                setAuthPageData({ ...getAuthPageData, isShowModalBox: true })
              }}
            >
              +
            </span>
            <ModalBox getAuthPageData={getAuthPageData} setAuthPageData={setAuthPageData} getUserData={getUserData} getNotes={getNotes} setNotes={setNotes} getStringInput={getStringInput} setStringInput={setStringInput} />
          </div>
      }
    </>
  );
};

export default Authorize