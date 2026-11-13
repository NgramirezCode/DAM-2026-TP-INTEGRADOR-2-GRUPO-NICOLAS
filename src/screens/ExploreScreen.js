import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import {
  getFavoritosComunidad,
  addDestino,
  getMisDestinosPendientes,
  getHistorialDestinos,
} from "../services/destinoService";
import DestinoCard from "../components/DestinoCard";

export default function ExploreScreen() {
  const { user } = useAuth();
  const [comunidad, setComunidad] = useState([]);
  const [misNombres, setMisNombres] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, []),
  );

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const dataComunidad = await getFavoritosComunidad(user.uid);
      const pendientes = await getMisDestinosPendientes(user.uid);
      const historial = await getHistorialDestinos(user.uid);
      const todosMisNombres = [...pendientes, ...historial].map(
        (d) => d.nombre,
      );

      setMisNombres(todosMisNombres);
      setComunidad(dataComunidad);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la comunidad.");
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarAMisTareas = async (destino) => {
    try {
      await addDestino(
        user.uid,
        destino.nombre,
        destino.descripcion,
        destino.coordenadas || null,
      );
      Alert.alert(
        "¡Agregado!",
        "Este destino ahora está en tu Home listo para visitar.",
      );
      setMisNombres((prev) => [...prev, destino.nombre]);
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar a tu lista.");
    }
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
      <Text style={styles.info}>
        Destinos recomendados por otros viajeros 🌍
      </Text>
      <FlatList
        data={comunidad}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const yaLoTengo = misNombres.includes(item.nombre);

          return (
            <DestinoCard
              destino={item}
              onAgregar={() => handleAgregarAMisTareas(item)}
              isExplore={true}
              yaAgregado={yaLoTengo}
            />
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay recomendaciones de la comunidad.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: { textAlign: "center", marginTop: 50, color: "gray" },
});
