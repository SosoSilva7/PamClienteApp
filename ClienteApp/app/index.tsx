import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clientes App</Text>

      <View style={styles.mainContent}>
        <Text
          style={{
            color: "#EEEEEE",
            fontSize: 25,
            fontWeight: "bold",
            borderBottomWidth: 4,
            borderBottomColor: "#910A67",
            paddingBottom: 5,
            marginBottom: 10,
          }}
        >
          Bem-vindo ao aplicativo de gerenciamento de clientes!
        </Text>
        <Text style={{ color: "#EEEEEE", marginBottom: 20, fontSize: 12 }}>
          Use as opções abaixo para gerenciar seus clientes de forma fácil e rápida.
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/adicionar")}
        >
          <MaterialIcons name="person-add" size={28} color="#EEEEEE" />
          <Text style={styles.cardText}>Adicionar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/atualizar")}
        >
          <FontAwesome5 name="edit" size={28} color="#EEEEEE" />
          <Text style={styles.cardText}>Atualizar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/deletar")}
        >
          <Ionicons name="trash-outline" size={28} color="#EEEEEE" />
          <Text style={styles.cardText}>Deletar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/visualizar")}
        >
          <MaterialIcons name="view-list" size={28} color="#EEEEEE" />
          <Text style={styles.cardText}>Visualizar Clientes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030637",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  mainContent: {
    alignItems: "center",
    marginBottom: 30,
    width: "98%",
    borderRadius: 10,
    padding: 15,
    height: 220,
    borderWidth: 2,
    borderColor: "#910A67",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EEEEEE",
    marginBottom: 40,
    marginTop: 40,
    backgroundColor: "#910A67",
  },
  cardsContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: "85%",
    backgroundColor: "#3C0753",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#910A67",
  },
  cardText: {
    fontSize: 18,
    color: "#EEEEEE",
    fontWeight: "600",
    marginLeft: 15,
  },
});
