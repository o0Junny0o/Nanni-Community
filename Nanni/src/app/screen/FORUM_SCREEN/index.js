import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index';
import { useAuth } from '../../components/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/Conexao';
import {
  deconvertBase64ToImage,
} from '../../../utils/Base64Image';

const Forum = ({ navigation }) => {
  const { user } = useAuth();

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    maisVistos: false,
    maisRecentes: false,
  });

  const [topico, setTopico] = useState([]);
  const [topicosFiltrados, setTopicosFiltrados] = useState([]); // Adicione este estado
  const [topicoTitle, setTopicoTitle] = useState('');
  const [topicoDesc, setTopicoDesc] = useState('');
  const [modal, setModal] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('');
  //const [modalPerfil, setModalPerfil] = useState(false);

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const userRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) return;

        const data = docSnap.data();

        if (data.avatar) {
          setFotoPerfil(
            deconvertBase64ToImage(data.avatar) || '',
          );
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar perfil');
      }
    };

    carregarDadosUsuario();
  }, [user]);

  useEffect(() => {
    // Atualiza os tópicos filtrados sempre que os tópicos originais ou os filtros mudam
    setTopicosFiltrados(aplicarFiltros(topico, filtrosAtivos));
  }, [topico, filtrosAtivos]);

  const CriarNovoTopico = () => {
    if (topicoTitle.trim() === '' || topicoDesc.trim() === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const novoTopico = {
      id: Date.now(),
      title: topicoTitle,
      describe: topicoDesc,
    };
    setTopico([...topico, novoTopico]);
    setTopicoTitle('');
    setTopicoDesc('');
    setModal(false);
  };

  const aplicarFiltros = (topicos, filtros) => {
    let topicosFiltradosLocal = [...topicos];

    if (filtros.maisVistos) {
      topicosFiltradosLocal.sort((a, b) => b.id - a.id);
    } else if (filtros.maisRecentes) {
      topicosFiltradosLocal.sort((a, b) => new Date(b.id) - new Date(a.id));
    }

    return topicosFiltradosLocal;
  };

  const handleFiltrar = (filtro) => {
    setFiltrosAtivos((prevState) => ({
      maisVistos: filtro === 'maisVistos' ? !prevState.maisVistos : false,
      maisRecentes: filtro === 'maisRecentes' ? !prevState.maisRecentes : false,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FÓRUM</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')}>
          <Image
            source={fotoPerfil}
            style={styles.perfilImage}
          />
        </TouchableOpacity>
      </View>

      {topico.length === 0 ? (
        <View style={styles.noTopicsContainer}>
          <Text style={styles.noTopicsText}>Ainda não existem Tópicos</Text>
        </View>
      ) : (
        <View style={styles.fullFlex}>
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filtrosAtivos.maisVistos && styles.filterButtonActive,
              ]}
              onPress={() => handleFiltrar('maisVistos')}
            >
              <Text style={styles.filterButtonText}>Mais Vistos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filtrosAtivos.maisRecentes && styles.filterButtonActive,
              ]}
              onPress={() => handleFiltrar('maisRecentes')}
            >
              <Text style={styles.filterButtonText}>Mais Recentes</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={topicosFiltrados}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.forumItem}
                onPress={() =>
                  navigation.navigate('TopicoScreen', {
                    topicoId: item.id,
                    topicoTitle: item.title,
                    topicoDesc: item.describe,
                  })
                }
              >
                <Text style={styles.forumName}>{item.title}</Text>
                <Text style={styles.forumDescription}>
                  Descrição: {item.describe}
                </Text>
                <Text style={styles.forumDescription}>id: {item.id}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Modal visible={modal} transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlayTouchable}
            onPress={() => setModal(false)}
          />
          <View style={styles.modalTopico}>
            <Text style={styles.modalTitle}>Criar Tópico</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Nome do Tópico"
              onChangeText={setTopicoTitle}
              value={topicoTitle}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder="Descrição"
              onChangeText={setTopicoDesc}
              value={topicoDesc}
            />
            <BotaoPadrao onPress={CriarNovoTopico} text="Criar novo tópico" />
            <BotaoPadrao onPress={() => setModal(false)} text="Cancelar" />
          </View>
          <TouchableOpacity
            style={styles.modalOverlayTouchable}
            onPress={() => setModal(false)}
          />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.createNewForumButton}
        onPress={() => setModal(true)}
      >
        <Text style={styles.createNewForumButtonText}>Novo Tópico</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

Forum.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Forum;