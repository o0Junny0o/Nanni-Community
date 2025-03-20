import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import styles from "./style";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    // Simula sucesso no login
    Alert.alert("Sucesso", "Login realizado com sucesso!");
    // TODO: Adicionar lógica de autenticação aqui
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Login</Text>

        {/* Campo de entrada para email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A349A4"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#A349A4"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Text style={styles.showPasswordText}>
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

    
        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.link}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
