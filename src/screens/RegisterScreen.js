import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registerUser } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nombreCompleto || !edad || !email || !nacionalidad || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      // Llamamos al servicio desacoplado
      await registerUser(nombreCompleto, edad, email, nacionalidad, password);
    } catch (error) {
      Alert.alert("Error de registro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombreCompleto}
        onChangeText={setNombreCompleto}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nacionalidad"
        value={nacionalidad}
        onChangeText={setNacionalidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Registrarse" onPress={handleRegister} />
      <View style={styles.spacing}>
        <Button
          title="Ya tengo cuenta"
          onPress={() => navigation.navigate("Login")}
          color="gray"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  spacing: { marginTop: 10 },
});
