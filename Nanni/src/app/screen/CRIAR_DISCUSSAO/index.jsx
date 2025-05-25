import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import TagNormalize from '../../../utils/TagNormalize';
import Discussao from '../../../model/Discussao';
import PropTypes from 'prop-types';
import { useAuth } from '../../components/contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';

export default function CriarDiscussaoScreen({ navigation, route }) {
  const { forumPath, discussaoPath } = route.params;
  const { user } = useAuth();

  // {Forms}
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  // [Tag]
  const [tag, setTag] = useState('');
  // [Texto Assistivo]
  const [assistive, setAssistive] = useState({
    titulo: false,
    mensagem: false,
    tag: false,
  });
  // [Loading]
  const [loading, setLoading] = useState(false);
  // [Tipo]
  const [existe, setExiste] = useState(false);

  const fetchDiscussao = useCallback(async () => {
    try {
      setLoading(true);

      const discDoc = doc(db, ...discussaoPath.split('/'));
      const discSnap = await getDoc(discDoc);

      if (discSnap.exists()) {
        const data = discSnap.data();

        setTitulo(data.titulo);
        setMensagem(data.mensagem);
        setTag(data.tag);

        setExiste(true);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar Discussão');
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!forumPath && !discussaoPath) {
      navigation.goBack();
      return;
    }

    if (discussaoPath) {
      fetchDiscussao();
    }
  }, []);

  function verifyAssitiveText() {
    const ass = {
      titulo: titulo.length < 4,
      mensagem: mensagem.length < 10,
      tag: tag.length < 2,
    };

    setAssistive(ass);

    return Object.values(assistive).some(Boolean);
  }

  async function handleCriar() {
    if (verifyAssitiveText()) {
      return;
    }

    try {
      setLoading(true);

      const normTag = TagNormalize(tag);

      const disc = new Discussao({
        titulo,
        tag: normTag,
        mensagem,
        forumPath,
        userRef: user.uid,
      });

      let r = true;
      if (existe) {
        const docRef = doc(db, ...discussaoPath.split('/'));
        await updateDoc(docRef, disc.toFirestoreData());
      } else {
        r = await disc.create();
      }

      if (r) {
        Alert.alert(
          `${titulo} foi ${existe ? 'atualido' : 'criado'}`,
          'Sendo redirecionado para discussão criada',
        );

        navigation.goBack();
      } else {
        Alert.alert(`Falha ao tentar criar ${titulo}`);
      }
    } catch (err) {
      console.error(err);

      Alert.alert(`Erro ao tentar criar ${titulo}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, loading && styles.loading]}>
      <Text style={styles.title}>Criar Nova Discussão</Text>

      <View style={styles.inputView}>
        <TextInput
          onChangeText={setTitulo}
          placeholder={'Titulo'}
          editable={!loading}
          value={titulo}
          style={[styles.textInput]}
        />
        {assistive.titulo && (
          <Text style={styles.assistiveText}>
            * O titulo precisa ter no mínimo 3 letras
          </Text>
        )}

        <TextInput
          onChangeText={setMensagem}
          placeholder={'Corpo da mensagem'}
          multiline={true}
          editable={!loading}
          value={mensagem}
          style={[styles.textInput, styles.multilineTextInput]}
        />
        {assistive.mensagem && (
          <Text style={styles.assistiveText}>
            * A mensagem precisa ter no mínimo 10 letras
          </Text>
        )}

        <Text style={styles.section}>Tag</Text>
        <TextInput
          onChangeText={setTag}
          placeholder={'Novo'}
          editable={!loading}
          value={tag}
          style={[styles.tag]}
        />
        {assistive.tag && (
          <Text style={styles.assistiveText}>
            * A tag precisa ter no mínimo 2 letras
          </Text>
        )}
      </View>

      <Pressable
        onPress={() => handleCriar()}
        disabled={loading}
        style={[styles.button]}
      >
        <Text style={styles.buttonTxt}>
          {existe ? 'Salvar' : 'Criar Discussão'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

CriarDiscussaoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      forumPath: PropTypes.string,
      discussaoPath: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
