import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import {
  addDestino,
  getMisDestinosPendientes,
  marcarComoVisitado,
  eliminarDestino,
  toggleFavorito,
  editarDestino,
} from "../services/destinoService";
import DestinoCard from "../components/DestinoCard";
import { logoutUser } from "../services/authService";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [destinos, setDestinos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [destinoEditando, setDestinoEditando] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");

  const cargarDestinos = async () => {
    try {
      setLoading(true);
      const data = await getMisDestinosPendientes(user.uid);
      setDestinos(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los destinos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarDestinos();
    }, []),
  );

  const handleCrearDestino = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      Alert.alert("Error", "Completá todos los campos.");
      return;
    }
    try {
      await addDestino(user.uid, nombre, descripcion);
      setNombre("");
      setDescripcion("");
      cargarDestinos();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el destino.");
    }
  };

  const handleEditar = (item) => {
    setDestinoEditando(item);
    setEditNombre(item.nombre);
    setEditDescripcion(item.descripcion);
    setModalVisible(true);
  };

  const guardarEdicion = async () => {
    if (!editNombre.trim() || !editDescripcion.trim()) {
      Alert.alert("Error", "Completá todos los campos.");
      return;
    }
    try {
      await editarDestino(destinoEditando.id, editNombre, editDescripcion);
      setModalVisible(false);
      setDestinoEditando(null);
      cargarDestinos();
    } catch (error) {
      Alert.alert("Error", "No se pudo editar el destino.");
    }
  };

  const handleVisitado = async (id) => {
    try {
      await marcarComoVisitado(id);
      setDestinos((prev) => prev.filter((item) => item.id !== id));
      Alert.alert("¡Éxito!", "Destino enviado al historial de visitados.");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el destino.");
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarDestino(id);
      setDestinos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el destino.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hola, viajero!</Text>

        {/* Nueva botonera en formato "Píldoras" debajo del título */}
        <View style={styles.navButtonsContainer}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate("Map")}
          >
            <Text style={styles.navBtnText}>🗺️ Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate("Explore")}
          >
            <Text style={styles.navBtnText}>🌍 Comunidad</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.navBtnText}>📜 Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtnOutline}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.navBtnTextDark}>👤 Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Lugar (Ej: Torre Eiffel)"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción breve"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <Button title="Agregar Destino" onPress={handleCrearDestino} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={destinos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinoCard
              destino={item}
              onVisitado={() => handleVisitado(item.id)}
              onEdit={() => handleEditar(item)}
              onToggleFavorito={async () => {
                await toggleFavorito(item.id, item.esFavorito);
                cargarDestinos();
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No tenés destinos pendientes.</Text>
          }
        />
      )}

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Destino</Text>

            <TextInput
              style={styles.input}
              placeholder="Nuevo nombre"
              value={editNombre}
              onChangeText={setEditNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva descripción"
              value={editDescripcion}
              onChangeText={setEditDescripcion}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Guardar"
                color="#28a745"
                onPress={guardarEdicion}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  welcome: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1a1a1a",
    letterSpacing: -0.5,
    marginBottom: 15,
  },
  navButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  navBtn: {
    backgroundColor: "#0056b3",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  navBtnOutline: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  navBtnText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  navBtnTextDark: { color: "#333", fontWeight: "bold", fontSize: 13 },
  form: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  empty: { textAlign: "center", marginTop: 20, color: "#888" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});
