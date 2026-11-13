import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
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
        Alert.alert("Error", "No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading)
    return (
      <ActivityIndicator size="large" color="#0056b3" style={styles.center} />
    );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {profileData?.nombreCompleto
              ? profileData.nombreCompleto.charAt(0).toUpperCase()
              : "👤"}
          </Text>
        </View>
        <Text style={styles.title}>Mi Perfil</Text>

        {profileData && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{profileData.nombreCompleto}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profileData.email}</Text>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Edad</Text>
                <Text style={styles.value}>{profileData.edad} años</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Origen</Text>
                <Text style={styles.value}>{profileData.nacionalidad}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logoutUser}>
        <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0056b3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  avatarText: { fontSize: 36, color: "#fff", fontWeight: "bold" },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1a1a1a",
    marginBottom: 25,
    letterSpacing: -0.5,
  },
  infoContainer: { width: "100%" },
  label: {
    fontSize: 13,
    color: "#888",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: { fontSize: 18, color: "#333", marginBottom: 20, fontWeight: "500" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#ffe0e0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffb3b3",
  },
  logoutBtnText: { color: "#e74c3c", fontSize: 16, fontWeight: "bold" },
});
