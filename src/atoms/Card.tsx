import React from "react";
import { contentNoteType } from "../types/ContentNoteType";
import { noteType } from "../types/noteType";
import { deleteNote } from "../utils/firebase/CRUD";

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

export default Card