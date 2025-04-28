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
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app, auth } from '../../../service/firebase/conexao';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import calcularIdade from '../../../utils/FuncCalcIdade';
import { convertImageToBase64 } from '../../../utils/Base64Image.js';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { USUARIOS_COLLECTION } from '../../../model/refsCollection.js';

const logo = require('../../../assets/logo_nanni.png');

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState('');
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(
    Image.resolveAssetSource(require('../../../assets/perfil2.png')).uri,
  );
  const [senhaInvalidaTexto, setSenhaInvalidaTexto] = useState('');
  const [confirmarSenhaInvalidaTexto, setConfirmarSenhaInvalidaTexto] = useState('');

  const db = getFirestore(app);

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
          { cancelable: false },
        );
      }
    }
  };

  const validarSenha = (senha) => {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/;
    return regexSenha.test(senha);
  };

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const handleCadastro = async () => {
    let temErro = false;

    if (!nome || !email || !senha || !confirmarSenha || !dataNascimento) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      temErro = true;
    }

    if (!validarEmail(email)) {
      Alert.alert(
        'E-mail inválido',
        'Por favor, insira um endereço de e-mail válido!',
      );
      temErro = true;
    }

    if (senha !== confirmarSenha) {
      setConfirmarSenhaInvalidaTexto('As senhas não coincidem!');
      temErro = true;
    } else {
      setConfirmarSenhaInvalidaTexto('');
    }

    if (!validarSenha(senha)) {
      setSenhaInvalidaTexto(
        'A senha deve conter:\n' +
        '- 8 a 25 caracteres\n' +
        '- 1 letra maiúscula\n' +
        '- 1 letra minúscula\n' +
        '- 1 número\n' +
        '- 1 caractere especial (@$!%*?&)'
      );
      temErro = true;
    } else {
      setSenhaInvalidaTexto('');
    }

    const idade = calcularIdade(dataNascimento.toLocaleDateString('pt-BR'));
    if (idade < 13) {
      Alert.alert(
        'Erro',
        'A idade mínima para usar este aplicativo é 13 anos!',
      );
      temErro = true;
    }

    if (temErro) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );

      let avatar = null;
      if (fotoPerfil) {
        avatar = await convertImageToBase64(fotoPerfil);
      }

      await setDoc(doc(db, USUARIOS_COLLECTION, userCredential.user.uid), {
        avatar,
        nome,
        email,
        dataNascimento: dataNascimento.toISOString(),
      });

      await sendEmailVerification(userCredential.user);
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
        setFotoPerfil(result.assets[0].uri);
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
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.titulo}>CADASTRO</Text>
        </View>

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
          placeholderTextColor="#071934"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#071934"
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
            placeholderTextColor="#071934"
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

        <View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#071934"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                if (text.length < 6) {
                  setSenhaInvalidaTexto('A senha deve ter no mínimo 8 caracteres.');
                } else {
                  setSenhaInvalidaTexto('');
                }
              }}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Text style={styles.showPasswordText}>
                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>
          {senhaInvalidaTexto ? (
            <Text style={styles.helperText}>{senhaInvalidaTexto}</Text>
          ) : null}
        </View>

        <View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirmar Senha"
              placeholderTextColor="#071934"
              secureTextEntry={!mostrarConfirmarSenha}
              value={confirmarSenha}
              onChangeText={(text) => {
                setConfirmarSenha(text);
                if (senha !== text) {
                  setConfirmarSenhaInvalidaTexto('As senhas não coincidem!');
                } else {
                  setConfirmarSenhaInvalidaTexto('');
                }
              }}
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
          {confirmarSenhaInvalidaTexto ? (
            <Text style={styles.helperText}>{confirmarSenhaInvalidaTexto}</Text>
          ) : null}
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