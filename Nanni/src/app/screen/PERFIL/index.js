import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker'; // 📷 Biblioteca para selecionar imagem
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import BotaoVoltar from '../../components/buttons/BotaoVoltar/index';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index';

const PerfilUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('Nome');
  const [email, setEmail] = useState('email@email.com');
  const [idade, setIdade] = useState('20');
  const [fotoPerfil, setFotoPerfil] = useState(
    require('../../../assets/perfil2.png'),
  ); // Foto padrão

  const [modalVisible, setModalVisible] = useState(false);
  const [campoEdicao, setCampoEdicao] = useState('');
  const [valorEdicao, setValorEdicao] = useState('');

  // Função para abrir o modal e editar um campo específico
  const editarCampo = (campo, valorAtual) => {
    setCampoEdicao(campo);
    setValorEdicao(valorAtual);
    setModalVisible(true);
  };

  // Função para salvar a edição
  const salvarEdicao = () => {
    if (campoEdicao === 'Nome') setNome(valorEdicao);
    else if (campoEdicao === 'Email') setEmail(valorEdicao);
    else if (campoEdicao === 'Idade') setIdade(valorEdicao);

    setModalVisible(false);
  };

  // Função para escolher uma nova foto
  const mudarFotoPerfil = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFotoPerfil({ uri: resultado.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Voltar */}
      <View style={styles.header}>
        <BotaoVoltar onPress={() => navigation.goBack()} />
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
          label="Idade"
          value={idade}
          onEdit={() => editarCampo('Idade', idade)}
        />
      </View>

      {/* Botões de Navegação */}
      <View style={styles.buttonContainer}>
        <BotaoPadrao
          onPress={() => alert('Ir para tela de DOAÇÕES')}
          text="Histórico de Doações"
        />
        <BotaoPadrao
          onPress={() => alert('Ir para tela de DADOS')}
          text="Análise de Dados"
        />
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
      <Text style={styles.infoText}>
        {label}: {value}
      </Text>
      <TouchableOpacity onPress={onEdit}>
        <Ionicons name="pencil" size={20} color="#1D5DB5" />
      </TouchableOpacity>
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
  onEdit: PropTypes.func.isRequired,
};

export default PerfilUsuario;
