import { View, Text, Button, StyleSheet } from "react-native";

export default function DestinoCard({
  destino,
  onVisitado,
  onDelete,
  onToggleFavorito,
  onAgregar,
  isHistory,
  isExplore,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {destino.nombre} {destino.esFavorito && "⭐"}
      </Text>
      <Text style={styles.description}>{destino.descripcion}</Text>

      <View style={styles.buttonRow}>
        {!isHistory && !isExplore && (
          <>
            <Button title="✔ Visitado" onPress={onVisitado} color="green" />
            <Button
              title={destino.esFavorito ? "Quitar ⭐" : "Hacer ⭐"}
              onPress={onToggleFavorito}
              color="#f0ad4e"
            />
          </>
        )}

        {!isExplore && (
          <Button title="Eliminar" onPress={onDelete} color="red" />
        )}

        {isExplore && (
          <Button
            title="+ Agregar a mi lista"
            onPress={onAgregar}
            color="#007bff"
          />
        )}
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
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  description: { fontSize: 14, color: "#666", marginBottom: 10 },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 10 },
});
