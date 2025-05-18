import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Forum from '../../../model/Forum';
import { useAuth } from '../../components/contexts/AuthContext';
import PropTypes from 'prop-types';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import TagNormalize from '../../../utils/TagNormalize';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import {
  convertImageToBase64,
  deconvertBase64ToImage,
} from '../../../utils/Base64Image';
import forumQuery from '../../../hooks/forum/forumQuery';

export default function ConfigurarForumScreen({ navigation, route }) {
  const params = route.params;

  // User:
  const { user, userLoading, authLoading } = useAuth();
  // > Verificação:
  if (authLoading || !user) navigation.goBack();

  const faixas = Forum.classificacaoIndicativa;
  // Fórum:
  const [forumAvatar, setForumAvatar] = useState('');
  const [forumNome, setForumNome] = useState('');
  const [forumFaixaEtaria, setForumFaixaEtaria] = useState(faixas?.[0] ?? '');
  const [forumDesc, setForumDesc] = useState('');
  const [forumTags, setForumTags] = useState([]);
  //
  const [loading, setLoading] = useState(false);
  // > Criador de Tags
  const [cTags, setCTags] = useState('');

  // Titulos
  const [titulos, setTitulos] = useState({
    titlePage: 'Criação de Fórum',
    btnPage: 'Criar',
    existe: false,
  });

  // Carregar Fórum
  useEffect(() => {
    async function run() {
      if (!params) return;
      setLoading(true);

      const forum = await forumQuery({ forumID: params.forumID });
      if (forum) {
        // dados
        const fAvatar = forum.avatar;
        if (fAvatar) {
          setForumAvatar(deconvertBase64ToImage(forum.avatar).uri);
        }
        setForumNome(forum.forumName);
        setForumFaixaEtaria(forum.classificacaoIndicativa);
        setForumDesc(forum.forumDesc);
        setForumTags(forum.tagsDisponiveis);
        // titulos
        setTitulos((prev) => ({
          ...prev,
          titlePage: `Editar ${forum.forumName}`,
          btnPage: 'Salvar',
          existe: true,
        }));
      }

      setLoading(false);
    }

    run();
  }, []);

  //
  async function criarForum(fr) {
    return await fr.create();
  }

  async function atualizarForum(fr) {
    return await fr.update();
  }

  async function eventHandler(e) {
    if (forumNome.length < 3) return;
    if (forumFaixaEtaria == '') return;
    if (forumTags.length < 1) return;
    setLoading(true);

    try {
      const fr = new Forum({
        forumName: forumNome,
        forumDesc: forumDesc,
        userRef: user.uid,
        classificacaoIndicativa: forumFaixaEtaria,
        tagsDisponiveis: forumTags,
      });

      if (forumAvatar && forumAvatar !== '') {
        fr.setAvatar(await convertImageToBase64(forumAvatar));
      }

      if (titulos.existe) {
        fr.setID(params.forumID);
      }

      const resp = titulos.existe
        ? await atualizarForum(fr)
        : await criarForum(fr);

      if (resp) {
        navigation.goBack();
      } else {
        Alert.alert(
          'Erro Inesperado',
          'Houve um erro ao tentar registrar Fórum',
        );
      }
    } catch (err) {
      Alert.alert('Erro ao registrar Fórum', err);
    }

    setLoading(false);
  }

  setForumTags((prev) => [...prev, TagNormalize(cTags)]);

  setCTags('');

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
      <KeyboardAvoidingView behavior={undefined}>
        <Text style={styles.pageTitle}>{titulos.titlePage}</Text>

        <View style={styles.avatarView}>
          <TouchableOpacity onPress={changeForumAvatar}>
            <Image source={{ uri: forumAvatar }} style={styles.avatar} />
            <Ionicons name="camera" size={16} style={styles.avatarIcon} />
          </TouchableOpacity>
        </View>

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

        <View
          style={[
            styles.textInput,
            styles.pickerView,
            loading ? styles.textInputInactive : null,
          ]}
        >
          <Picker
            selectedValue={faixas ? faixas[0] : ''}
            enabled={!loading && Array.isArray(faixas) && faixas.length > 0}
            onValueChange={(itemValue, itemIndex) =>
              setForumFaixaEtaria(itemValue)
            }
          >
            {faixas &&
              faixas.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
          </Picker>
        </View>

        {/* [TAGS] */}
        <Text style={styles.tagsPageTitle}>Tags</Text>
        <View style={styles.tagsSection}>
          <View style={[tagChipStyle.container, tagChipStyle.containerInput]}>
            <Pressable
              enabled={!loading}
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
              enabled={!loading}
              style={[tagChipStyle.text, tagChipStyle.textInput]}
            />
          </View>
          <FlatList
            data={forumTags}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            enabled={!loading}
            horizontal
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
        <Pressable
          onPress={eventHandler}
          style={[styles.button, { marginTop: 60 }]}
        >
          <Text style={styles.buttonTxt}>{titulos.btnPage}</Text>
        </Pressable>
      </KeyboardAvoidingView>
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
