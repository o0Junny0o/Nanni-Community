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
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index';
import { useAuth } from '../../components/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import forumList from '../../../hooks/forum/forumList';
import forumDelete from '../../../hooks/forum/forumDelete';
import forumUpdate from '../../../hooks/forum/forumUpdate';
import { Ionicons } from '@expo/vector-icons';
import Forum from '../../../model/Forum';
import { StatusBar } from 'react-native';

import { deconvertBase64ToImage } from '../../../utils/Base64Image';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const ForumScreen = ({ navigation }) => {
  const [seguidor, setSeguidor] = useState(false)
  const [mostrarDesc, SetMostrarDesc] = useState(false)
  const { user } = useAuth();

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    maisVistos: false,
    maisRecentes: false,
  });

  const [topicos, setTopicos] = useState([]);
  const [topicoTitle, setTopicoTitle] = useState('');
  const [topicoDesc, setTopicoDesc] = useState('');
  
  const [fotoPerfil, setFotoPerfil] = useState('');
  // Modal Config:
  const [modal, setModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    titulo: "",
    btn: "",
    cancelar: "Cancelar",
    placeholderNome: "Nome do Tópico",
    placeholderDescricao: "Descrição",
    callFunction: () => {},
  })

  const categoriaForum  = [
    {cat: "*18"},
    {cat: "Exemplo"},
    {cat: "Exemplo02"},
    {cat: "Exemplo03"},
    {cat: "Exemplo04"},
    {cat: "Exemplo05"},
  ]

  const categoriaDiscussao  = [
    {cat: "Exemplo 01"},
    {cat: "Exemplo 02"},
  ]

  const closeModal = () => {
    setModal(false)
    setTopicoTitle('');
    setTopicoDesc('');
    setModalConfig({})
  }

  const modalForumConfig = (forum) => {
    setModalConfig({
      titulo: forum ? "Atualizar Fórum" : "Criar Fórum",
      btn: forum ? "Atualizar Fórum" : "Criar novo tópico",
      callFunction: forum ? 
        () => handleUpdateTopico(forum) 
        : CriarNovoTopico,
      cancelar: "Cancelar",
      placeholderNome: "Nome do Tópico",
      placeholderDescricao: "Descrição",
    })

    if(forum instanceof Forum) {
      setTopicoTitle(forum.forumName);
      setTopicoDesc(forum.forumDesc)
    } else {
      setTopicoTitle("");
      setTopicoDesc("")
    }

    setModal(true)  
  }


  const carregarTopicosDoForum = async () => {
    try {
      const listaDeTopicos = await forumList({}); 
      setTopicos(listaDeTopicos);
    } catch (error) {
      console.error('Erro ao carregar tópicos:', error);
      alert('Erro ao carregar os tópicos do fórum.');
    }
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const userRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) return;

        const data = docSnap.data();

        if (data.avatar) {
          setFotoPerfil(deconvertBase64ToImage(data.avatar) || '');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar perfil');
      }
    };

    carregarDadosUsuario();
    carregarTopicosDoForum();
  }, [user]);

  const CriarNovoTopico = async () => {
    console.log(`${topicoTitle.trim() === ''} | ${topicoDesc.trim() === ''}`)

    if (topicoTitle.trim() === '' || topicoDesc.trim() === '') {
      alert('Preencha todos os campos!');
      return;
    }

    if (!user?.uid) {
      alert('Usuário não autenticado.');
      return;
    }

    const novoForumData = new Forum({
      userRef: user.uid,
      forumName: topicoTitle,
      forumDesc: topicoDesc,
      classificacaoIndicativa: 'pg',
    });

    const sucesso = await novoForumData.create();

    if (sucesso) {
      alert('Tópico criado com sucesso!');
      closeModal()
      carregarTopicosDoForum()
    } else {
      alert('Erro ao criar o tópico. Tente novamente.');
    }
  };

  const aplicarFiltros = () => {
    let topicosFiltrados = [...topicos];

    if (filtrosAtivos.maisVistos) {
      topicosFiltrados.sort(
        (a, b) => (b?.classificacaoIndicativa || 0) - (a?.classificacaoIndicativa || 0),
      );
    } else if (filtrosAtivos.maisRecentes) {
      topicosFiltrados.sort(
        (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0),
      );
    }

    return topicosFiltrados;
  };

  const handleFiltrar = (filtro) => {
    setFiltrosAtivos((prevState) => ({
      maisVistos: filtro === 'maisVistos' ? !prevState.maisVistos : false,
      maisRecentes: filtro === 'maisRecentes' ? !prevState.maisRecentes : false,
    }));
  };

  const topicosFiltrados = aplicarFiltros();

  const handleDeleteTopico = async (forumID) => {
    if (!user?.uid) {
      alert('Usuário não autenticado.');
      return;
    }
    console.log(forumID)
    const sucesso = await forumDelete({ forumID: forumID });
    if (sucesso) {
      alert(`Tópico com ID ${forumID} excluído com sucesso!`);
      carregarTopicosDoForum(); // Recarrega a lista após excluir um tópico
    } else {
      alert('Erro ao excluir o tópico. Verifique as permissões.');
    }
  };

  const handleUpdateTopico = async (forum) => {
    if (!(forum instanceof Forum || forum.forumID)) {
      alert('Fórum não é válido.');
      return;
    }
    
    
    modalForumConfig(forum)

    const sucesso = await forum.update()
    if (sucesso) {
      alert(`Fórum ${forum.forumName} atualizado com sucesso!`);
      closeModal()
      carregarTopicosDoForum(); // Recarrega a lista após atualizar um tópico
    } else {
      alert('Erro ao atualizar o tópico. Verifique as permissões.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#163690"/>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')}>
          <Image source={fotoPerfil} style={styles.perfilImage} />
        </TouchableOpacity>
        <View style={{gap: 5}}>
          <Text style={styles.title}>NOME DO FORUM</Text>
          <Text style={{color: "#B88CB4", fontWeight: "bold"}}>POR: AUTOR</Text>
          <TouchableOpacity onPress={() => SetMostrarDesc(!mostrarDesc)}>
            <Ionicons
              name={mostrarDesc ? 'close-outline' : 'ellipsis-horizontal'}
              size={25}
              color = "#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>
        {mostrarDesc && (
          <View style={styles.descHeader}>
            <Text style={{fontSize: 15, color: "#fff"}}>Descrição...</Text>
            <View style={{flexDirection: "row", gap: 15}}>
              
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={categoriaForum}
                keyExtractor={item => item.cat}
                renderItem={({ item, index }) => (
                  <Text style={[styles.tagsDesc, {backgroundColor: index % 2===0 ? "#ff5555" : "#B88CB4"}]}>{item.cat}</Text>
                )} />

            </View>
            <View>
              <TouchableOpacity style={{alignItems:'flex-end'}} onPress={() => setSeguidor(!seguidor)}>
                <Text style={{width: 180,fontSize: 15, color: "#ddd", backgroundColor: "#00000044", padding: 15, textAlign: 'center', borderRadius: 15}}>{seguidor? 'PARAR DE SEGUIR' : 'SEGUIR +'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}


      {topicos.length === 0 ? (
        <View style={styles.noTopicsContainer}>
          <Text style={styles.noTopicsText}>Ainda não existem Tópicos</Text>
        </View>
      ) : (
        <View style={styles.fullFlex}>
          
          <Text style={styles.titleDisc}>DISCUSSÕES</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={topicosFiltrados}
            keyExtractor={(item) => item?.forumID}
            renderItem={({ item }) => (
              <View style={styles.forumItem}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TopicoScreen', {
                      topicoId: item?.forumID,
                      topicoTitle: item?.forumName, // Passando o nome do tópico
                      topicoDesc: item?.forumDesc, // Passando a descrição do tópico
                    })
                  }
                >
                  <Text style={styles.forumName}>{item?.forumName}</Text>
                  <Text style={styles.forumDescription}>
                    AUTOR: {item?.autor}
                  </Text>
                  <Text style={styles.forumDescription}>
                    Descrição: {item?.forumDesc}
                  </Text>
                </TouchableOpacity>
                {/* Exemplo de botões de deletar e atualizar */}
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={categoriaDiscussao}
                  keyExtractor={item => item.cat}
                  renderItem={({ item }) => (
                    <Text style={[styles.tagsDesc, {backgroundColor: "#B88CB4"}]}>{item.cat}</Text>
                  )} />
                <TouchableOpacity
                  onPress={() => handleDeleteTopico(item?.forumID)}
                >
                <Text style={{ color: 'red', marginTop: 5 }}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => modalForumConfig(item)}>
                  <Text style={{ color: 'blue', marginTop: 5 }}>Atualizar</Text>
                </TouchableOpacity> 

                
                <Text style={styles.forumDate}>
                
                  Ex: 10/10/2010 {  /** Puxar data de criação da Discussão */ }
                
                </Text>
              </View>
            )}
            ListFooterComponent={() => (
              <Text style={styles.footerList}>SEM MAIS DISCUSSÕES</Text>
            )}
          />

          <TouchableOpacity
            style={styles.createNewForumButton}
            onPress={() => modalForumConfig()}
          >
            <Text style={styles.createNewForumButtonText}>Criar Nova Discussão</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={modal} transparent>
        <TouchableOpacity
          onPressOut={() => setModal(false)}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalTopico}>
              <Text style={styles.modalTitle}>{modalConfig.titulo}</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder={modalConfig.placeholderNome}
                onChangeText={setTopicoTitle}
                value={topicoTitle}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={modalConfig.placeholderDescricao}
                onChangeText={setTopicoDesc}
                value={topicoDesc}
              />
              <BotaoPadrao onPress={modalConfig.callFunction} text={modalConfig.btn} />
              <BotaoPadrao onPress={() => setModal(false)} text={modalConfig.cancelar} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

ForumScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ForumScreen;
