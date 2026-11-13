import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";
import { logoutUser } from "../services/authService";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfileData(data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos del perfil.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.center} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Mi Perfil 👤</Text>
        {profileData ? (
          <>
            <Text style={styles.label}>
              Nombre:{" "}
              <Text style={styles.value}>{profileData.nombreCompleto}</Text>
            </Text>
            <Text style={styles.label}>
              Email: <Text style={styles.value}>{profileData.email}</Text>
            </Text>
            <Text style={styles.label}>
              Edad: <Text style={styles.value}>{profileData.edad} años</Text>
            </Text>
            <Text style={styles.label}>
              Nacionalidad:{" "}
              <Text style={styles.value}>{profileData.nacionalidad}</Text>
            </Text>
          </>
        ) : (
          <Text>No hay datos disponibles.</Text>
        )}
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Cerrar Sesión" onPress={logoutUser} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  value: { fontWeight: "normal", color: "#444" },
  logoutContainer: { marginTop: 30 },
});
