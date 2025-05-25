import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import styles from './styles';
import { Timestamp } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import typeServices from '../../../utils/typeServices';
import comentarioReport from '../../../hooks/comentario/comentarioReport';
import { deconvertBase64ToImage } from '../../../utils/Base64Image';

const rgx = /(\[.*?\])/g;
const MIN_SERVICE_ID = 4;

export default function VComentario({
  services,
  discussaoPath,
  comentarioID,
  mensagem,
  anexo,
  data,
  username,
  isFromUser = false,
}) {
  const ks = Object.keys(typeServices);
  const [parsed, setParsed] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // [Interpret]:
  useEffect(() => {
    setLoaded(false);

    const strSplit = mensagem.split(rgx).filter(Boolean);

    const str = strSplit.reduce((obj, e) => {
      const item = { content: e };

      if (ks.some((i) => e.includes(i))) {
        const parts = e.split(':');

        if (parts.length === 2 && parts[1].length > MIN_SERVICE_ID) {
          item.type = 'gif';
          item.service = parts[0].slice(1);
          item.gifID = parts[1].slice(0, -1);
        } else {
          item.type = 'text';
        }
      } else {
        item.type = 'text';
      }

      return [...obj, item];
    }, []);

    setParsed(str);
  }, []);

  async function handleReport() {
    try {
      const r = await comentarioReport({
        discussaoPath,
        comentarioID,
      });

      if (r) {
        Alert.alert('Comentário reportado');
      }
    } catch (err) {
      Alert.alert('Erro ao reportar mensagem');

      console.error(err);
    }
  }

  // [Gif]
  useEffect(() => {
    async function fetchGifs() {
      const itParse = [...parsed];

      await Promise.all(
        parsed.map(async (item, index) => {
          if (item.service && item.gifID) {
            try {
              const service = services[item.service];
              const res = await service.getByID(item.gifID);
              const g = service.toSourceSingular(res);

              if (g) {
                itParse[index] = { ...item, gif: g };
              }
            } catch (err) {
              console.error(err);
            }
          }
        }),
      ).then(() => {
        setLoaded(true);
        setParsed(itParse);
      });
    }

    if (!loaded && parsed.some((i) => i.type === 'gif')) {
      fetchGifs();
    }
  }, [parsed, loaded]);

  return (
    <View
      style={[styles.view, isFromUser ? styles.viewUser : styles.viewOtherUser]}
    >
      <View
        style={[
          styles.comentarioView,
          isFromUser
            ? styles.comentarioViewUser
            : styles.comentarioViewOtherUser,
        ]}
      >
        {!isFromUser && (
          <View style={styles.header}>
            <Text style={styles.author}>{username}</Text>
            <Pressable onPress={() => handleReport()}>
              <Ionicons name="flag" style={styles.iconReport} size={16} />
            </Pressable>
          </View>
        )}
        {parsed.map((item, index) => {
          if (item.type === 'gif') {
            const gif = item.gif;

            return gif ? (
              <Image
                key={index}
                source={gif}
                style={[styles.gifImage, { aspectRatio: gif.aspectRatio }]}
                contentFit="contain"
              />
            ) : (
              <Text key={index}>Carregando Gif...</Text>
            );
          }

          return (
            <Text key={index} style={styles.text}>
              {item.content}
            </Text>
          );
        })}
        {Array.isArray(anexo) &&
          anexo.length > 0 &&
          anexo.map((item, index) => (
            <Image
              key={index}
              source={deconvertBase64ToImage(item.uri)}
              style={[styles.gifImage, { aspectRatio: item.aspectRatio }]}
              contentFit="contain"
            />
          ))}
        {data instanceof Timestamp && (
          <Text style={styles.date}>
            {data.toDate().toLocaleDateString('pt-BR')}
          </Text>
        )}
      </View>
    </View>
  );
}

VComentario.propTypes = {
  discussaoPath: PropTypes.string.isRequired,
  comentarioID: PropTypes.string.isRequired,
  services: PropTypes.object.isRequired,
  mensagem: PropTypes.string.isRequired,
  anexo: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  isFromUser: PropTypes.bool,
};
