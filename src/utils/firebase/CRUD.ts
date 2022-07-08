import { ref, remove } from "firebase/database";
import { push } from "firebase/database";
import { getDatabase } from "firebase/database";

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

const deleteDataFromApi = (userID: string, noteID: string) => {
  const db = getDatabase();
  const notesRef = ref(db, "notes/" + userID + "/" + noteID);
  console.log("🚀 ~ file: CRUD.ts ~ line 26 ~ deleteDataFromApi ~ notesRef", notesRef);
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

export { writeUserData, deleteDataFromApi };
