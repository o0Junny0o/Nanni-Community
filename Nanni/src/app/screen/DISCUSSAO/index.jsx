import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { 
    FlatList,
    Text, 
    View 
} from 'react-native';
import { useAuth } from "../../components/contexts/AuthContext";
import VChat from '../../components/chat';
import PropTypes from 'prop-types';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import useChat from '../../../hooks/useChat';
import VComentario from '../../components/comentario';
import { instaceServices } from '../../../utils/typeServices';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import VForumHeader from '../../components/forum/header';


export default function DiscussaoScreen({ route }) {
    const { 
        forum,
        forumAutor,
        discussaoPath,
        titulo,
        tag, 
        mensagem, 
        data,  
    } = route.params;
    
    const { 
        data: chat,
    } = useChat({ 
        discussaoPATH: discussaoPath,
        initialLimit: 20,
    })

    const instServ = instaceServices()

    const { user } = useAuth()

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#163690"  />
            {/* Header */}
            <VForumHeader 
                forum={forum} 
                uid={user.uid} 
                forumAutor={forumAutor} 
                isDev={true}
            />
            <ScrollView>
                <View style={styles.container}>
                    {/* Header */}

                    {/* Mensagem */}
                    <View style={styles.discView}>
                        <Text style={styles.discTitle}>
                            {titulo}
                        </Text>

                        {mensagem && (
                            <Text style={styles.discDescricao}>
                                {mensagem}
                            </Text>
                        )}
                        
                        <Text style={styles.discData}>
                            {data.toDate().toLocaleDateString("pt-BR")}
                        </Text>
                    </View>

                    <View style={styles.chatView}>
                        <Text style={styles.chatTitle}>
                            Comentários
                        </Text>
                        {chat && (
                            <FlatList
                                data={chat}
                                contentContainerStyle={styles.chatContainer}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => item.comentario.comentarioID}
                                renderItem={({item}) => (
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
                        )}
                </View>
                
            </View>
            </ScrollView>
            <VChat
                discussaoPath={discussaoPath}
                userRef={user.uid}
            />
        </SafeAreaView>
    )
}




DiscussaoScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            titulo: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
            mensagem: PropTypes.string.isRequired,
            data: PropTypes.instanceOf(Timestamp).isRequired,
            discussaoPath: PropTypes.string.isRequired,            
        }).isRequired,
    }).isRequired,
}