import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  if (data && uid) {
    return firestore
      .collection("users")
      .doc(uid)
      .set({ uid, ...data }, { merge: true });
  }
}
