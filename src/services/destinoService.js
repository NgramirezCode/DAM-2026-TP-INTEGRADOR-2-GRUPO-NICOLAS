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

// Update
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

// Get historial
export const getHistorialDestinos = async (userId) => {
  try {
    const q = query(
      collection(db, "destinos"),
      where("userId", "==", userId),
      where("visitado", "==", true),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener historial: ", error);
    throw error;
  }
};

export const toggleFavorito = async (destinoId, estadoActual) => {
  try {
    await updateDoc(doc(db, "destinos", destinoId), {
      esFavorito: !estadoActual,
    });
  } catch (error) {
    console.error("Error al cambiar favorito: ", error);
    throw error;
  }
};

// Get favoritos
export const getFavoritosComunidad = async (miUserId) => {
  try {
    const q = query(
      collection(db, "destinos"),
      where("esFavorito", "==", true),
    );
    const snapshot = await getDocs(q);
    const todosFavoritos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return todosFavoritos.filter((destino) => destino.userId !== miUserId);
  } catch (error) {
    console.error("Error al obtener comunidad: ", error);
    throw error;
  }
};

// Update
export const marcarComoNoVisitado = async (destinoId) => {
  try {
    await updateDoc(doc(db, "destinos", destinoId), { visitado: false });
  } catch (error) {
    console.error("Error al recuperar destino: ", error);
    throw error;
  }
};

// Update
export const editarDestino = async (
  destinoId,
  nuevoNombre,
  nuevaDescripcion,
) => {
  try {
    await updateDoc(doc(db, "destinos", destinoId), {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion,
    });
  } catch (error) {
    console.error("Error al editar:", error);
    throw error;
  }
};

// Delete
export const eliminarDestino = async (destinoId) => {
  try {
    const destinoRef = doc(db, "destinos", destinoId);
    await deleteDoc(destinoRef);
  } catch (error) {
    console.error("Error al eliminar destino: ", error);
    throw error;
  }
};
