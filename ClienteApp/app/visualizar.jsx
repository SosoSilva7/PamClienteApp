import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { API_URL } from "../constantes/api";
import BtnVoltar from "../components/btnVoltar"; // ajuste o caminho se necessário

export default function Visualizar() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/clientes`)
      .then(res => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
      })
      .then(data => {
        setClientes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text style={styles.loading}>Carregando...</Text>;
  if (error) return <Text style={styles.loading}>Erro: {error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Clientes Cadastrados</Text>
      {clientes.map((cliente, index) => (
        <View key={cliente.id ?? cliente.Id ?? index} style={styles.card}>
          <Text style={styles.id}>ID: {cliente.id || cliente.Id || cliente.ID}</Text>
          <Text style={styles.nome}>Nome: {cliente.Nome}</Text>
          <Text style={styles.text}>Idade: {cliente.Idade}</Text>
          <Text style={styles.text}>UF: {cliente.UF}</Text>
          
        </View>
      ))}
      <BtnVoltar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#030637",
    minHeight: "100%",
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
  card: {
    backgroundColor: "#3C0753",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#910A67",
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#EEEEEE",
    marginBottom: 5,
  },
  id: {
    fontWeight: "bold",
    color: "#EEEEEE",
    marginBottom: 5,
  },
  text: {
    color: "#EEEEEE",
    marginBottom: 3,
  },
  loading: {
    color: "#EEEEEE",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});
