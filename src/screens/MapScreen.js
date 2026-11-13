import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useAuth } from "../context/AuthContext";
import { getTodosMisDestinos, addDestino } from "../services/destinoService";

export default function MapScreen() {
  const { user } = useAuth();
  const [destinos, setDestinos] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coordenadaTemp, setCoordenadaTemp] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const cargarDatosYGPS = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "No se podrá mostrar tu ubicación actual.",
        );
      } else {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }

      const data = await getTodosMisDestinos(user.uid);
      setDestinos(data);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al cargar el mapa.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosYGPS();
  }, []);

  const handleMapLongPress = (event) => {
    setCoordenadaTemp(event.nativeEvent.coordinate);
  };

  const guardarDestinoDesdeMapa = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      Alert.alert("Error", "Completá nombre y descripción.");
      return;
    }

    try {
      await addDestino(user.uid, nombre, descripcion, coordenadaTemp);
      Alert.alert("¡Éxito!", "Destino guardado en el mapa.");
      setCoordenadaTemp(null);
      setNombre("");
      setDescripcion("");
      cargarDatosYGPS();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -34.6037,
          longitude: location ? location.longitude : -58.3816,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        onLongPress={handleMapLongPress}
      >
        {destinos.map((destino) => {
          if (destino.coordenadas) {
            return (
              <Marker
                key={destino.id}
                coordinate={destino.coordenadas}
                title={destino.nombre}
                description={destino.descripcion}
                pinColor={destino.visitado ? "green" : "red"}
              />
            );
          }
          return null;
        })}
      </MapView>

      {coordenadaTemp && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Nuevo Destino</Text>
          <TextInput
            style={styles.input}
            placeholder="Lugar"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, styles.btnCancel]}
              onPress={() => setCoordenadaTemp(null)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSave]}
              onPress={guardarDestinoDesdeMapa}
            >
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  map: { flex: 1 },
  formContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  btn: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancel: { backgroundColor: "#e74c3c" },
  btnSave: { backgroundColor: "#2ecc71" },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
