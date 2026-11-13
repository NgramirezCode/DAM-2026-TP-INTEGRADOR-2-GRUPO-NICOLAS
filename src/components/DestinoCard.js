import { View, Text, Button, StyleSheet } from "react-native";

export default function DestinoCard({
  destino,
  onVisitado,
  onDelete,
  onEdit,
  onToggleFavorito,
  onAgregar,
  isHistory,
  isExplore,
  onRecuperar,
  yaAgregado,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {destino.nombre} {destino.esFavorito && "⭐"}
      </Text>
      <Text style={styles.description}>{destino.descripcion}</Text>

      <View style={styles.buttonRow}>
        {/* Botón de Home */}
        {!isHistory && !isExplore && (
          <>
            <Button title="✔ Visitado" onPress={onVisitado} color="green" />
            <Button title="Editar" onPress={onEdit} color="#17a2b8" />
            <Button
              title={destino.esFavorito ? "Quitar ⭐" : "Favorito ⭐"}
              onPress={onToggleFavorito}
              color="#f0ad4e"
            />
          </>
        )}
        {/* Botón de Historial */}
        {isHistory && (
          <>
            <Button title="↩ Recuperar" onPress={onRecuperar} color="#26b69c" />
            <Button title="Eliminar" onPress={onDelete} color="red" />
          </>
        )}
        {/* Botón de Explorar */}
        {isExplore && (
          <Button
            title={yaAgregado ? "✅ Agregado" : "+ Agregar a mi lista"}
            onPress={onAgregar}
            color={yaAgregado ? "gray" : "#007bff"}
            disabled={yaAgregado}
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
