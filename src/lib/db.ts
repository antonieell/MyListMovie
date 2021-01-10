import firebase from "./firebase";

const firestore = firebase.firestore();

const usersCollectionRef = firestore.collection("users");

export function createUser(uid: string, data: any) {
  if (data && uid) {
    delete data.password;
    return usersCollectionRef.doc(uid).set({ uid, ...data }, { merge: true });
  }
}

export async function setUserProfile(uid: string, profileName: string) {
  // Essa rotina pode ser otimizada se quando o usuário criar sua conta
  // Ele já tenha um Perfil Padrão, nãos sendo necessário alternar entre
  // as funções de set e update

  try {
    return await usersCollectionRef.doc(uid).collection("profiles").doc().set({
      name: profileName,
      wishList: [],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserProfile(uid: string) {
  try {
    const snapshot = await usersCollectionRef
      .doc(uid)
      .collection("profiles")
      .get();
    return snapshot.docs.map((snap) => ({
      profileId: snap.id,
      ...snap.data(),
    }));
  } catch (error) {
    console.log(error);
  }
}
