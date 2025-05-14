import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ActivityIndicator,
    Image,
} from 'react-native';
import styles from './style';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../service/firebase/conexao';
import PropTypes from 'prop-types';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const logo = require('../../../assets/logo_nanni.png');

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [senhaInvalidaTexto, setSenhaInvalidaTexto] = useState('');

    const validarSenha = (senha) => {
        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/;
        return regexSenha.test(senha);
    };

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
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
            return;
        } else {
            setSenhaInvalidaTexto('');
        }

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                senha,
            );

            const user = userCredential.user;
            await user.reload();

            if (user.emailVerified) {
                navigation.navigate('MainStack');
            } else {
                await auth.signOut();

                Toast.show({
                    type: 'warning',
                    text1: 'Verificação pendente!',
                    text2: 'Por favor, verifique seu e-mail antes de fazer login.',
                });
            }
        } catch (error) {
            let errorMessage = 'Erro ao fazer login. Tente novamente.';

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Esta conta foi desativada.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Utilizador não encontrado.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta.';
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

                <Text style={styles.titulo}>LOGIN</Text>

                <TextInput
                    style={[styles.input, { borderColor: styles.input.borderColor }]}
                    placeholder="Email"
                    placeholderTextColor={styles.input.borderColor}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.passwordInput, { borderColor: styles.input.borderColor }]}
                            placeholder="Senha"
                            placeholderTextColor={styles.input.borderColor}
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={(text) => {
                                setSenha(text);
                                if (!validarSenha(text)) {
                                    setSenhaInvalidaTexto(
                                        'A senha deve conter:\n' +
                                        '- 8 a 25 caracteres \n' +
                                        '- 1 letra maiúscula \n' +
                                        '- 1 letra minúscula \n' +
                                        '- 1 número \n' +
                                        '- 1 caractere especial (@$!%*?&)'
                                    );
                                } else {
                                    setSenhaInvalidaTexto('');
                                }
                            }}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                            <Ionicons
                                name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color={styles.softLilac}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.helperText}>A senha deve conter: 8 a 25 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 especial (@$!%*&).</Text>
                    {senhaInvalidaTexto ? (
                        <Text style={styles.errorText}>{senhaInvalidaTexto}</Text>
                    ) : null}
                </View>

                {loading && (
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="#071934" />
                    </View>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
                    <Text style={styles.forgotPasswordLink}>Esqueci a senha</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                    <Text style={styles.botaoTexto}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.link}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

Login.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
