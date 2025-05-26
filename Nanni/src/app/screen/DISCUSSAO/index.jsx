import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { FlatList, Text, View } from 'react-native';
import { useAuth } from '../../components/contexts/AuthContext';
import VChat from '../../components/chat';
import PropTypes from 'prop-types';
import useChat from '../../../hooks/useChat';
import VComentario from '../../components/comentario';
import { instaceServices } from '../../../utils/typeServices';
import { ScrollView } from 'react-native-gesture-handler';
import VForumHeader from '../../components/forum/header';
import { StatusBar } from 'expo-status-bar';
import colors from '../../../styles/colors';
import Forum from '../../../model/Forum';
import { useEffect, useLayoutEffect, useRef } from 'react';

export default function DiscussaoScreen({ navigation, route }) {
  const { forum, discussaoPath, titulo, tag, mensagem, data } = route.params;

  const { data: chat } = useChat({
    discussaoPATH: discussaoPath,
    initialLimit: 20,
  });


  // [Scroll to Bottom]
  const flatRef = useRef(null)
  
  // Scroll automático quando novos itens são adicionados
  const handleContentSizeChange = () => {
    if (flatRef.current && chat?.length) {
      flatRef.current.scrollToEnd({ animated: true });
    }
  };

  // Scroll inicial quando a lista é montada
  const handleLayout = () => {
    if (flatRef.current && chat?.length) {
      flatRef.current.scrollToEnd({ animated: false });
    }
  };
  const instServ = instaceServices();

  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.p3} />
      {/* Header */}
      <VForumHeader
        forum={forum.data}
        uid={user.uid}
        forumAutor={forum.autor}
        isDev={forum.userIsDev}
        navigation={navigation}
      />
      <ScrollView
        ref={flatRef}>
        <View style={styles.container}>
          {/* Mensagem */}
          <View style={styles.discView}>
            <Text style={styles.discTitle}>{titulo}</Text>

            {mensagem && <Text style={styles.discDescricao}>{mensagem}</Text>}

            <Text style={styles.discData}>
              {data.toDate().toLocaleDateString('pt-BR')}
            </Text>
          </View>

          <View style={styles.chatView}>
            <Text style={styles.chatTitle}>Comentários</Text>
            <FlatList
                
                data={chat}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleLayout}
                contentContainerStyle={styles.chatContainer}
                scrollEnabled={false}
                keyExtractor={(item, index) => item.comentario.comentarioID}
                renderItem={({ item }) => (
                  <VComentario
                    services={instServ}
                    discussaoPath={discussaoPath}
                    comentarioID={item.comentario.comentarioID}
                    mensagem={item.comentario.mensagem}
                    data={item.comentario.data}
                    anexo={item.comentario.anexo}
                    username={item.username}
                    isFromUser={item.comentario.userRef === user.uid}
                  />
                )}
              />
          </View>
        </View>
      </ScrollView>
      <VChat discussaoPath={discussaoPath} userRef={user.uid} />
    </SafeAreaView>
  );
}

DiscussaoScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      forum: PropTypes.shape({
        data: PropTypes.instanceOf(Forum).isRequired,
        autor: PropTypes.string.isRequired,
        userIsDev: PropTypes.bool.isRequired,
      }),
      discussaoPath: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      mensagem: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
