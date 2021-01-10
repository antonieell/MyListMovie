import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  if (data && uid) {
    delete data.password;
    return firestore
      .collection("users")
      .doc(uid)
      .set({ uid, ...data }, { merge: true });
  }
}

export async function setUserProfile(uid, profileName) {
  // Essa rotina pode ser otimizada se quando o usuário criar sua conta
  // Ele já tenha um Perfil Padrão, nãos sendo necessário alternar entre
  // as funções de set e update

  try {
    return await firestore
      .collection("profiles")
      .doc(uid)
      .update({
        uid,
        profileAcconunts: firebase.firestore.FieldValue.arrayUnion({
          name: profileName,
          wishList: [],
        }),
      });
  } catch (error) {
    return await firestore
      .collection("profiles")
      .doc(uid)
      .set({
        uid,
        profileAcconunts: firebase.firestore.FieldValue.arrayUnion({
          name: profileName,
          wishList: [],
        }),
      });
  }
}
