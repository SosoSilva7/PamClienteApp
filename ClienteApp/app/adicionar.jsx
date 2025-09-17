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

export default function Adicionar() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [uf, setUf] = useState("");

  const handleAdd = () => {
    if (!nome || !idade || !uf) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nome: nome,
        Idade: idade,
        UF: uf,
      }),
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Sucesso", "Cliente inserido com sucesso!");
          setNome("");
          setIdade("");
          setUf("");
        } else {
          Alert.alert("Erro", "Não foi possível inserir o cliente.");
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro", "Falha na requisição.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do cliente"
        placeholderTextColor="#ccc"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a idade do cliente"
        placeholderTextColor="#ccc"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o UF do cliente"
        placeholderTextColor="#ccc"
        value={uf}
        onChangeText={setUf}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Inserir Cliente</Text>
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
