import { View, Text, Button, StyleSheet } from "react-native";

export default function DestinoCard({ destino, onVisitado, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{destino.nombre}</Text>
      <Text style={styles.description}>{destino.descripcion}</Text>

      <View style={styles.buttonRow}>
        <Button title="Marcar Visitado" onPress={onVisitado} color="green" />
        <Button title="Eliminar" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
