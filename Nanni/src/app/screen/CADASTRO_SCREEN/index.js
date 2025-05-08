import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../service/firebase/conexao';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import calcularIdade from '../../../utils/FuncCalcIdade';
import {
  convertImageToBase64,
  isPngImage,
} from '../../../utils/Base64Image.js';
import { Ionicons } from '@expo/vector-icons'; // Importe ícones se desejar
import Toast from 'react-native-toast-message';
import { USUARIOS_COLLECTION } from '../../../model/refsCollection.js';

export default function Cadastro({ navigation }) {
  const defaultImageUri = Image.resolveAssetSource(
    require('../../../assets/perfil2.png'),
  ).uri;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState('');
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(defaultImageUri);

  useEffect(() => {
    pedirPermissaoCameraRoll();
  }, []);

  const pedirPermissaoCameraRoll = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos da sua permissão para acessar a galeria de fotos para adicionar uma foto de perfil.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }
    }
  };

  // Função de validação de senha
  const validarSenha = (senha) => {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/;
    return regexSenha.test(senha);
  };

  // Função para validar o formato do e-mail
  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !dataNascimento) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert(
        'E-mail inválido',
        'Por favor, insira um endereço de e-mail válido!',
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    if (!validarSenha(senha)) {
      Alert.alert(
        'Senha inválida',
        'A senha deve conter:\n' +
          '- 8 a 25 caracteres\n' +
          '- 1 letra maiúscula\n' +
          '- 1 letra minúscula\n' +
          '- 1 número\n' +
          '- 1 caractere especial (@$!%*?&)',
      );
      return;
    }

    const idade = calcularIdade(dataNascimento.toLocaleDateString('pt-BR'));
    if (idade < 13) {
      Alert.alert(
        'Erro',
        'A idade mínima para usar este aplicativo é 13 anos!',
      );
      return;
    }

    setLoading(true);

    try {
      let avatar;

      // Converter para Base64 apenas se houver foto
      if (fotoPerfil) {
        avatar = await convertImageToBase64(fotoPerfil);

        // Validação da imagem
        if (avatar === null) {
          Toast.show({
            type: 'error',
            text1: 'Avatar inválido!',
            text2: 'Use um avatar valido.',
          });
          return; // Impede o cadastro
        }
      }

      // Cria o usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );

      // Salva dados adicionais no Firestore
      await setDoc(doc(db, USUARIOS_COLLECTION, userCredential.user.uid), {
        avatar,
        nome,
        email,
        dataNascimento: dataNascimento.toISOString(),
        cargo: false,
      });

      // Envia o e-mail de verificação
      await sendEmailVerification(userCredential.user);

      // Desloga o usuário após enviar o e-mail
      await signOut(auth);

      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado!',
        text2: 'Verifique seu e-mail antes de fazer login',
      });

      navigation.navigate('Login');
    } catch (error) {
      let errorMessage = 'Erro ao cadastrar. Tente novamente.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha não atende aos requisitos de segurança!';
          break;
      }

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setMostrarDatePicker(false);
    if (selectedDate) {
      setDataNascimento(selectedDate);
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

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (!isPngImage(uri)) {
          Toast.show({
            type: 'warning',
            text1: 'Formato inválido!',
            text2: 'Apenas imagens PNG são permitidas.',
          });
          return;
        }
        setFotoPerfil(uri);
      }
    } catch (error) {
      console.log('Erro ao selecionar foto:', error);
      Alert.alert(
        'Erro',
        'Houve um problema ao selecionar a foto. Por favor, tente novamente.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro</Text>

        <TouchableOpacity
          style={styles.fotoPerfilContainerCircular}
          onPress={selecionarFotoPerfil}
        >
          {fotoPerfil ? (
            <Image
              source={{ uri: fotoPerfil }}
              style={styles.fotoPerfilCircular}
            />
          ) : (
            <View style={styles.fotoPerfilPlaceholderCircular}>
              <Ionicons name="camera-outline" size={30} color="#071934" />
              <Text style={styles.textoFotoPerfilCircular}>
                Adicionar Foto de Perfil (Opcional)
              </Text>
            </View>
          )}
        </TouchableOpacity>

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
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          onPress={() => setMostrarDatePicker(true)}
          style={styles.touchable_opacity}
        >
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor="#A349A4"
            value={
              dataNascimento ? dataNascimento.toLocaleDateString('pt-BR') : ''
            }
            editable={false}
          />
        </TouchableOpacity>

        {mostrarDatePicker && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            value={new Date()}
            onChange={onChangeDate}
            maximumDate={new Date()}
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
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Text style={styles.showPasswordText}>
              {mostrarSenha ? 'Ocultar' : 'Mostrar'}
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
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
          >
            <Text style={styles.showPasswordText}>
              {mostrarConfirmarSenha ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.botao, loading && styles.botaoDesativado]}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

Cadastro.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
