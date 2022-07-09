import { Dispatch, SetStateAction } from "react";
import DataDeleteNoteType from "../types/DataDeleteNoteType";
import { deleteNote } from "../utils/firebase/CRUD";

function AlertYesOrNo({ setIsShowAlert, dataDeleteNote }: { setIsShowAlert: Dispatch<SetStateAction<boolean>>, dataDeleteNote: DataDeleteNoteType | undefined }) {
  return (
    <div className="fixed bg-black w-screen h-screen top-0 bottom-0 right-0 left-0 slateTransparent flex justify-center items-center">
      <div className="bg-slate-50 p-10 flex flex-col w-1/2 shadow-xl md:w-1/4 rounded-xl dark:bg-slate-300">
        <h1 className="text-red-600 text-center font-bold">Are You Sure Delete This Data?</h1>
        <button className='bg-red-600 rounded-lg my-5 p-3 text-white hover:bg-red-800' onClick={() => {
          if (!(dataDeleteNote === undefined)) deleteNote(dataDeleteNote.e, dataDeleteNote.note, dataDeleteNote.userID, dataDeleteNote.getNotes, dataDeleteNote.setNotes)
          setIsShowAlert(false)
        }}>Yes</button>
        <button className='bg-slate-500 rounded-lg my-5 p-3 text-white hover:bg-slate-700' onClick={() => {
          setIsShowAlert(false)
        }}>No</button>
      </div>
    </div>
  );
}

export default AlertYesOrNo