import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { FlatList } from 'react-native';
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
} from '../../../utils/Base64Image';
import { updateEmail } from 'firebase/auth';
import CARREGAMENTO_SCREEN from '../CARREGAMENTO_SCREEN/index';

const PerfilUsuario = ({ navigation }) => {
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Adicione este state

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNaci, setDataNaci] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [campoEdicao, setCampoEdicao] = useState('');
  const [valorEdicao, setValorEdicao] = useState('');
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const historicoDoacoes = [
    { id: '1', name: "Forum", data: '10/02/2024' , valor: "20,15"},
    { id: '2', name: "Forum", data: '22/11/2023' , valor: "32,40"},
    { id: '3', name: "Forum", data: '03/08/2023' , valor: "32,40"},
    { id: '4', name: "Forum", data: '10/02/2024' , valor: "32,40"},
    { id: '5', name: "Forum", data: '22/11/2023' , valor: "32,40"},
    { id: '6', name: "Forum", data: '03/08/2023' , valor: "32,40"},
    { id: '7', name: "Forum", data: '10/02/2024' , valor: "32,40"},
    { id: '8', name: "Forum", data: '22/11/2023' , valor: "32,40"},
    { id: '9', name: "Forum", data: '03/08/2023' , valor: "32,40"},
    { id: '10', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '11', name: "Forum", data: '10/02/2024' , valor: "50,00"},
    { id: '12', name: "Forum", data: '22/11/2023' , valor: "50,00"},
    { id: '13', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '14', name: "Forum", data: '10/02/2024' , valor: "50,00"},
    { id: '15', name: "Forum", data: '22/11/2023' , valor: "50,00"},
    { id: '16', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '17', name: "Forum", data: '10/02/2024' , valor: "50,00"},
    { id: '18', name: "Forum", data: '22/11/2023' , valor: "50,00"},
    { id: '19', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '20', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '21', name: "Forum", data: '10/02/2024' , valor: "50,00"},
    { id: '22', name: "Forum", data: '22/11/2023' , valor: "50,00"},
    { id: '23', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '24', name: "Forum", data: '10/02/2024' , valor: "50,00"},
    { id: '25', name: "Forum", data: '22/11/2023' , valor: "50,00"},
    { id: '26', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '27', name: "Forum", data: '10/02/2024' , valor: "50,00"},
    { id: '28', name: "Forum", data: '22/11/2023' , valor: "50,00"},
    { id: '29', name: "Forum", data: '03/08/2023' , valor: "50,00"},
    { id: '30', name: "Forum", data: '03/08/2023' , valor: "50,00"},

  ];


  useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (authLoading || !user) return;

      setIsLoading(true);

      try {
        const userRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(userRef);

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
      if (!user) {
        alert('Usuário não autenticado');
        return;
      }

      const updates = {};

      if (campoEdicao === 'Nome') {
        updates.nome = valorEdicao;
        setNome(valorEdicao);
      } else if (campoEdicao === 'Email') {
        // Atualiza o email na autenticação
        await updateEmail(auth.currentUser, valorEdicao);

        // Atualiza o email no Firestore
        updates.email = valorEdicao;
        setEmail(valorEdicao);
      } else if (campoEdicao === 'Data de nascimento') {
        updates.idade = Number(valorEdicao);
        setDataNaci(valorEdicao);
      }

      // Atualiza o Firestore
      await updateDoc(doc(db, 'usuarios', user.uid), updates);

      setModalVisible(false);
      alert('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar edição:', error);

      // Tratamento específico de erros
      if (error.code === 'auth/email-already-in-use') {
        alert('Este email já está em uso por outra conta');
      } else if (error.code === 'auth/requires-recent-login') {
        try {
          await auth.signOut();
          navigation.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
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
        const base64 = await convertImageToBase64(uri);

        if (base64) {
          // Referência ao documento do usuário
          const userRef = doc(db, 'usuarios', user.uid);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Deslogar */}

      <View style={styles.header}>
        <View style={styles.logoutButton}>
          <TouchableOpacity style={{flexDirection:"row", gap: 10}} onPress={()=> alert("Saindo da Conta...")}>
            <Text style={{fontSize: 15}}>SAIR</Text>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Área de Foto de Perfil */}
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
        <InfoItem
          label="Data de nascimento"
          value={dataNaci}
        />
      </View>

      {/* Botão de texto com seta */}
      <View style={styles.linkButtonContainer}>
        <TouchableOpacity onPress={() => setMostrarHistorico(!mostrarHistorico)}>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>HISTÓRICO DE DOAÇÕES</Text>
            <Ionicons
              name={mostrarHistorico ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={18}
              color="#1D3557"
            />
          </View>
        </TouchableOpacity>

        {mostrarHistorico && (
          <FlatList
            data={historicoDoacoes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => ( //historicoItem
              <View style={styles.historicoItem}>
                <View>
                  <Text style={{color: "#5D90D6"}}>ID: {item.id}</Text>
                  <Text style={{fontWeight: 'bold'}}>Forum: {item.name}</Text>
                  <Text style={{color:"gray"}}>{item.data}</Text>
                </View>
                <Text style={{color:"#B88CB4", fontWeight: "bold", fontSize: 20}}>{item.valor} R$</Text>
              </View>
            )}
            style={{ maxHeight: 240 }} // define altura máxima rolável
          />
        )}
      </View>


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
                <Text style={styles.modalButtonText}>Salvar</Text>
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
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
};

export default PerfilUsuario;
