import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, SafeAreaView, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'; // Importe ícones se desejar
import styles from "./style"; // Importe o arquivo de estilos

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    pedirPermissaoCameraRoll();
  }, []);

  const pedirPermissaoCameraRoll = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos da sua permissão para acessar a galeria de fotos para adicionar uma foto de perfil.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    }
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento.split("/").reverse().join("-"));
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
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
      setDataNascimento(`${dia}/${mes}/${ano}`);
    }
  };

  const selecionarFotoPerfil = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setFotoPerfil(result.uri);
      }
    } catch (error) {
      console.log('Erro ao selecionar foto:', error);
      Alert.alert('Erro', 'Houve um problema ao selecionar a foto. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro</Text>

        <TouchableOpacity style={styles.fotoPerfilContainerRectangular} onPress={selecionarFotoPerfil}>
          {fotoPerfil ? (
            <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfilRectangular} />
          ) : (
            <View style={styles.fotoPerfilPlaceholderRectangular}>
              <Ionicons name="camera-outline" size={30} color="#071934" />
              <Text style={styles.textoFotoPerfilRectangular}>Adicionar Foto de Perfil (Opcional)</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#071934"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#071934"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity onPress={() => setMostrarDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor="#071934"
            value={dataNascimento}
            editable={false}
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
            placeholderTextColor="#071934"
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
            placeholderTextColor="#071934"
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
};

export default Cadastro;