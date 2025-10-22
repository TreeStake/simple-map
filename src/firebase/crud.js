import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireStore } from "./config";

export const addLocation = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(fireStore, collectionName), data);
    return docRef.id;
  } catch (e) {
    console.error(e);
  }
};

export const getLocations = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(fireStore, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error(e);
  }
};

export const deleteLocation = async (collectionName, id) => {
  try {
    await deleteDoc(doc(fireStore, collectionName, id));
  } catch (e) {
    console.error(e);
  }
};
