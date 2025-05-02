import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Image,
} from 'react-native';
import styles from './style';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../service/firebase/conexao';
import PropTypes from 'prop-types';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const logo = require('../../../assets/logo_nanni.png');

const RecuperarSenha = ({ navigation }) => {
    const [email, setEmail] = useState(''); // Corrigido: useState('')
    const [isEnviandoEmail, setIsEnviandoEmail] = useState(false);

    const handleEnviarEmail = async () => {
        if (isEnviandoEmail) return;

        if (!email) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Por favor, informe seu e-mail.',
            });
            return;
        }

        try {
            setIsEnviandoEmail(true);
            await sendPasswordResetEmail(auth, email);

            Toast.show({
                type: 'success',
                text1: 'Email enviado!',
                text2: `Verifique sua caixa de entrada em ${email}`,
            });
            navigation.goBack();
        } catch (error) {
            let mensagemErro = 'Ocorreu um erro ao enviar o email. Tente novamente.';

            switch (error.code) {
                case 'auth/user-not-found':
                    mensagemErro = 'Nenhum usuário encontrado com este email.';
                    break;
                case 'auth/invalid-email':
                    mensagemErro = 'Endereço de email inválido.';
                    break;
                case 'auth/too-many-requests':
                    mensagemErro = 'Muitas tentativas. Tente novamente mais tarde.';
                    break;
            }

            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: mensagemErro,
            });
        } finally {
            setIsEnviandoEmail(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="#071934" />
                </TouchableOpacity>

                <Image source={logo} style={styles.logo} />
                <Text style={styles.titulo}>RECUPERAR SENHA</Text>

                <Text style={styles.subtitulo}>
                    Informe seu e-mail para receber o código de recuperação.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor={styles.input.borderColor}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={handleEnviarEmail}
                    disabled={isEnviandoEmail}
                >
                    {isEnviandoEmail ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.botaoTexto}>Enviar Código</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

RecuperarSenha.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

export default RecuperarSenha;
