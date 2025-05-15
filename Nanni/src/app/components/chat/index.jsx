import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import colors from '../../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Comentario from '../../../model/Comentario';
import VGifView from './GifView/';
import GiphyService from '../../../service/giphy/GiphyService';

export default function DChat({ discussaoPath, useRef }) {
  if (!discussaoPath || !useRef) {
    console.error("Parâmetros inválidos") 
    return;
  }

  const [text, setText] = useState('');
  const [anexos, setAnexos] = useState([]);
  const [gif, setGif] = useState('');

  const [showOpts, setShowOpts] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);

  const servGiphy = new GiphyService();

  const opcoes = [
    {
      // Anexo:
      icone: 'attach',
      onPress: () => anexoPicker(),
    },
    {
      // Giphy:
      icone: 'image',
      onPress: () => setShowGiphy(!showGiphy),
    },
  ];

  useEffect(() => {
    if (gif !== '') {
      setText((prev) => prev + `[giphy:${gif}]`);
    }
  }, [gif]);

  async function anexoPicker() {
    try {
      let anexo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!anexo.canceled) {
        const k = anexo.assets[0].fileName;
        const v = anexo.assets[0].uri;

        setAnexos([
          {
            name: k,
            uri: v,
          },
        ]);
      }
    } catch (err) {
      alert('Erro ao tentar anexar imagem');
      console.error(err);
    }
  }

  async function enviarMensagem() {
    if (text.length < 2) return;

    try {
      const comentario = new Comentario({
        mensagem: text,
        userRef: useRef,
        anexo: anexos,
        discussaoPath: discussaoPath,
      });

      const resp = await comentario.create();
      if (resp) {
        setText('');
      } else {
        console.error('Erro ao enviar mensagem');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View>
      {/* Grid de Gifs */}
      {showGiphy && <VGifView selection={setGif} show={setShowGiphy} />}

      {/* Componentes de Chat */}
      <View style={styles.container}>
        {/* Botão de expansão p/ opções */}
        <TouchableOpacity
          onPress={() => setShowOpts(!showOpts)}
          style={{ backgroundColor: 'white', height: 5, marginHorizontal: 20 }}
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
            onPress={enviarMensagem}
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
        {showOpts ? (
          <View style={styles.optContainer}>
            {opcoes &&
              opcoes.map((item, index) => {
                if (item.icone && item.onPress) {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={item.onPress}
                      style={styles.optView}
                    >
                      <Ionicons name={item.icone} size={24} color={colors.p3} />
                    </TouchableOpacity>
                  );
                }

                return;
              })}
          </View>
        ) : null}
      </View>
    </View>
  );
}
