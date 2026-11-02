import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logoutUser } from "../services/authService";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Travels</Text>
      <Text style={styles.subtitle}>Zona Privada</Text>

      {/* probar el cierre de sesión */}
      <Button title="Cerrar Sesión" onPress={logoutUser} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginBottom: 20 },
});
