import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { API_URL } from "../constantes/api";
import BtnVoltar from "../components/btnVoltar";

export default function Deletar() {
  const [id, setId] = useState("");

  const handleDelete = () => {
    console.log("Atualizando cliente:", id); // <<< teste
    if (!id) {
      Alert.alert("Erro", "Informe um ID válido!");
      return;
    }

    fetch(`${API_URL}/clientes/${parseInt(id)}`, {
  method: "DELETE",
})//converte id pra inteiro pq o banco espera um int

      .then((res) => {
        if (res.ok) {
          Alert.alert("Sucesso", "Cliente deletado com sucesso!");
          setId("");
        } else {
          Alert.alert("Erro", "Não foi possível deletar o cliente.");
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro", "Ocorreu um erro ao tentar deletar.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deletar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o ID do cliente"
        placeholderTextColor="#ccc"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Deletar Cliente</Text>
      </TouchableOpacity>

      <BtnVoltar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030637",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EEEEEE",
    marginVertical: 30,
    borderBottomWidth: 4,
    borderBottomColor: "#910A67",
    paddingBottom: 5,
    width: "100%",
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#910A67",
    backgroundColor: "#3C0753",
    color: "#EEEEEE",
    width: "85%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#910A67",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 15,
    width: "85%",
    alignItems: "center",
  },
  buttonText: {
    color: "#EEEEEE",
    fontSize: 18,
    fontWeight: "bold",
  },
});
