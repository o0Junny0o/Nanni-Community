import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import styles from "./style";

const RedefinirSenha = ({ navigation }) => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarNovaSenha, setMostrarConfirmarNovaSenha] = useState(false);
  const [isRedefinindoSenha, setIsRedefinindoSenha] = useState(false); // Novo estado

  const handleRedefinirSenha = () => {
    if (isRedefinindoSenha) {
      return;
    }
    setIsRedefinindoSenha(true);

    if (!novaSenha || !confirmarNovaSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      setIsRedefinindoSenha(false);
      return;
    }
    if (novaSenha !== confirmarNovaSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      setIsRedefinindoSenha(false);
      return;
    }

    // Aqui você implementaria a lógica para salvar a nova senha no banco de dados
    console.log("Nova senha:", novaSenha);
    Alert.alert("Sucesso", "Senha redefinida com sucesso!");
    navigation.navigate("Login"); // Navega de volta para a tela de login
    setIsRedefinindoSenha(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Redefinir Senha</Text>

        <View style={styles.passwordContainer}> {/* Contêiner para Nova Senha */}
          <TextInput
            style={styles.passwordInput}
            placeholder="Nova Senha"
            placeholderTextColor="#A349A4"
            secureTextEntry={!mostrarNovaSenha}
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
          <TouchableOpacity onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}>
            <Text style={styles.showPasswordText}>
              {mostrarNovaSenha ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}> {/* Contêiner para Confirmar Nova Senha */}
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Nova Senha"
            placeholderTextColor="#A349A4"
            secureTextEntry={!mostrarConfirmarNovaSenha}
            value={confirmarNovaSenha}
            onChangeText={setConfirmarNovaSenha}
          />
          <TouchableOpacity onPress={() => setMostrarConfirmarNovaSenha(!mostrarConfirmarNovaSenha)}>
            <Text style={styles.showPasswordText}>
              {mostrarConfirmarNovaSenha ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={handleRedefinirSenha}
          disabled={isRedefinindoSenha} // Desabilita o botão enquanto está redefinindo
        >
          {isRedefinindoSenha ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoTexto}>Redefinir Senha</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RedefinirSenha;