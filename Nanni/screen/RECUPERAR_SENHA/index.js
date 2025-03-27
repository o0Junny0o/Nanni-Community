import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import styles from "./style";

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [isEnviandoEmail, setIsEnviandoEmail] = useState(false);
  const [isVerificandoCodigo, setIsVerificandoCodigo] = useState(false);

  const handleEnviarEmail = async () => {
    if (isEnviandoEmail) {
      return;
    }
    setIsEnviandoEmail(true);
    if (!email) {
      Alert.alert("Erro", "Por favor, informe seu e-mail.");
      setIsEnviandoEmail(false);
      return;
    }
    console.log("Enviar código para:", email);
    // Simule o envio do email
    await new Promise(resolve => setTimeout(resolve, 1000));
    Alert.alert("Código Enviado", `Um código de recuperação foi enviado para o e-mail: ${email}`);
    setIsEnviandoEmail(false);
  };

  const handleAdicionarCodigo = async () => {
    if (isVerificandoCodigo) {
      return;
    }
    setIsVerificandoCodigo(true);
    if (!codigo) {
      Alert.alert("Erro", "Por favor, informe o código de recuperação.");
      setIsVerificandoCodigo(false);
      return;
    }
    console.log("Código inserido:", codigo);
    // Simule a verificação do código
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (codigo.trim() !== "") {
      Alert.alert("Código Verificado", "Código verificado com sucesso!");
      navigation.navigate("RedefinirSenha");
    } else {
      Alert.alert("Código Inválido", "Por favor, insira o código de recuperação.");
    }
    setIsVerificandoCodigo(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Recuperar Senha</Text>

        <Text style={styles.subtitulo}>Informe seu e-mail para receber o código de recuperação.</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#A349A4"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleEnviarEmail}
          disabled={isEnviandoEmail}
        >
          {isEnviandoEmail ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.botaoTexto}>Enviar Código</Text>}
        </TouchableOpacity>

        <Text style={styles.subtitulo}>Informe o código de recuperação enviado para o seu e-mail.</Text>

        <TextInput
          style={styles.input}
          placeholder="Adicionar Código"
          placeholderTextColor="#A349A4"
          value={codigo}
          onChangeText={setCodigo}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleAdicionarCodigo}
          disabled={isVerificandoCodigo}
        >
          {isVerificandoCodigo ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.botaoTexto}>Verificar Código</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarSenha;