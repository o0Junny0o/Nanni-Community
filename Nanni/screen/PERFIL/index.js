import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker"; // 📷 Biblioteca para selecionar imagem
import { Ionicons } from "@expo/vector-icons"; 
import BotaoVoltar from "../../src/componentes/BotaoVoltar";
import BotaoPadrao from "../../src/componentes/BotaoPadrao";

const PerfilUsuario = ({ navigation }) => {
  const [nome, setNome] = useState("Nome");
  const [email, setEmail] = useState("email@email.com");
  const [idade, setIdade] = useState("20");
  const [fotoPerfil, setFotoPerfil] = useState(require("../../assets/perfil2.png")); // Foto padrão

  const [modalVisible, setModalVisible] = useState(false);
  const [campoEdicao, setCampoEdicao] = useState("");
  const [valorEdicao, setValorEdicao] = useState("");

  // Função para abrir o modal e editar um campo específico
  const editarCampo = (campo, valorAtual) => {
    setCampoEdicao(campo);
    setValorEdicao(valorAtual);
    setModalVisible(true);
  };

  // Função para salvar a edição
  const salvarEdicao = () => {
    if (campoEdicao === "Nome") setNome(valorEdicao);
    else if (campoEdicao === "Email") setEmail(valorEdicao);
    else if (campoEdicao === "Idade") setIdade(valorEdicao);
    
    setModalVisible(false);
  };

  // Função para escolher uma nova foto
  const mudarFotoPerfil = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFotoPerfil({ uri: resultado.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Voltar */}
      <View style={styles.header}>
        <BotaoVoltar onPress={() => navigation.goBack()} />
      </View>

      {/* Área de Foto de Perfil */}
      <View style={styles.profileContainer}>
        <Image source={fotoPerfil} style={styles.profileImage} />
        <TouchableOpacity style={styles.editIcon} onPress={mudarFotoPerfil}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Informações do Usuário */}
      <View style={styles.infoContainer}>
        <InfoItem label="Nome" value={nome} onEdit={() => editarCampo("Nome", nome)} />
        <InfoItem label="Email" value={email} onEdit={() => editarCampo("Email", email)} />
        <InfoItem label="Idade" value={idade} onEdit={() => editarCampo("Idade", idade)} />
      </View>

      {/* Botões de Navegação */}
      <View style={styles.buttonContainer}>
        <BotaoPadrao onPress={() => alert("Ir para tela de DOAÇÕES")} text="Histórico de Doações" />
        <BotaoPadrao onPress={() => alert("Ir para tela de DADOS")} text="Análise de Dados" />
      </View>

      {/* MODAL PARA EDITAR INFORMAÇÕES */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar {campoEdicao}</Text>
            <TextInput
              style={styles.input}
              value={valorEdicao}
              onChangeText={setValorEdicao}
              keyboardType={campoEdicao === "Idade" ? "numeric" : "default"}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={salvarEdicao}>
                <Text style={[styles.modalButtonText, { color: "white" }]}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Componente para exibir as informações com botão de edição
const InfoItem = ({ label, value, onEdit }) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>
        {label}: {value}
      </Text>
      <TouchableOpacity onPress={onEdit}>
        <Ionicons name="pencil" size={20} color="#1D5DB5" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#5d90d6",
    borderWidth: 3,
    borderColor: "#B88CB4",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#1D5DB5",
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    width: "80%",
    marginTop: 30,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    gap: 10,
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5d90d6",
    backgroundColor: "#5d90d6"
  },
  saveButton: {
    backgroundColor: "#5d90d6",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PerfilUsuario;
