import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { useEffect, useRef, useState } from 'react';
import colors from '../../../styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import VGifView from './GifView/';
import PropTypes from 'prop-types';
import anexoPicker from './anexoPicker';
import VChatOptions from './ChatOptions';
import enviarMensagem from './enviarMensagem';

export default function VChat({ discussaoPath, userRef }) {
  const [text, setText] = useState('');
  const [anexos, setAnexos] = useState([]);

  const [showOpts, setShowOpts] = useState(false);
  const [showGifView, setShowGifView] = useState(false);
  const [typeGifView, setTypeGifView] = useState('');

  // [Loading]
  const [loading, setLoading] = useState(false);

  // [Sobre Animação]:
  const optTranslateY = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(optTranslateY, {
      toValue: showOpts ? 0 : 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showOpts]); // Opções

  function handleOnPressOpcoes(type) {
    if (showGifView) {
      if (typeGifView !== type) {
        setTypeGifView(type);
      } else {
        setShowGifView(false);
      }
    } else {
      setTypeGifView(type);
      setShowGifView(true);
    }
  }

  // [Sobre Opções]:
  const opcoes = [
    {
      // Tenor:
      image: require('../../../assets/tenor/icon.png'),
      onPress: () => handleOnPressOpcoes('tenor'),
    },
    {
      // Giphy:
      image: require('../../../assets/giphy/icon.png'),
      onPress: () => handleOnPressOpcoes('giphy'),
    },
    {
      // Anexo:
      icone: 'attach',
      onPress: () => handlePicker(),
    },
  ];

  // [Sobre Anexos]:
  async function handlePicker() {
    const r = await anexoPicker();
    if (r) setAnexos(r);
  }

  // [Sobre Gifs]:
  function salvarGif(id) {
    if (id !== '') {
      setText((prev) => prev + `[${typeGifView}:${id}]`);
    }
  }

  function modifyLoadingState(state) {
    setLoading(state);
  }

  // [Sobre mensagens]:
  async function handleEnvioMensagem() {
    modifyLoadingState(true);
    const r = await enviarMensagem({ text, userRef, anexos, discussaoPath });

    if (r) {
      setText('');
      setAnexos([]);
    } else {
      alert('Erro ao enviar mensagem');
    }

    modifyLoadingState(false);
  }

  function removeAnexo(index) {
    setAnexos([]);
  }

  return (
    <Animated.View
      pointerEvents={loading ? 'none' : 'auto'}
      style={{
        transform: [{ translateY: optTranslateY }],
        bottom: 0,
        width: '100%',
      }}
    >
      {/* Grid de Gifs */}
      {showGifView && typeGifView !== '' && (
        <VGifView
          selection={salvarGif}
          toggle={setShowGifView}
          type={typeGifView}
        />
      )}

      {/* Componentes de Chat */}
      <View style={styles.container}>
        {/* Botão de expansão p/ opções */}
        <TouchableOpacity
          onPress={() => setShowOpts(!showOpts)}
          style={styles.gestureGrabber}
        />

        {/* View de Chat */}
        <View style={styles.chatView}>
          {/* Input */}
          <TextInput
            onChangeText={setText}
            value={text}
            multiline={true}
            placeholder={'...'}
            placeholderTextColor={colors.p5label}
            style={styles.chatInput}
          />

          {/* Icone de Enviar */}
          <Ionicons
            name="send"
            disabled={loading}
            size={26}
            style={styles.chatIcon}
            onPress={handleEnvioMensagem}
            color={colors.p3}
          />
        </View>

        {/* Texto de Anexos */}
        {anexos && anexos.length > 0 && (
          <View style={styles.anexoView}>
            <Text style={styles.anexoText}>Anexados: </Text>
            {anexos.map((v, i) => (
              <View key={i} style={styles.anexosView}>
                <Text style={[styles.anexoText, styles.anexoImgText]}>
                  {v.name}
                </Text>
                <TouchableOpacity onPress={() => removeAnexo(i)}>
                  <Ionicons name="close" size={18} style={styles.removeAnexo} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Menu de Opções */}
        {showOpts && <VChatOptions opcoes={opcoes} />}
      </View>
    </Animated.View>
  );
}

VChat.propTypes = {
  discussaoPath: PropTypes.string.isRequired,
  userRef: PropTypes.string.isRequired,
};
