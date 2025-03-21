import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app, auth } from '../../../service/firebase/conexao';

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

  // Inicializa Firestore
  const db = getFirestore(app);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento.split('/').reverse().join('-'));
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
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

    const idade = calcularIdade(dataNascimento);
    if (idade < 13) {
      Alert.alert(
        'Erro',
        'A idade mínima para usar este aplicativo é 13 anos!',
      );
      return;
    }

    setLoading(true);

    try {
      // Cria o usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );

      // Salva dados adicionais no Firestore
      await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
        nome,
        email,
        dataNascimento: new Date(
          dataNascimento.split('/').reverse().join('-'),
        ).toISOString(),
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
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

      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setMostrarDatePicker(false);
    if (selectedDate) {
      const dia = String(selectedDate.getDate()).padStart(2, '0');
      const mes = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const ano = selectedDate.getFullYear();
      setDataNascimento(`${dia}/${mes}/${ano}`);
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
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity onPress={() => setMostrarDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor="#A349A4"
            value={dataNascimento}
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