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

export default function Atualizar() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [uf, setUf] = useState("");

  // Buscar cliente pelo ID
  const handleBuscarCliente = () => {
    if (!id) {
      Alert.alert("Erro", "Digite um ID para buscar o cliente!");
      return;
    }

    fetch(`${API_URL}/clientes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Cliente não encontrado");
        return res.json();
      })
      .then((data) => {
        const cliente = Array.isArray(data) ? data[0] : data;
        if (!cliente) {
          Alert.alert("Erro", "Cliente não encontrado!");
          return;
        }
        setNome(cliente.Nome || cliente.nome || "");
        setIdade(cliente.Idade?.toString() || cliente.idade?.toString() || "");
        setUf(cliente.UF || cliente.uf || "");
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro", "Cliente não encontrado!");
      });
  };

  // Atualizar cliente
  const handleUpdate = () => {
    if (!id || !nome || !idade || !uf) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    fetch(`${API_URL}/clientes/${id}`, {
      method: "PUT",
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
          Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
          setId("");
          setNome("");
          setIdade("");
          setUf("");
        } else {
          Alert.alert("Erro", "Não foi possível atualizar o cliente.");
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro", "Falha na requisição.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atualizar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o ID do cliente"
        placeholderTextColor="#ccc"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleBuscarCliente}>
        <Text style={styles.buttonText}>Buscar Cliente</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        placeholderTextColor="#ccc"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a idade"
        placeholderTextColor="#ccc"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o UF"
        placeholderTextColor="#ccc"
        value={uf}
        onChangeText={setUf}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar Cliente</Text>
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
