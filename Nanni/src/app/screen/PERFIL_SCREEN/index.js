import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker'; // 📷 Biblioteca para selecionar imagem
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { db, auth } from '../../../service/firebase/conexao';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import BotaoVoltar from '../../components/buttons/BotaoVoltar/index';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index';
import { useAuth } from '../../components/contexts/AuthContext';
import {
  convertImageToBase64,
  deconvertBase64ToImage,
  isPngImage,
} from '../../../utils/Base64Image';
import Toast from 'react-native-toast-message';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification, verifyBeforeUpdateEmail } from 'firebase/auth';
import CARREGAMENTO_SCREEN from '../CARREGAMENTO_SCREEN/index';
import { USUARIOS_COLLECTION } from '../../../model/refsCollection';
import { navigationRef } from '../../../../App';
import { userRef } from '../../../utils/userRef';
import DoacaoModel from '../../../model/Doacao/DoacaoModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const PerfilUsuario = ({ navigation }) => {
  const { user, loading: authLoading, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Adicione este state
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNaci, setDataNaci] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [campoEdicao, setCampoEdicao] = useState('');
  const [valorEdicao, setValorEdicao] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [historicoDoacoes, setHistoricoDoacoes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (authLoading || !user) return;

      setIsLoading(true);

      try {
        const userRefe = doc(db, USUARIOS_COLLECTION, user.uid);
        const docSnap = await getDoc(userRefe);

        if (!docSnap.exists()) return;

        const data = docSnap.data();
        setNome(data.nome || '');
        setEmail(data.email || '');
        setDataNaci(
          data.dataNascimento
            ? new Date(data.dataNascimento).toLocaleDateString()
            : '',
        );

        if (data.avatar) {
          setFotoPerfil(deconvertBase64ToImage(data.avatar) || '');
        }

        const dados = await DoacaoModel.fetchByUserRefGive(userRef(user.uid));

        // Buscar nome de quem recebeu a doação (userRefTake)
        const dadosComNome = await Promise.all(
          dados.map(async (doacao) => {
            let nomeUsuario = 'Desconhecido';
            try {
              const userDoc = await getDoc(doacao.userRefTake);
              if (userDoc.exists()) {
                nomeUsuario = userDoc.data().nome || 'Sem nome';
              }
            } catch (e) {
              console.warn('Erro ao buscar userRefTake:', e);
            }

            return {
              ...doacao,
              nomeUsuarioTake: nomeUsuario,
            };
          }),
        );

        setHistoricoDoacoes(dadosComNome);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar perfil');
      } finally {
        setIsLoading(false);
      }
    };

    carregarDadosUsuario();
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return <CARREGAMENTO_SCREEN />;
  }

  // Função para abrir o modal e editar um campo específico
  const editarCampo = (campo, valorAtual) => {
    setCampoEdicao(campo);
    setValorEdicao(valorAtual);
    setModalVisible(true);
  };

  // Função para salvar a edição
  const salvarEdicao = async () => {
    try {
      setIsSaving(true);
      if (!user) {
        alert('Usuário não autenticado');
        return;
      }

      const updates = {};

      if (campoEdicao === 'Nome') {
        updates.nome = valorEdicao;
        await updateDoc(doc(db, USUARIOS_COLLECTION, auth.currentUser.uid), updates);
        setNome(valorEdicao);
        Toast.show({
          type: 'success',
          text1: 'Nome atualizado!',
          text2: 'A alteração no nome foi salva com sucesso!',
        });
      } else if (campoEdicao === 'Email') {
        if (valorEdicao === user.email) {
          Toast.show({
            type: 'warning',
            text1: 'Email igual',
            text2: 'Insira um e-mail diferente do atual!',
          });
          return;
        }

        if (!senhaAtual) {
          Toast.show({
            type: 'warning',
            text1: 'Preencha o campo senha',
            text2: 'Senha obrigatória para alteração!',
          });
          return;
        }

        const isEmailPassword = user.providerData.some(
          (provider) => provider.providerId === 'password'
        );

        if (!isEmailPassword) {
          alert('Altere seu e-mail diretamente no provedor de autenticação utilizado (Google, etc.)');
          return;
        }

        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          senhaAtual
        );
  
        await reauthenticateWithCredential(auth.currentUser, credential);
        // Atualiza o email na autenticação
        await verifyBeforeUpdateEmail(auth.currentUser, valorEdicao);

        await auth.currentUser.reload();

        await sendEmailVerification(auth.currentUser);

        // Atualiza o email no Firestore
        updates.email = valorEdicao;
        setEmail(valorEdicao);
        setSenhaAtual('');

        Toast.show({
          type: 'success',
          text1: 'E-mail atualizado!',
          text2: 'Verifique sua caixa de entrada para confirmar o novo e-mail.',
        });
        await updateDoc(doc(db, USUARIOS_COLLECTION, auth.currentUser.uid), updates);
        await logout();
      }
      // Atualiza o Firestore
      setIsSaving(false);
      setModalVisible(false);
    } catch (error) {
      setIsSaving(false);
      console.error('Erro ao salvar edição:', error);

      // Tratamento específico de erros
      if (error.code === 'auth/email-already-in-use') {
        alert('Este email já está em uso por outra conta');
      } else if (error.code === 'auth/requires-recent-login') {
        try {
          await logout();
          navigationRef.current?.resetRoot({
            index: 0,
            routes: [{ name: 'Login' }],
          });
          alert('Sessão expirada. Faça login novamente para continuar');
        } catch (logoutError) {
          console.error('Erro ao fazer logout:', logoutError);
        }
      } else if (!auth.currentUser.emailVerified) {
        alert('Verifique seu e-mail antes de alterá-lo.');
        return;
      } else {
        alert('Erro ao salvar alterações: ' + error.message);
      }

      // Reverte o estado em caso de erro
      if (campoEdicao === 'Email') {
        setEmail(user.email);
      }
    }
  };

  // Função para escolher uma nova foto
  const mudarFotoPerfil = async () => {
    try {
      let resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!resultado.canceled) {
        const uri = resultado.assets[0].uri;

        if (!isPngImage(uri)) {
          Toast.show({
            type: 'warning',
            text1: 'Formato inválido!',
            text2: 'Apenas imagens PNG são permitidas.',
          });
          return;
        }

        const base64 = await convertImageToBase64(uri);

        if (base64) {
          // Referência ao documento do usuário
          const userRef = doc(db, USUARIOS_COLLECTION, user.uid);

          // Atualize apenas o campo avatar
          await updateDoc(userRef, {
            avatar: base64,
          });

          setFotoPerfil(deconvertBase64ToImage(base64));
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      alert('Erro ao salvar nova foto');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await logout();
              navigationRef.current?.resetRoot({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              alert('Erro ao fazer logout. Tente novamente.');
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.logoutButton}>
            <TouchableOpacity
              style={{ flexDirection: 'row', gap: 10 }}
              onPress={() => handleLogout()}
            >
              <Text style={{ fontSize: 15 }}>SAIR</Text>
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Foto de Perfil */}
        <View style={styles.profileContainer}>
          <Image source={fotoPerfil} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon} onPress={mudarFotoPerfil}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Informações do Usuário */}
        <View style={styles.infoContainer}>
          <InfoItem
            label="Nome"
            value={nome}
            onEdit={() => editarCampo('Nome', nome)}
          />
          <InfoItem
            label="Email"
            value={email}
            onEdit={() => editarCampo('Email', email)}
          />
          <InfoItem label="Data de nascimento" value={dataNaci} />
        </View>

        {/* Histórico de Doações */}
        <View style={{ paddingBottom: insets.bottom, width: '80%'}}>
          <TouchableOpacity
            onPress={() => setMostrarHistorico(!mostrarHistorico)}
          >
            <View style={styles.linkButton}>
              <View>
                <Text 
                  style={styles.linkText}
                  numberOfLines={1}
                >
                  HISTÓRICO DE DOAÇÕES
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={mostrarHistorico ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={18}
                  color="#1D3557"
                />
              </View>
            </View>
          </TouchableOpacity>

          {mostrarHistorico && (
            <ScrollView style={{ maxHeight: 240, width: '100%'}}>
              {historicoDoacoes.map((item) => (
                <View key={item.id} style={[styles.historicoItem, historicoDoacoes[historicoDoacoes.length - 1].id === item.id && { borderBottomWidth: 0 }]}>
                  <View>
                    <Text style={{ color: '#5D90D6' }}>ID: {item.id}</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Usuário: {item.nomeUsuarioTake}
                    </Text>
                    <Text style={{ color: 'gray' }}>
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#B88CB4',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* MODAL PARA EDITAR INFORMAÇÕES */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar {campoEdicao}</Text>
            <TextInput
              style={styles.input}
              value={valorEdicao}
              onChangeText={setValorEdicao}
              keyboardType={campoEdicao === 'Idade' ? 'numeric' : 'default'}
            />
            {/* Campo de senha (aparece apenas para email) */}
            {campoEdicao === 'Email' && (
              <TextInput
                style={styles.input}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                secureTextEntry={true}
                placeholder="Senha atual"
                autoCapitalize="none"
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={salvarEdicao}
              >
              {isSaving ? (
                <ActivityIndicator color="#fff" /> // Ícone de carregamento
              ) : (
                <Text style={styles.modalButtonText}>Salvar</Text>
              )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Componente para exibir as informações com botão de edição
const InfoItem = ({ label, value, onEdit }) => {
  return (
    <View style={styles.infoBox}>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoText}>{value}</Text>
      </View>
      {onEdit && (
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="#1D5DB5" />
        </TouchableOpacity>
      )}
    </View>
  );
};

PerfilUsuario.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
};

export default PerfilUsuario;
