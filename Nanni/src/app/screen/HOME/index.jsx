import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { styles, forumSeguidosStyles, forumDonoStyles } from './styles';
import PropTypes from 'prop-types';
import { useAuth } from '../../components/contexts/AuthContext';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import forumList from '../../../hooks/forum/forumList';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../../styles/colors';
import { deconvertBase64ToImage } from '../../../utils/Base64Image';
import { FORUNS_COLLECTION } from '../../../model/refsCollection';

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

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
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
                      <VForumDono
                        navigation={navigation}
                        path={item.getForumPath()}
                        {...item}
                      />
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
                      <VForumSeguidos
                        navigation={navigation}
                        path={item.getForumPath()}
                        {...item}
                      />
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
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Clique em explorar para começar
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function VForumSeguidos({ forumID, forumName, forumDesc, path, navigation }) {
  if (!forumName && typeof forumName !== 'string') return;
  if (!forumDesc && typeof forumDesc !== 'string') return;
  if (typeof path !== 'string') return;
  if (!forumID) return;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.push('Forum', {
          forumID: forumID,
          forumPath: path,
        })
      }
    >
      <View style={forumSeguidosStyles.container}>
        <Text style={forumSeguidosStyles.title}>{forumName}</Text>
        <Text style={forumSeguidosStyles.desc}>{forumDesc}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function VForumDono({ forumID, forumName, data, path, navigation }) {
  if (!forumName && typeof forumName !== 'string') return;
  if (!forumID) return;
  if (!(data instanceof Timestamp)) return;
  if (typeof path !== 'string') return;

  return (
    <Pressable
      onPress={(e) =>
        navigation.push('Forum', {
          forumID: forumID,
          forumPath: path,
        })
      }
    >
      <View style={forumDonoStyles.container}>
        <View style={forumDonoStyles.rows}>
          <Text style={forumDonoStyles.title}>{forumName}</Text>
          <Pressable
            style={forumDonoStyles.iconEdit}
            onPress={(e) => {
              navigation.push('ConfigurarForum', {
                forumID: forumID,
              });
            }}
          >
            <Ionicons name="settings" size={24} color={colors.p3} />
          </Pressable>
        </View>
        <View style={[forumDonoStyles.rows, forumDonoStyles.rowsOptions]}>
          {data && (
            <Text style={forumDonoStyles.extra}>
              {data.toDate().toLocaleDateString('pt-BR')}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

VForumSeguidos.propTypes = {
  forumID: PropTypes.string.isRequired,
  forumName: PropTypes.string.isRequired,
  forumDesc: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

VForumDono.propTypes = {
  forumID: PropTypes.string.isRequired,
  forumName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
