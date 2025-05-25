import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { useAuth } from '../../components/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import forumList from '../../../hooks/forum/forumList';
import VForumSeguido from '../../components/forum/home/seguido';
import VForumDono from '../../components/forum/home/dono';
import LoadingScreen from '../CARREGAMENTO_SCREEN';

export default function HomeScreen({ navigation }) {
  const [forumSeguidos, setForumSeguidos] = useState([]);
  const [forumDono, setForumDono] = useState([]);
  const [isDev, setIsDev] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  async function run() {
    setLoading(true);

    const userRef = doc(db, 'usuarios', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.cargo) {
        setIsDev(Boolean(data.cargo));

        const snapForuns = await forumList({ qUserRef: user.uid });

        if (snapForuns && snapForuns.length > 0) {
          setForumDono(snapForuns);
        } else {
          setForumDono([]);
        }
      }

      if (data.seguindo?.length > 0) {
        const foruns = await forumList({ qIDs: data.seguindo });
        setForumSeguidos(foruns);
      } else {
        setForumSeguidos([]);
      }
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      run();
    }, [user]),
  );

  const titleForumSeguidos =
    forumSeguidos && forumSeguidos.length > 0
      ? forumSeguidos.length > 1
        ? 'Fóruns Seguidos'
        : 'Fórum Seguido'
      : undefined;
  const titleForumDono =
    forumDono && forumDono.length > 0
      ? forumDono.length > 1
        ? 'Seus Fóruns'
        : 'Seu Fórum'
      : undefined;

  function configForum({ forumID }) {
    navigation.push('ConfigurarForum', {
      forumID: forumID,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <LoadingScreen />
      ) : forumDono.length > 0 || forumSeguidos.length > 0 ? (
        <View style={styles.view}>
          <View style={styles.container}>
            <ScrollView>
              {isDev && forumDono && forumDono.length > 0 ? (
                <>
                  <Text style={styles.pageTitle}>{titleForumDono}</Text>
                  <FlatList
                    style={styles.section}
                    scrollEnabled={false}
                    data={forumDono}
                    keyExtractor={(item) => item.forumID}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() =>
                          navigation.push('Forum', {
                            forumID: item.forumID,
                            forumPath: item.getForumPath(),
                          })
                        }
                      >
                        <VForumDono
                          path={item.getForumPath()}
                          onConfigForum={() =>
                            configForum({
                              forumID: item.forumID,
                            })
                          }
                          {...item}
                        />
                      </Pressable>
                    )}
                  />
                </>
              ) : null}

              {forumSeguidos && forumSeguidos.length > 0 ? (
                <>
                  <Text style={styles.pageTitle}>{titleForumSeguidos}</Text>
                  <FlatList
                    style={styles.section}
                    scrollEnabled={false}
                    data={forumSeguidos}
                    keyExtractor={(item) => item.forumID}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() =>
                          navigation.push('Forum', {
                            forumID: item.forumID,
                            forumPath: item.getForumPath(),
                          })
                        }
                      >
                        <VForumSeguido
                          navigation={navigation}
                          path={item.getForumPath()}
                          {...item}
                        />
                      </Pressable>
                    )}
                  />
                </>
              ) : null}
            </ScrollView>
          </View>
          {isDev ? (
            <TouchableOpacity
              onPress={(e) => navigation.push('ConfigurarForum')}
              style={styles.button}
            >
              <Text style={styles.buttonTxt}>Criar Novo Fórum</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View style={styles.loadingScreen}>
          <Text style={styles.loadingText}>
            <TouchableOpacity onPress={() => navigation.navigate('Explorar')}>
              <Text style={styles.toHomeTxt}>
                Clique em explorar para começar
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
