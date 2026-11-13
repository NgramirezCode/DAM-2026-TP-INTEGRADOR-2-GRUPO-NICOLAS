import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>{destino.nombre}</Text>
        {destino.esFavorito && <Text style={styles.star}>⭐</Text>}
      </View>

      <Text style={styles.description}>{destino.descripcion}</Text>

      <View style={styles.buttonRow}>
        {/* Botón de Home */}
        {!isHistory && !isExplore && (
          <>
            <TouchableOpacity
              style={[styles.btn, styles.btnSuccess]}
              onPress={onVisitado}
            >
              <Text style={styles.btnText}>✔ Visitado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnInfo]}
              onPress={onEdit}
            >
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                destino.esFavorito
                  ? styles.btnWarningOutline
                  : styles.btnWarning,
              ]}
              onPress={onToggleFavorito}
            >
              <Text
                style={[
                  styles.btnText,
                  destino.esFavorito && styles.btnTextDark,
                ]}
              >
                {destino.esFavorito ? "Quitar ⭐" : "Favorito ⭐"}
              </Text>
            </TouchableOpacity>
          </>
        )}
        {/* Botón de Historial */}
        {isHistory && (
          <>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={onRecuperar}
            >
              <Text style={styles.btnText}>↩️ Recuperar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnDanger]}
              onPress={onDelete}
            >
              <Text style={styles.btnText}>🗑️ Eliminar</Text>
            </TouchableOpacity>
          </>
        )}
        {/* Botón de Explorar */}
        {isExplore && (
          <TouchableOpacity
            style={[
              styles.btn,
              yaAgregado ? styles.btnDisabled : styles.btnPrimary,
            ]}
            onPress={onAgregar}
            disabled={yaAgregado}
          >
            <Text style={styles.btnText}>
              {yaAgregado ? "✔ Agregado" : "+ Añadir"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1a1a1a",
    flex: 1,
    letterSpacing: -0.5,
  },
  star: { fontSize: 20 },
  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 16,
    lineHeight: 22,
  },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 13 },
  btnTextDark: { color: "#333", fontWeight: "bold", fontSize: 13 },
  btnSuccess: { backgroundColor: "#2ecc71" },
  btnInfo: { backgroundColor: "#3498db" },
  btnWarning: { backgroundColor: "#f1c40f" },
  btnWarningOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f1c40f",
  },
  btnSecondary: { backgroundColor: "#7f8c8d" },
  btnDanger: { backgroundColor: "#e74c3c" },
  btnPrimary: { backgroundColor: "#0056b3" },
  btnDisabled: { backgroundColor: "#bdc3c7" },
});
