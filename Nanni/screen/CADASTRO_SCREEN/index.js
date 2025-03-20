import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./style"; 

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  // Função para calcular a idade com base na data de nascimento
  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento.split("/").reverse().join("-")); // Transforma "DD/MM/AAAA" em "AAAA-MM-DD"
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--; // Se ainda não completou o aniversário, subtrai 1
    }
    return idade;
  };

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha || !dataNascimento) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }
    const idade = calcularIdade(dataNascimento);
    if (idade < 13) {
      Alert.alert("Erro", "A idade mínima para usar este aplicativo é 13 anos!");
      return;
    }
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    navigation.navigate("Login");
  };

  const onChangeDate = (event, selectedDate) => {
    setMostrarDatePicker(false);
    if (selectedDate) {
      const dia = String(selectedDate.getDate()).padStart(2, "0");
      const mes = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const ano = selectedDate.getFullYear();
      setDataNascimento(`${dia}/${mes}/${ano}`); // Formato "DD/MM/AAAA"
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#A349A4"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A349A4"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity onPress={() => setMostrarDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor="#A349A4"
            value={dataNascimento}
            editable={false} // Impede edição direta
          />
        </TouchableOpacity>

        {mostrarDatePicker && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={new Date()}
            onChange={onChangeDate}
          />
        )}

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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Senha"
            placeholderTextColor="#A349A4"
            secureTextEntry={!mostrarConfirmarSenha}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
            <Text style={styles.showPasswordText}>
              {mostrarConfirmarSenha ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
