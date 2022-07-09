import { ref, remove, set } from "firebase/database";
import { push } from "firebase/database";
import { getDatabase } from "firebase/database";
import { noteType } from "../../types/noteType";

const writeUserData = (userId: string, email: string, title: string, content: string, date: string) => {
  return new Promise((res, rej) => {
    const db = getDatabase();
    push(ref(db, "notes/" + userId), {
      email,
      title,
      content,
      date,
    })
      .then(() => {
        res(true);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

const deleteDataFromApi = (noteID: string, userID: string) => {
  const db = getDatabase();
  const notesRef = ref(db, "notes/" + userID + "/" + noteID);
  return new Promise((res, rej) => {
    remove(notesRef)
      .then(() => {
        res(true);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

const deleteNote = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  note: { title: string; content: string; date: string; noteID: string },
  userID: string,
  getNotes: noteType,
  setNotes: React.Dispatch<React.SetStateAction<noteType>>
) => {
  e.stopPropagation();

  deleteDataFromApi(note.noteID, userID)
    .then((res) => {
      setNotes({ ...getNotes, counter: getNotes.counter++ });
    })
    .catch((error) => {});
};

const updateDataToAPI = (title: string, content: string, date: string, noteID: string, userID: string, email: string) => {
  const db = getDatabase();
  const notesRef = ref(db, "notes/" + userID + "/" + noteID);
  return new Promise((res, rej) => {
    set(notesRef, {
      email,
      title,
      content,
      date,
    })
      .then(() => {
        res(true);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

export { writeUserData, deleteNote, updateDataToAPI };
