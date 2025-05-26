import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import PropTypes from 'prop-types';
import Forum from '../../../../model/Forum';
import { db } from '../../../../service/firebase/conexao';
import forumDelete from '../../../../hooks/forum/forumDelete';

export default function VForumHeader({
  uid,
  isDev,
  forum,
  forumAutor,
  segID,
  navigation,
}) {
  //
  const [open, setOpen] = useState(false);
  //
  const [seguidor, setSeguidor] = useState(segID ?? '');
  const [loadingSeguir, setLoadingSeguir] = useState(false);

  // [ Animação ]
  const [heightRef, setHeightRef] = useState(0);
  const animHeight = useRef(new Animated.Value(0)).current;
  const animRadius = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (heightRef > 0) {
      Animated.parallel([
        Animated.timing(animHeight, {
          toValue: open ? heightRef + 15 : 5,
          duration: 400,
          useNativeDriver: false,
        }),

        Animated.timing(animRadius, {
          toValue: open ? 16 : 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [open]);

  // [ Funções ]
  async function handleSeguir() {
    try {
      setLoadingSeguir(true);

      const isSeguidor = seguidor !== '';
      const userDoc = doc(db, 'usuarios', uid);
      const segDoc =
        seguidor !== ''
          ? doc(db, 'seguidores', seguidor)
          : doc(collection(db, 'seguidores'));

      const promises = isSeguidor
        ? [
            setDoc(
              userDoc,
              {
                seguindo: arrayRemove(forum.forumID),
              },
              { merge: true },
            ),

            deleteDoc(segDoc),
          ]
        : [
            setDoc(
              userDoc,
              {
                seguindo: arrayUnion(forum.forumID),
              },
              { merge: true },
            ),

            setDoc(segDoc, {
              userRef: uid,
              forumRef: forum.forumID,
              data: serverTimestamp(),
            }),
          ];

      await Promise.all(promises);

      setSeguidor(isSeguidor ? '' : segDoc.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSeguir(false);
    }
  }

  function toConfigForum() {
    navigation.push('ConfigurarForum', {
      forumID: forum.forumID,
    });
  }

  function toDoarScreen() {
    navigation.push('DOACAO', {
      userRecebe: forum.userRef,
    });
  }

  async function deleteForum() {
    const r = await forumDelete({
      forumID: forum.forumID,
    });

    if (!r) {
      Alert.alert('Erro ao Excluir Fórum', 'Tente novamente');
    }
  }

  function handleDeleteForum() {
    Alert.alert(
      'Você tem certeza disso?',
      'Os dados de discussão não poderão ser recuperados.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: deleteForum,
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <Animated.View
      style={[
        styles.header,
        open && {
          borderBottomEndRadius: animRadius,
          borderBottomStartRadius: animRadius,
        },
      ]}
    >
      <View style={styles.forumPrincipal}>
        <View style={styles.forumPrincipalSubView}>
          <View style={styles.forumPrincipalTitulos}>
            <Text style={styles.forumTitle}>{forum.forumName}</Text>
            <Text style={styles.forumAutor}>Por: {forumAutor}</Text>
            {!isDev && (
              <TouchableOpacity
                onPress={() => toDoarScreen()}
                style={styles.doarView}
              >
                <Ionicons name="heart" size={16} style={styles.doarBtn} />
                <Text style={[styles.doarBtn, styles.doarBtnText]}>Doar</Text>
              </TouchableOpacity>
            )}
            {!open && (
              <Pressable onPress={() => setOpen(!open)}>
                <Text style={styles.forumExpansor}>Sobre...</Text>
              </Pressable>
            )}
          </View>
          {isDev && (
            <View style={styles.devOptions}>
              {/* Configurar */}
              <Pressable onPress={() => toConfigForum()}>
                <Ionicons name="settings" size={20} style={styles.configIcon} />
              </Pressable>

              {/* Deletar */}
              <Pressable onPress={() => handleDeleteForum()}>
                <Ionicons name="trash" size={20} style={styles.deleteIcon} />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <Animated.View style={{ height: animHeight, overflow: 'hidden' }}>
        <View
          style={styles.forumDescView}
          onLayout={(e) => {
            setHeightRef(e.nativeEvent.layout.height);
          }}
        >
          <Text style={styles.forumDesc}>{forum.forumDesc}</Text>

          <View style={styles.footer}>
            <Pressable onPress={() => setOpen(!open)}>
              <Text
                style={[
                  styles.forumExpansor,
                  styles.forumExpansorFechar,
                  !open && styles.forumExpansorFecharInactive,
                ]}
              >
                Fechar
              </Text>
            </Pressable>

            <TouchableOpacity
              style={[
                styles.forumSeguir,
                seguidor !== '' && styles.forumSeguido,
                loadingSeguir && styles.loadingOverlay,
              ]}
              disabled={loadingSeguir}
              onPress={() => handleSeguir()}
            >
              <Ionicons
                name={seguidor === '' ? 'add' : 'close'}
                size={20}
                style={[
                  styles.forumSeguirItem,
                  seguidor !== '' && styles.forumSeguidoItem,
                ]}
              />
              <Text
                style={[
                  styles.forumSeguirItem,
                  seguidor !== '' && styles.forumSeguidoItem,
                ]}
              >
                {seguidor === '' ? 'Seguir' : 'Parar de Seguir'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

VForumHeader.propTypes = {
  uid: PropTypes.string.isRequired,
  isDev: PropTypes.bool.isRequired,
  forum: PropTypes.instanceOf(Forum).isRequired,
  forumAutor: PropTypes.string.isRequired,
  segID: PropTypes.string,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
