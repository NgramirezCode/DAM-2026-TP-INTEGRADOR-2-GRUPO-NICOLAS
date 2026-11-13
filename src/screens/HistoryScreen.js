import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import {
  getHistorialDestinos,
  eliminarDestino,
  marcarComoNoVisitado,
} from "../services/destinoService";
import DestinoCard from "../components/DestinoCard";

export default function HistoryScreen() {
  const { user } = useAuth();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const data = await getHistorialDestinos(user.uid);
      setHistorial(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el historial.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecuperar = async (id) => {
    try {
      await marcarComoNoVisitado(id);
      setHistorial((prev) => prev.filter((item) => item.id !== id));
      Alert.alert(
        "Recuperado",
        "El destino volvió a tu lista pendiente en el Home.",
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo recuperar el destino.");
    }
  };

  const handleEliminar = async (id) => {
    await eliminarDestino(id);
    setHistorial((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginTop: 50 }}
      />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinoCard
            destino={item}
            onDelete={() => handleEliminar(item.id)}
            onRecuperar={() => handleRecuperar(item.id)}
            isHistory={true}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay lugares visitados aún.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  emptyText: { textAlign: "center", marginTop: 50, color: "gray" },
});
