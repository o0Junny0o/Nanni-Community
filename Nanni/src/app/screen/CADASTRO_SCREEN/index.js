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
  ScrollView,
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
import Icon from 'react-native-vector-icons/MaterialIcons';

const logo = require('../../../assets/logo_nanni.png');

const passwordRules = [
  {
    id: 'length',
    text: '8 a 25 caracteres',
    regexFull: /^.{8,25}$/,
    regexPart: (val) => val.length >= 8 && val.length <= 25,
  },
  {
    id: 'uppercase',
    text: '1 letra maiúscula',
    regexFull: /(?=.*[A-Z])/,
    regexPart: /[A-Z]/,
  },
  {
    id: 'lowercase',
    text: '1 letra minúscula',
    regexFull: /(?=.*[a-z])/,
    regexPart: /[a-z]/,
  },
  { id: 'number', text: '1 número', regexFull: /(?=.*\d)/, regexPart: /\d/ },
  {
    id: 'special',
    text: '1 caractere especial (@$!%*?&)',
    regexFull: /(?=.*[\W_])/,
    regexPart: /[\W_]/,
  },
];

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
  const [senhaInvalidaTexto, setSenhaInvalidaTexto] = useState('');
  const [confirmarSenhaInvalidaTexto, setConfirmarSenhaInvalidaTexto] =
    useState('');

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

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

  const validarSenhaCompleta = (senhaInput) => {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/;
    return regexSenha.test(senhaInput);
  };

  const checkPasswordCriteria = (senhaValue) => {
    const criteriaMet = {};
    passwordRules.forEach((rule) => {
      if (rule.id === 'length') {
        criteriaMet[rule.id] = rule.regexPart(senhaValue);
      } else {
        criteriaMet[rule.id] = rule.regexPart.test(senhaValue);
      }
    });
    return criteriaMet;
  };

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const handleCadastro = async () => {
    let temErro = false;
    setSenhaInvalidaTexto('');
    setConfirmarSenhaInvalidaTexto('');

    if (!nome || !email || !senha || !confirmarSenha || !dataNascimento) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      temErro = true;
    }

    if (email && !validarEmail(email)) {
      Alert.alert(
        'E-mail inválido',
        'Por favor, insira um endereço de e-mail válido!',
      );
      temErro = true;
    }

    if (senha !== confirmarSenha) {
      setConfirmarSenhaInvalidaTexto('As senhas não coincidem!');
      temErro = true;
    }

    if (!validarSenhaCompleta(senha)) {
      setSenhaInvalidaTexto(
        'A senha não atende a todos os critérios listados.',
      );
      temErro = true;
    }

    
    if (dataNascimento) {
      const idade = calcularIdade(String(dataNascimento));
      
      if (idade < 13) {
        Alert.alert(
          'Erro',
          'A idade mínima para usar este aplicativo é 13 anos!',
        );
        temErro = true;
      }
    }

    
    if (temErro) {
      return;
    }

    setLoading(true);

    try {
      let avatar;
      if (fotoPerfil && fotoPerfil !== defaultImageUri) {
        if (!isPngImage(fotoPerfil)) {
          Toast.show({
            type: 'warning',
            text1: 'Formato inválido!',
            text2: 'Apenas imagens PNG são permitidas para o avatar.',
          });
          setLoading(false);
          return;
        }
        avatar = await convertImageToBase64(fotoPerfil);
        if (!avatar) {
          Toast.show({
            type: 'error',
            text1: 'Erro ao converter avatar!',
            text2: 'Tente novamente com outra imagem.',
          });
          setLoading(false);
          return;
        }
      } else {
        avatar = null;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );
      await setDoc(doc(db, USUARIOS_COLLECTION, userCredential.user.uid), {
        avatar,
        nome,
        email,
        dataNascimento: dataNascimento.toISOString(),
        cargo: false,
      });

      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado!',
        text2: 'Verifique seu e-mail antes de fazer login.',
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
          errorMessage =
            'A senha é muito fraca. Certifique-se de que atende aos critérios.';
          break;
      }
      Toast.show({ type: 'error', text1: 'Erro', text2: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setMostrarDatePicker(false);
    if (event.type === 'set' && selectedDate) {
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

  const handleSenhaInputChange = (text) => {
    setSenha(text);
    const criteria = checkPasswordCriteria(text);
    setPasswordCriteria(criteria);

    if (senhaInvalidaTexto) {
      setSenhaInvalidaTexto('');
    }
    if (confirmarSenha && text !== confirmarSenha) {
      setConfirmarSenhaInvalidaTexto('As senhas não coincidem!');
    } else if (confirmarSenha && text === confirmarSenha) {
      setConfirmarSenhaInvalidaTexto('');
    }
  };

  const handleConfirmarSenhaChange = (text) => {
    setConfirmarSenha(text);
    if (senha !== text) {
      setConfirmarSenhaInvalidaTexto('As senhas não coincidem!');
    } else {
      setConfirmarSenhaInvalidaTexto('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.titulo}>CADASTRO</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.fotoPerfilContainerCircular,
              { borderColor: styles.input.borderColor },
            ]}
            onPress={selecionarFotoPerfil}
          >
            {fotoPerfil ? (
              <Image
                source={{ uri: fotoPerfil }}
                style={styles.fotoPerfilCircular}
              />
            ) : (
              <View
                style={[
                  styles.fotoPerfilPlaceholderCircular,
                  { backgroundColor: styles.input.borderColor },
                ]}
              >
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={styles.textoFotoPerfilCircular.color}
                />
                <Text style={styles.textoFotoPerfilCircular}>
                  Adicionar Foto de Perfil (Opcional)
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={[styles.input, { borderColor: styles.input.borderColor }]}
            placeholder="Nome"
            placeholderTextColor={styles.input.borderColor}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={[styles.input, { borderColor: styles.input.borderColor }]}
            placeholder="Email"
            placeholderTextColor={styles.input.borderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            onPress={() => setMostrarDatePicker(true)}
            style={styles.touchable_opacity}
          >
            <View style={styles.dateInputContainer}>
              <TextInput
                style={[
                  styles.dateInput,
                  { flex: 1 },
                  { borderColor: styles.input.borderColor },
                ]}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                placeholderTextColor={styles.input.borderColor}
                value={
                  dataNascimento
                    ? dataNascimento.toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                      })
                    : ''
                }
                editable={false}
                pointerEvents="none"
              />
              <Icon
                name="event"
                size={24}
                color={styles.input.borderColor}
                style={styles.calendarIcon}
              />
            </View>
          </TouchableOpacity>

          {mostrarDatePicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              value={dataNascimento || new Date()}
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          {/* --- SEÇÃO SENHA MODIFICADA --- */}
          <View style={styles.fieldContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  { borderColor: styles.input.borderColor },
                ]}
                placeholder="Senha"
                placeholderTextColor={styles.input.borderColor}
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={handleSenhaInputChange}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Ionicons
                  name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color={styles.input.borderColor}
                />
              </TouchableOpacity>
            </View>

            {senha.length > 0 && (
              <View style={styles.passwordHelperContainer}>
                {passwordRules.map((rule) => (
                  <Text
                    key={rule.id}
                    style={[
                      styles.passwordHelperTextItem,
                      passwordCriteria[rule.id]
                        ? styles.passwordHelperTextValid
                        : styles.passwordHelperTextInvalid,
                    ]}
                  >
                    {rule.text}
                  </Text>
                ))}
              </View>
            )}

            {senhaInvalidaTexto ? (
              <Text style={styles.errorText}>{senhaInvalidaTexto}</Text>
            ) : null}
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  { borderColor: styles.input.borderColor },
                ]}
                placeholder="Confirmar Senha"
                placeholderTextColor={styles.input.borderColor}
                secureTextEntry={!mostrarConfirmarSenha}
                value={confirmarSenha}
                onChangeText={handleConfirmarSenhaChange}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                <Ionicons
                  name={
                    mostrarConfirmarSenha ? 'eye-outline' : 'eye-off-outline'
                  }
                  size={24}
                  color={styles.input.borderColor}
                />
              </TouchableOpacity>
            </View>
            {confirmarSenhaInvalidaTexto ? (
              <Text style={styles.errorText}>
                {confirmarSenhaInvalidaTexto}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.botao, loading && styles.botaoDesativado]}
            onPress={handleCadastro}
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
      </ScrollView>
    </SafeAreaView>
  );
}

Cadastro.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
