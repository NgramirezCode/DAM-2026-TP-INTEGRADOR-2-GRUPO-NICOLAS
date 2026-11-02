import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

// Inicia sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Registra al usuario y guarda su perfil en Firestore
export const registerUser = async (
  nombreCompleto,
  edad,
  email,
  nacionalidad,
  password,
) => {
  try {
    // Creaa el usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Guarda sus datos adicionales en Firestore usando su UID
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      nombreCompleto,
      edad: Number(edad),
      email,
      nacionalidad,
    });

    return user;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

// Cierra sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};
