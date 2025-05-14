import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Forum from '../../../model/Forum';
import { useAuth } from '../../components/contexts/AuthContext';
import PropTypes from 'prop-types';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import TagNormalize from '../../../utils/TagNormalize';
import * as ImagePicker from 'expo-image-picker';
import { convertImageToBase64 } from '../../../utils/Base64Image';

export default function ConfigurarForumScreen({ navigation, route }) {
  const forum = undefined;

  // User:
  const { user, userLoading, authLoading } = useAuth();
  // > Verificação:
  if (authLoading || !user) navigation.goBack();

  // Fórum:
  const [forumAvatar, setForumAvatar] = useState('');
  const [forumNome, setForumNome] = useState('');
  const [forumFaixaEtaria, setForumFaixaEtaria] = useState();
  const [forumDesc, setForumDesc] = useState('');
  const [forumTags, setForumTags] = useState([]);
  //
  const [loading, setLoading] = useState(false);
  // > Criador de Tags
  const [cTags, setCTags] = useState('');

  // Titulos
  const titlePage = forum ? `Editar ${forum.forumName}` : 'Novo Fórum';
  const btnPage = forum ? 'Salvar' : 'Criar';

  //
  async function criarForum() {
    if (forumNome.length < 3) return;
    if (forumFaixaEtaria.length < 1) return;
    if (forumTags.length < 1) return;

    setLoading(true);

    const fr = new Forum({
      forumName: forumNome,
      forumDesc: forumDesc,
      userRef: user.uid,
      classificacaoIndicativa: 'pg',
      // forumTags: forumTags,
    });

    const resp = await fr.create();

    setLoading(false);
    if (resp) {
      navigation.goBack();
    } else {
      console.log('ERRO AO CRIAR');
    }
  }

  function addForumTag() {
    if (cTags.length < 3) return;

    setForumTags((prev) => [...prev, TagNormalize(cTags)]);

    setCTags('');
  }

  function removeForumTag(tag) {
    if (!tag || typeof tag !== 'string') return;

    const nTags = forumTags.filter((i) => i !== tag);
    setForumTags(nTags);
  }

  async function changeForumAvatar() {
    try {
      let resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!resultado.canceled) {
        const uri = resultado.assets[0].uri;
        setForumAvatar(uri);
      }
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      alert('Erro ao salvar nova foto');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <Text style={styles.pageTitle}>{titlePage}</Text>

        <Image source={forumAvatar} />
        <TouchableOpacity onPress={changeForumAvatar}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>

        <TextInput
          onChangeText={setForumNome}
          value={forumNome}
          placeholder="Nome"
          editable={!loading}
          style={[styles.textInput, loading ? styles.textInputInactive : null]}
        />

        <TextInput
          onChangeText={setForumDesc}
          value={forumDesc}
          multiline={true}
          placeholder="Descrição"
          editable={!loading}
          style={[
            styles.textInput,
            styles.multilineTextInput,
            loading ? styles.textInputInactive : null,
          ]}
        />

        <TextInput
          onChangeText={setForumFaixaEtaria}
          value={forumFaixaEtaria}
          placeholder="Classificação Indicativa"
          editable={!loading}
          style={[styles.textInput, loading ? styles.textInputInactive : null]}
        />

        {/* [TAGS] */}
        <Text style={styles.tagsPageTitle}>Tags</Text>
        <View style={styles.tagsSection}>
          <View style={[tagChipStyle.container, tagChipStyle.containerInput]}>
            <Pressable
              onPress={(e) => {
                addForumTag();
              }}
            >
              <Ionicons name="add" size={20} color={colors.p3} />
            </Pressable>
            <TextInput
              onChangeText={setCTags}
              value={cTags}
              multiline={false}
              style={[tagChipStyle.text, tagChipStyle.textInput]}
            />
          </View>
          <FlatList
            data={forumTags}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={tagChipStyle.container}>
                <Pressable
                  onPress={(e) => {
                    removeForumTag(item);
                  }}
                >
                  <Ionicons name="close" size={20} color={colors.p3} />
                </Pressable>
                <Text style={tagChipStyle.text}>{item}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <Pressable
        onPress={(e) => {
          criarForum();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonTxt}>{btnPage}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const tagChipStyle = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingRight: 15,
    borderRadius: 16,
    backgroundColor: colors.p1,
  },
  containerInput: {
    backgroundColor: colors.p5,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    letterSpacing: 1.25,
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

ConfigurarForumScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      forumID: PropTypes.string,
    }),
  }),
};
