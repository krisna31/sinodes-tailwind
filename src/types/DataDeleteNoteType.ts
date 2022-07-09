import { noteType } from "./noteType";

type DataDeleteNoteType = {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  note: { title: string; content: string; date: string; noteID: string };
  userID: string;
  getNotes: noteType;
  setNotes: React.Dispatch<React.SetStateAction<noteType>>;
};

export default DataDeleteNoteType;
