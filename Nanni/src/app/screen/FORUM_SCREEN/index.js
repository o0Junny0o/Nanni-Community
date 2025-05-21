import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import { useAuth } from '../../components/contexts/AuthContext';
import { 
  and, 
  arrayRemove, 
  arrayUnion, 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  serverTimestamp, 
  setDoc, 
  updateDoc, 
  where 
} from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import forumList from '../../../hooks/forum/forumList';
import forumDelete from '../../../hooks/forum/forumDelete';
import { Ionicons } from '@expo/vector-icons';
import Forum from '../../../model/Forum';

import { deconvertBase64ToImage } from '../../../utils/Base64Image';
import forumQuery from '../../../hooks/forum/forumQuery';
import useForumDiscussao from '../../../hooks/useForumDiscussao';
import { FORUNS_COLLECTION } from '../../../model/refsCollection';
import VForumHeader from '../../components/forum/header';

export default function ForumScreen({ navigation, route }) {
  const { forumID, forumPath } = route.params;

  const { user } = useAuth();
  const [forum, setForum] = useState();
  const [forumAutor, setForumAutor] = useState();
  const [loadingSeguir, setLoadingSeguir] = useState(false);
  const categoriaForum = [
    { cat: '*18' },
    { cat: 'Exemplo' },
    { cat: 'Exemplo02' },
    { cat: 'Exemplo03' },
    { cat: 'Exemplo04' },
    { cat: 'Exemplo05' },
  ];
  const {
    listDiscussao: discussoes,
    loading,
    error,
    addLimitDiscussao,
  } = useForumDiscussao({
    forumPath: forumPath,
    initialLimit: 10,
  }) || [];
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [topicos, setTopicos] = useState([]);
  const [topicoTitle, setTopicoTitle] = useState('');
  const [topicoDesc, setTopicoDesc] = useState('');
  const categoriaDiscussao = [{ cat: 'Exemplo 01' }, { cat: 'Exemplo 02' }];

  const [isDev, setIsDev] = useState(false);

  // [Obtem informações de Fórum]
  useEffect(() => {
    async function run() {
      try {
        const fr = await forumQuery({ forumID: forumID})

        if(fr) {
          setForum(fr)
          
          const docAutor = doc(db, "usuarios", fr.userRef)
          const colForumSeguidor = collection(db, "seguidores")
          const queryForumSeguidor = query(colForumSeguidor, 
            and(
              where('userRef', '==', user.uid), 
              where('forumRef', '==', fr.forumID) 
            )
          )
          
          const [frAutor, userIsSeguidor] = await Promise.all([
            getDoc(docAutor),
            getDocs(queryForumSeguidor),
          ])

          
          if(frAutor.exists()) {
            setForumAutor(frAutor.data().nome)
          }

          const segDocs = userIsSeguidor.docs

          setSeguidor(segDocs && segDocs.length > 0 ? 
            segDocs[0].id 
            : ''
          )         
        }
      } catch (err) {
        alert('Problema ao carregar Fórum');
        console.error(err);
        navigation.goBack();
      }
    }

    run();
  }, [forumID]);

  const [seguidor, setSeguidor] = useState('');
  const [mostrarDesc, SetMostrarDesc] = useState(false);

  const [filtrosAtivos, setFiltrosAtivos] = useState({
    maisVistos: false,
    maisRecentes: false,
  });

  // Modal Config:
  const [modal, setModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    titulo: '',
    btn: '',
    cancelar: 'Cancelar',
    placeholderNome: 'Nome do Tópico',
    placeholderDescricao: 'Descrição',
    callFunction: () => {},
  });

  const closeModal = () => {
    setModal(false);
    setTopicoTitle('');
    setTopicoDesc('');
    setModalConfig({});
  };

  const modalForumConfig = (forum) => {
    setModalConfig({
      titulo: forum ? 'Atualizar Fórum' : 'Criar Fórum',
      btn: forum ? 'Atualizar Fórum' : 'Criar novo tópico',
      callFunction: forum ? () => handleUpdateTopico(forum) : CriarNovoTopico,
      cancelar: 'Cancelar',
      placeholderNome: 'Nome do Tópico',
      placeholderDescricao: 'Descrição',
    });

    if (forum instanceof Forum) {
      setTopicoTitle(forum.forumName);
      setTopicoDesc(forum.forumDesc);
    } else {
      setTopicoTitle('');
      setTopicoDesc('');
    }

    setModal(true);
  };

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
        (a, b) =>
          (b?.classificacaoIndicativa || 0) - (a?.classificacaoIndicativa || 0),
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
    try {
      setLoadingSeguir(true)

      const isSeguidor = (seguidor !== '')
      const userDoc = doc(db, "usuarios", user.uid)     
      const segDoc = seguidor !== '' ? 
        doc(db, "seguidores", seguidor) 
        : doc(collection(db, "seguidores"));

      const promises = isSeguidor ?
        [
          setDoc(userDoc, { 
            seguindo: arrayRemove(forum.forumID),
          }, { merge: true }),

          deleteDoc(segDoc)
        ] 
        : [
          setDoc(userDoc, { 
            seguindo: arrayUnion(forum.forumID),
          }, { merge: true}),

          setDoc(segDoc, { 
              userRef: user.uid, 
              forumRef: forum.forumID,
              data: serverTimestamp(),
            }
          )
        ];

      await Promise.all(promises)
      
      setSeguidor(isSeguidor ? 
        '' 
        : segDoc.id
      )
    } catch(err) {
      console.error(err)
    } finally {
      setLoadingSeguir(false);
    }
  }

  const topicosFiltrados = aplicarFiltros();

  const handleDeleteTopico = async (forumID) => {
    if (!user?.uid) {
      alert('Usuário não autenticado.');
      return;
    }
    console.log(forumID);
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

    modalForumConfig(forum);

    const sucesso = await forum.update();
    if (sucesso) {
      alert(`Fórum ${forum.forumName} atualizado com sucesso!`);
      closeModal();
      carregarTopicosDoForum(); // Recarrega a lista após atualizar um tópico
    } else {
      alert('Erro ao atualizar o tópico. Verifique as permissões.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#163690" />

      {forum && forumAutor ? 
        (
          <>
          {/* Header */}
          <VForumHeader forum={forum} uid={user.uid} forumAutor={forumAutor} segID={seguidor} />
            
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
                          style={[
                            styles.tagsDesc,
                            { backgroundColor: '#B88CB4' },
                          ]}
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
                        <TouchableOpacity
                          onPress={() => modalForumConfig(item)}
                        >
                          <Text style={styles.normalButton}>Atualizar</Text>
                        </TouchableOpacity>
                      </>
                    )}

                    <Text style={styles.forumDate}>Ex: 10/10/2010</Text>
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
      ) : null}
    </SafeAreaView>
  );
}


ForumScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      forumID: PropTypes.string,
      forumPath: PropTypes.string,
    }),
  }),
};
