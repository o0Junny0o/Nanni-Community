import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import styles from "./style";

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isEnviandoEmail, setIsEnviandoEmail] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Recuperar Senha</Text>

        <Text style={styles.subtitulo}>Informe seu e-mail para receber o código de recuperação.</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#071934"
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
      </View>
    </SafeAreaView>
  );
};

export default RecuperarSenha;