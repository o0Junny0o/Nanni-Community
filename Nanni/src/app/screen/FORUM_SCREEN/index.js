import { 
  useState, 
  useEffect 
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import { useAuth } from '../../components/contexts/AuthContext';
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import forumQuery from '../../../hooks/forum/forumQuery';
import useForumDiscussao from '../../../hooks/useForumDiscussao';
import {
  USUARIOS_COLLECTION,
} from '../../../model/refsCollection';
import VForumHeader from '../../components/forum/header';
import VDiscussaoItem from '../../components/forum/discussao/item';
import handleDeleteDiscussao from '../../components/forum/discussao/handleDeleteDiscussao';


export default function ForumScreen({ navigation, route }) {
  const { 
    forumID, 
    forumPath 
  } = route.params;

  const { user } = useAuth();
  const [forum, setForum] = useState();
  const {
    listDiscussao: discussoes,
    loading,
    error,
    addLimitDiscussao,
  } = useForumDiscussao({
    forumPath: forumPath,
    initialLimit: 10,
  }) || [];
  const [seguidor, setSeguidor] = useState('');

  // [Obtem informações de Fórum]
  useEffect(() => {
    async function run() {
      try {
        const fr = await forumQuery({ forumID: forumID });

        if (fr) {
          const docAutor = doc(db, USUARIOS_COLLECTION, fr.userRef);
          const colForumSeguidor = collection(db, 'seguidores');
          const queryForumSeguidor = query(
            colForumSeguidor,
            and(
              where('userRef', '==', user.uid),
              where('forumRef', '==', fr.forumID),
            ),
          );

          const [frAutor, userIsSeguidor] = await Promise.all([
            getDoc(docAutor),
            getDocs(queryForumSeguidor),
          ]);

          setForum({
            autor: frAutor.data().nome,
            data: fr,
            userIsDev: (fr.userRef === user.uid),
          });

          const segDocs = userIsSeguidor.docs;
          setSeguidor(segDocs && segDocs.length > 0 ? segDocs[0].id : '');
        }
      } catch (err) {
        alert('Problema ao carregar Fórum');
        console.error(err);
        navigation.goBack();
      }
    }

    run();
  }, [forumID, user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#163690" />
        
      {forum &&  
        (
          <>
          {/* Header */}
          <VForumHeader 
            forum={forum.data} 
            uid={user.uid} 
            forumAutor={forum.autor} 
            segID={seguidor} 
            isDev={forum.userIsDev}
            navigation={navigation}
          />
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
                  <Pressable
                    onPress={() =>
                      navigation.push('Discussao', {
                        forum: forum.data,
                        forumAutor: forum.autor,
                        discussaoPath: item.getDiscussaoPath(),
                        titulo: item.titulo,
                        tag: item.tag, 
                        mensagem: item.mensagem, 
                        data: item.data,
                      })
                    }>
                      <VDiscussaoItem 
                        userIsDev={forum.isDev || (item.userRef === user.uid)}
                        onDelete={() => handleDeleteDiscussao(item.getDiscussaoPath())}
                        onUpdate={() => { 
                          navigation.push("CriarDiscussao", {
                            discussaoPath: item.getDiscussaoPath(),
                          }) 
                        }}
                        {...item} />
                  </Pressable>
                )}
                ListFooterComponent={() => (
                  <Text style={styles.footerList}>SEM MAIS DISCUSSÕES</Text>
                )}
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.createNewForumButton}
            onPress={() => navigation.push('CriarDiscussao', {
              forumPath: forumPath,
            })}
          >
            <Text style={styles.createNewForumButtonText}>
              Criar Nova Discussão
            </Text>
          </TouchableOpacity>
        </>
      )}
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



