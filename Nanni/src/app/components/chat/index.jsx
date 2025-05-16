import { 
  Animated,
  LayoutAnimation,
  Platform,
  Text, 
  TextInput, 
  TouchableOpacity, 
  UIManager, 
  View 
} from 'react-native';

import { styles } from './styles';
import { useEffect, useRef, useState } from 'react';
import colors from '../../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import VGifView from './GifView/';
import PropTypes from 'prop-types';
import anexoPicker from './anexoPicker';
import VChatOptions from './VChatOptions';
import enviarMensagem from './enviarMensagem';

export default function VChat({ discussaoPath, userRef }) {    
  const [text, setText] = useState('');
  const [anexos, setAnexos] = useState([]);
  const [gif, setGif] = useState('');

  const [showOpts, setShowOpts] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);

  
  // [Sobre Animação]: 
  const optTranslateY = useRef(new Animated.Value(200)).current

  useEffect(() => {
    Animated.timing(optTranslateY, {
        toValue: showOpts ? 0 : 10,
        duration: 300,
        useNativeDriver: true,
    }).start(); 
  }, [showOpts]) // Opções


  // [Sobre Opções]:
  const opcoes = [
    {
      // Giphy:
      icone: 'image',
      onPress: () => setShowGiphy(!showGiphy),
      extras: {
        type: 'giphy'
      }
    },
    {
      // Anexo:
      icone: 'attach',
      onPress: () => handlePicker(),
    },
  ];


  // [Sobre Anexos]:
  async function handlePicker() {
    const r = await anexoPicker()
    if(r) setAnexos(r)
  }


  // [Sobre Gifs]:
  useEffect(() => {
    if (gif !== '') {
      setText((prev) => prev + `[giphy:${gif}]`);
    }
  }, [gif]);



  // [Sobre mensagens]:
  async function handleEnvioMensagem() {
    const r = await enviarMensagem({ text, userRef, anexos, discussaoPath })
    if(r) setText('')
    else alert("Erro ao enviar mensagem")
  }




  return (
    <Animated.View style={{
      transform: [{ translateY: optTranslateY }],
      bottom: 0,
      width: "100%",
    }}>
      {/* Grid de Gifs */}
      {showGiphy && <VGifView selection={setGif} toggle={setShowGiphy} type={"giphy"} />}

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
            size={26}
            style={styles.chatIcon}
            onPress={handleEnvioMensagem}
            color={colors.p3}
          />
        </View>

        {/* Texto de Anexos */}
        {anexos && anexos.length > 0 ? (
          <View style={styles.anexoView}>
            <Text style={styles.anexoText}>Anexados: </Text>
            {anexos.map((v, i) => (
              <Text key={i} style={[styles.anexoText, styles.anexoImgText]}>
                {v.name}
              </Text>
            ))}
          </View>
        ) : null}

        {/* Menu de Opções */}
        {showOpts && <VChatOptions opcoes={opcoes} />}
      </View>
    </Animated.View>
  );
}


VChat.propTypes = {
  discussaoPath: PropTypes.string.isRequired,
  userRef: PropTypes.string.isRequired,
}