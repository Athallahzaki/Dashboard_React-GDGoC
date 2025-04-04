import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const dataProvider = {
  getList: async (resource, { pagination }) => {
    const querySnapshot = await getDocs(collection(db, resource));
    let data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const startIndex = (pagination.current - 1) * pagination.pageSize;
    data = data.slice(startIndex, startIndex + pagination.pageSize);

    return { data, total: querySnapshot.size };
  },
  create: async (resource, params) => {
    const docRef = await addDoc(collection(db, resource), params.data);
    return { data: { id: docRef.id, ...params.data } };
  },
  update: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    await updateDoc(docRef, params.data);
    return { data: { id: params.id, ...params.data } };
  },
  delete: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    await deleteDoc(docRef);
    return { data: { id: params.id } };
  },
};

export { dataProvider };