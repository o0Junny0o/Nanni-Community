import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";

export default function TopicoScreen({ route }) {
  const { topicoTitle, topicoDesc } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const enviarMensagem = () => {
    if (mensagem.trim().length === 0) return; // Evita mensagens vazias

    setMensagens([...mensagens, { id: mensagens.length.toString(), texto: mensagem, enviada: true }]);
    setMensagem(""); // Limpa o campo após envio
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>{topicoTitle}</Text>
        <Text style={styles.descricao}>{topicoDesc}</Text>
      </View>

      {/* Lista de mensagens */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.mensagem, item.enviada ? styles.enviada : styles.recebida]}>
            <Text style={styles.mensagemTexto}>{item.texto}</Text>
          </View>
        )}
        style={styles.chatArea}
      />

      {/* Entrada de mensagem */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#666"
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#1D5DB5",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  descricao: {
    fontSize: 14,
    color: "#e0e0e0",
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  mensagem: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  enviada: {
    backgroundColor: "#5d90d6",
    alignSelf: "flex-end",
  },
  recebida: {
    backgroundColor: "#B88CB4",
    alignSelf: "flex-start",
  },
  mensagemTexto: {
    color: "#fff",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#B88CB4",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: "#333",
  },
  botaoEnviar: {
    backgroundColor: "#1D5DB5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
