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
  StatusBar,
  Pressable,
} from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index';
import { useAuth } from '../../components/contexts/AuthContext';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import forumList from '../../../hooks/forum/forumList';
import forumDelete from '../../../hooks/forum/forumDelete';
import forumUpdate from '../../../hooks/forum/forumUpdate';
import Forum from '../../../model/Forum';

import { deconvertBase64ToImage } from '../../../utils/Base64Image';
import forumQuery from '../../../hooks/forum/forumQuery';
import useForumDiscussao from '../../../hooks/useForumDiscussao';

export default function ForumScreen ({ navigation, route }) {

  const { forumID, forumPath } = route.params

  const { user } = useAuth();
  const [forum, setForum] = useState()
  const [forumAutor, setForumAutor] = useState()
  const [loadingSeguir, setLoadingSeguir] = useState(false)
    const categoriaForum = [
      { cat: '*18' },
      { cat: 'Exemplo' },
      { cat: 'Exemplo02' },
      { cat: 'Exemplo03' },
      { cat: 'Exemplo04' },
      { cat: 'Exemplo05' },
    ];
  const { listDiscussao: discussoes, loading, error, addLimitDiscussao } = useForumDiscussao({ 
    forumPath: 'foruns/YRysh2NmguCosrq8HVzN', 
    initialLimit: 10, 
  }) || []
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [topicos, setTopicos] = useState([]);
    const [topicoTitle, setTopicoTitle] = useState('');
    const [topicoDesc, setTopicoDesc] = useState('');
    const categoriaDiscussao = [{ cat: 'Exemplo 01' }, { cat: 'Exemplo 02' }];

  const [isDev, setIsDev] = useState(false)
  

  useEffect(() => {
    async function run() {
      try {
        const fr = await forumQuery({ forumID: forumID})
        
        if(fr) {
          setForum(fr)

          const frAutor = await getDoc(doc(db, "usuarios", fr.userRef))
          
          if(frAutor) {
            setForumAutor(frAutor.data().nome)            
          }
        }
      } catch(err) {
        alert("Problema ao carregar Fórum")
        console.error(err)
        navigation.goBack()
      }
    }

    run()
  }, [forumID])

  const [seguidor, setSeguidor] = useState(false);
  const [mostrarDesc, SetMostrarDesc] = useState(false);

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    maisVistos: false,
    maisRecentes: false,
  });

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
      setTopicoTitle('');
      setTopicoDesc('');
      carregarTopicosDoForum();
      setModal(false); // Recarrega a lista após criar um novo tópico
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

  async function handleSeguir() {
    const pDoc = doc(db, "usuarios", user.uid)
    
    try {
      setLoadingSeguir(true)
      const pSnap = await getDoc(pDoc)

      if (!pSnap.exists()) {
        console.error("Erro ao carregar seguir");
        return;
      }

      const seguindo = pSnap.data().seguindo || [];

      if(seguindo.includes(forum.forumID)) {
        await updateDoc(pDoc, {
          seguindo: arrayRemove(forum.forumID)
        })
        
        setSeguidor(false)
      } else {
        await updateDoc(pDoc, {
          seguindo: arrayUnion(forum.forumID)
        })
        
        setSeguidor(true)
      }
    } catch(err) {
      console.error(err)
    } finally {
      setLoadingSeguir(false)
    }
  }

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
      <StatusBar barStyle="light-content" backgroundColor="#163690" />

      {forum && forumAutor ? (
        (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')}>
                <Image source={fotoPerfil} style={styles.perfilImage} />
              </TouchableOpacity>
              <View style={{ gap: 5 }}>
                <Text style={styles.title}>{forum.forumName}</Text>
                <Text style={{ color: '#B88CB4', fontWeight: 'bold' }}>
                  POR: {forumAutor}
                </Text>
                <TouchableOpacity onPress={() => SetMostrarDesc(!mostrarDesc)}>
                  <Ionicons
                    name={mostrarDesc ? 'close-outline' : 'ellipsis-horizontal'}
                    size={25}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {mostrarDesc && (
              <View style={styles.descHeader}>
                <Text style={{ fontSize: 15, color: '#fff' }}>
                  {forum.forumDesc}
                </Text>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={forum.tagsDisponiveis}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <Text
                        style={[
                          styles.tagsDesc,
                          {
                            backgroundColor: index % 2 === 0 ? '#ff5555' : '#B88CB4',
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    )}
                  />
                </View>
                <View >
                  <TouchableOpacity
                    disabled={loadingSeguir}
                    style={{ alignItems: 'flex-end' }}
                    onPress={() => handleSeguir()}
                  >
                    <Text
                      style={{
                        width: 180,
                        fontSize: 15,
                        color: '#ddd',
                        backgroundColor: '#00000044',
                        padding: 15,
                        textAlign: 'center',
                        borderRadius: 15,
                      }}
                    >
                      {seguidor ? 'PARAR DE SEGUIR' : 'SEGUIR +'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!discussoes ? (
              <View style={styles.noTopicsContainer}>
                <Text style={styles.noTopicsText}>Ainda não existem Tópicos</Text>
              </View>
            ) : (
              <View style={styles.fullFlex}>
                <Text style={styles.titleDisc}>DISCUSSÕES</Text>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={discussoes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.forumItem}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('TopicoScreen', {
                            topicoId: item?.discussaoID,
                            topicoTitle: item?.titulo, 
                            topicoDesc: item?.mensagem,
                          })
                        }
                      >
                        <Text style={styles.forumName}>{item?.titulo}</Text>
                        {/* <Text style={styles.forumDescription}>
                          AUTOR: {item?.mensagem}
                        </Text> */}
                        <Text style={styles.forumDescription}>
                          {item?.mensagem}
                        </Text>
                      </TouchableOpacity>
                      
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={item?.tag}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <Text
                            style={[styles.tagsDesc, { backgroundColor: '#B88CB4' }]}
                          >
                            {item.tag}
                          </Text>
                        )}
                      />

                      
                      {isDev && (
                        <>
                          <TouchableOpacity
                            onPress={() => handleDeleteTopico(item?.discussaoID)}
                          >
                            <Text style={styles.deleteButton}>Excluir</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => modalForumConfig(item)}>
                            <Text style={styles.normalButton}>Atualizar</Text>
                          </TouchableOpacity>
                        </>
                      )}

                      <Text style={styles.forumDate}>
                        Ex: 10/10/2010 
                      </Text>
                    </View>
                  )}
                  ListFooterComponent={() => (
                    <Text style={styles.footerList}>SEM MAIS DISCUSSÕES</Text>
                  )}
                />

                
              </View>
            )}

            {/* <Modal visible={modal} transparent>
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
                    <BotaoPadrao
                      onPress={modalConfig.callFunction}
                      text={modalConfig.btn}
                    />
                    <BotaoPadrao
                      onPress={() => setModal(false)}
                      text={modalConfig.cancelar}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal> */}

            <TouchableOpacity
              style={styles.createNewForumButton}
              onPress={() => modalForumConfig()}
            >
              <Text style={styles.createNewForumButtonText}>
                Criar Nova Discussão
              </Text>
            </TouchableOpacity>
          </>
        )
      ) : null }
    </SafeAreaView>
  );
};


ForumScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      forumID: PropTypes.string,
      forumPath: PropTypes.string,
    }),
  }),
};
