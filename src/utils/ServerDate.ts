import firebase from "firebase/compat/app";

export const getNowTimeStamp = () => {
  return firebase.firestore.Timestamp.now();
};
