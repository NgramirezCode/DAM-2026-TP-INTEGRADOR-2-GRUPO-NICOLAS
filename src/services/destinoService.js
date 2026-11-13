import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const addDestino = async (
  userId,
  nombre,
  descripcion,
  coordenadas = null,
) => {
  try {
    const docRef = await addDoc(collection(db, "destinos"), {
      userId,
      nombre,
      descripcion,
      visitado: false,
      esFavorito: false,
      coordenadas,
      fechaCreacion: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar destino: ", error);
    throw error;
  }
};

export const getTodosMisDestinos = async (userId) => {
  try {
    const q = query(collection(db, "destinos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }));
  } catch (error) {
    console.error("Error al obtener todos los destinos: ", error);
    throw error;
  }
};

export const getMisDestinosPendientes = async (userId) => {
  try {
    const q = query(
      collection(db, "destinos"),
      where("userId", "==", userId),
      where("visitado", "==", false),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }));
  } catch (error) {
    console.error("Error al obtener destinos: ", error);
    throw error;
  }
};

export const marcarComoVisitado = async (destinoId) => {
  try {
    const destinoRef = doc(db, "destinos", destinoId);
    await updateDoc(destinoRef, {
      visitado: true,
    });
  } catch (error) {
    console.error("Error al actualizar destino: ", error);
    throw error;
  }
};

export const eliminarDestino = async (destinoId) => {
  try {
    const destinoRef = doc(db, "destinos", destinoId);
    await deleteDoc(destinoRef);
  } catch (error) {
    console.error("Error al eliminar destino: ", error);
    throw error;
  }
};
