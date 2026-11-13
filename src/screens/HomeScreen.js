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
    Alert.prompt(
      "Editar Lugar",
      "Ingresá el nuevo nombre del lugar:",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Guardar",
          onPress: async (nuevoNombre) => {
            if (nuevoNombre) {
              await editarDestino(item.id, nuevoNombre, item.descripcion);
              cargarDestinos();
            }
          },
        },
      ],
      "plain-text",
      item.nombre,
    );
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
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          <Button title="Mapa" onPress={() => navigation.navigate("Map")} />
          <Button
            title="Comunidad"
            onPress={() => navigation.navigate("Explore")}
          />
          <Button
            title="Historial"
            onPress={() => navigation.navigate("History")}
          />
          <Button
            title="Perfil"
            onPress={() => navigation.navigate("Profile")}
            color="#555"
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcome: { fontSize: 20, fontWeight: "bold" },
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
});
