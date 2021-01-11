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

export async function updateWishList(user, currentProfile, wishList) {
  try {
    return await usersCollectionRef
      .doc(user.uid)
      .collection("profiles")
      .doc(currentProfile.profileId)
      .update({ wishList });
  } catch (error) {
    console.log(error);
  }
}
