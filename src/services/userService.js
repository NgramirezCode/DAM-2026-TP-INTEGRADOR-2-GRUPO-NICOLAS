import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No se encontró el perfil en la base de datos.");
    }
  } catch (error) {
    console.error("Error al obtener el perfil de usuario:", error);
    throw error;
  }
};
