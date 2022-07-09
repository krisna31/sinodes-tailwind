import React, { useState } from "react";
import contentNoteType from "../types/ContentNoteType";
import DataDeleteNoteType from "../types/DataDeleteNoteType";
import { noteType } from "../types/noteType";
import AlertYesOrNo from "./AlertYesOrNo";
import MyModal from "./MyModal";

const Card = ({ title, content, date, noteID, userID, getNotes, setNotes }: { title: string, content: string, date: string, noteID: string, userID: string, getNotes: noteType, setNotes: React.Dispatch<React.SetStateAction<noteType>> }) => {

  const [updateData, setUpdatedata] = useState<contentNoteType>({
    title: "",
    content: "",
    date: "",
    noteID: "",
    userID: "",
    isShowUpdateModal: false,
  });

  const note: {
    title: string;
    content: string;
    date: string;
    noteID: string;
  } = {
    title, content, date, noteID
  }

  const updateNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: {
    title: string;
    content: string;
    date: string;
    noteID: string;
  },
    userID: string,
  ) => {
    e.stopPropagation();
    setUpdatedata({
      title: note.title,
      content: note.content,
      date: note.date,
      noteID: note.noteID,
      userID,
      isShowUpdateModal: true,
    })
  }

  const [isShowAlert, setIsShowAlert] = useState(false)

  const [dataDeleteNote, setDataDeleteNote] = useState<DataDeleteNoteType>();

  const month = ['', 'January', 'February', 'Maret', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December']
  let newDate: string[] = date.split(' ');
  newDate[0] = newDate[0].replaceAll('-', ' - ')
  newDate[0] = newDate[0].split('-')[1] + month[+newDate[0].split('-')[1]] + newDate[0].split('-')[2]

  return (
    <>
      <div className="bg-slate-400 mx-auto w-1/2 md:w-2/5 p-3 rounded-lg text-center text-sm mb-3" key={noteID}>
        <h2 className="mb-2 text-lg bg-gradient-to-b from-slate-900 to-slate-600 text-transparent bg-clip-text font-extrabold md:text-2xl hover:animate-pulse">{title}</h2>
        <p className="mb-2 text-sm text-center font-serif md:text-base hover:animate-pulse">{content}</p>
        <p className="mt-4 font-serif md:text-lg hover:animate-pulse">Date : {newDate[0]}</p>
        <p className=" font-serif md:text-lg hover:animate-pulse">Jam : {newDate[1]}</p>
        <div className="flex justify-center mt-3">
          <button type="submit" className="bg-slate-200 mx-3 rounded-xl py-1 px-2 font-serif hover:bg-slate-500 hover:text-white dark:bg-slate-300 md:text-md transition-all ease-in-out delay-75 duration-200 hover:text-base"
            onClick={e => {
              updateNote(e, note, userID)
            }}>
            Update
          </button>
          <button type="submit" className="bg-slate-200 mx-3 rounded-xl py-1 px-2 font-serif hover:bg-red-700 hover:text-white dark:bg-slate-300 md:text-md transition-all ease-in-out delay-75 duration-200 hover:text-base"
            onClick={e => {
              setIsShowAlert(true)
              setDataDeleteNote({ e, note, userID, getNotes, setNotes })
            }}>
            Delete
          </button>
        </div>
      </div>
      <MyModal updateData={updateData} setUpdateData={setUpdatedata} />
      {isShowAlert && <AlertYesOrNo setIsShowAlert={setIsShowAlert} dataDeleteNote={dataDeleteNote} />}
    </>
  );
};

export default Card