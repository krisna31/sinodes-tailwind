import { UserDataType } from "../../types/UserDataType";
import { Dispatch } from "react";
import { ref, remove, set } from "firebase/database";
import { push } from "firebase/database";
import { getDatabase } from "firebase/database";
import { AuthPageDataType } from "../../types/AuthPageDataType";
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

// const updateDataToAPI = ({
//   getModalUpdate,
//   setModalUpdate,
//   getUserData,
//   getNotes,
//   setNotes,
// }: {
//   getModalUpdate: boolean;
//   setModalUpdate: Dispatch<React.SetStateAction<boolean>>;
//   getUserData: UserDataType;
//   getNotes: noteType;
//   setNotes: React.Dispatch<React.SetStateAction<noteType>>;
// }) => {
//   const db = getDatabase();
//   const starCountRef = ref(db, "notes/" + getUserData.uid + "/" + data.noteId);
//   return new Promise((resolve, reject) => {
//     set(starCountRef, {
//       title: data.title,
//       content: data.content,
//       date: data.date,
//     })
//       .then((res) => {
//         setModalUpdate(false);
//         setError({ isError: false, message: " " });
//         setNotes({ ...getNotes, counter: getNotes.counter++ });
//       })
//       .catch((rej) => {
//         if (rej.toString().match("Error: PERMISSION_DENIED: Permission denied")) setError({ isError: true, message: "You Are Log out, Please Login Again" });
//         else setError({ isError: true, message: "Something Wrong Please Log out then login again if still occured contact developer" });
//       })
//       .finally(() => {
//         setStringInput({ content: " ", date: " ", title: " " });
//       });
//   });
// };

export { writeUserData, deleteDataFromApi };
