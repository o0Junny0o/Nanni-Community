import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, TextInput, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import { styles } from './styles'; // Verifique se o caminho está correto
import PropTypes from 'prop-types';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index'; // Verifique o caminho
import { useAuth } from '../../components/contexts/AuthContext'; // Verifique o caminho
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/Conexao'; // Verifique o caminho
import { deconvertBase64ToImage } from '../../../utils/Base64Image'; // Verifique o caminho
import { useNavigation } from '@react-navigation/native'; // Importe o hook de navegação
import { ScrollView } from 'react-native';

// Componente para exibir uma única mensagem
const Mensagem = ({ mensagem }) => {
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');

    const carregarDadosUsuario = useCallback(async () => {
        try {
            if (!mensagem?.userRef) return;

            const userRef = doc(db, 'usuarios', mensagem.userRef);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setNomeUsuario(userData.nome);
                if (userData.avatar) {
                    setFotoPerfil(deconvertBase64ToImage(userData.avatar));
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados do utilizador:', error);
        }
    }, [mensagem?.userRef]);

    useEffect(() => {
        carregarDadosUsuario();
    }, [carregarDadosUsuario]);

    return (
        <View style={styles.mensagemContainer}>
            <Image source={fotoPerfil} style={styles.perfilImage} />
            <View style={styles.mensagemTextoContainer}>
                <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>
                <Text style={styles.mensagemTexto}>{mensagem.text}</Text>
                <Text style={styles.mensagemData}>{mensagem.createdAt?.toDate().toLocaleString()}</Text> {/* Formatação da data */}
            </View>
        </View>
    );
};

Mensagem.propTypes = {
    mensagem: PropTypes.shape({
        userRef: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.shape({
            toDate: PropTypes.func.isRequired,
        }).isRequired,
    }).isRequired,
};

const TopicoScreen = ({ route }) => { // Remova navigation daqui
    const { user } = useAuth();
    const { topicoId, topicoTitle, topicoDesc } = route.params;
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [mensagemParaDeletar, setMensagemParaDeletar] = useState(null);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null); // Novo estado para o usuário selecionado
    const navigation = useNavigation(); // Inicialize a navegação
    const [usuarioLogado, setUsuarioLogado] = useState(null);

      const carregarDadosUsuarioLogado = useCallback(async () => {
        try {
            if (!user?.uid) return;
            const userRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUsuarioLogado(userData);
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário logado:', error);
        }
    }, [user?.uid]);

    useEffect(() => {
        carregarDadosUsuarioLogado();
    }, [carregarDadosUsuarioLogado]);


    const carregarMensagens = useCallback(async () => {
        try {
            const mensagensRef = collection(db, 'forum', topicoId, 'messages');
            const mensagensSnap = await getDocs(mensagensRef);
            const mensagensLista = mensagensSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt, // Mantém o Timestamp
            }));
            // Ordena as mensagens por data de criação
            mensagensLista.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());
            setMensagens(mensagensLista);
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            alert('Erro ao carregar as mensagens do tópico.');
        }
    }, [topicoId]);

    useEffect(() => {
        carregarMensagens();
    }, [carregarMensagens]);

    const handleEnviarMensagem = useCallback(async () => {
        if (novaMensagem.trim() === '') return;

        try {
            const novaMensagemRef = await addDoc(collection(db, 'forum', topicoId, 'messages'), {
                userRef: user.uid,
                text: novaMensagem,
                createdAt: new Date(), // Salva a data atual
            });
            if(novaMensagemRef){
                 setNovaMensagem('');
                 carregarMensagens();
            }

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar a mensagem. Tente novamente.');
        }
    }, [novaMensagem, topicoId, user.uid, carregarMensagens]);

    const confirmarExclusaoMensagem = useCallback(async () => {
         if (!mensagemParaDeletar) return;
        try {
            const mensagemRef = doc(db, 'forum', topicoId, 'messages', mensagemParaDeletar);
            await deleteDoc(mensagemRef);
            setMensagemParaDeletar(null);
            setModalVisible(false);
            carregarMensagens();
        } catch (error) {
            console.error("Erro ao excluir mensagem", error);
            alert("Erro ao excluir mensagem.");
        }
    }, [mensagemParaDeletar, topicoId, carregarMensagens]);

    const verificarPermissaoExcluir = useCallback((mensagemUserRef) => {
        return user.uid === mensagemUserRef;
    }, [user.uid]);

     const abrirModalUsuario = (userRef) => {
        setUsuarioSelecionado(userRef);
        setModalVisible(true);
    };

    const fecharModalUsuario = () => {
        setUsuarioSelecionado(null);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                    <Text style={{ color: 'blue' }}>Voltar</Text>
                </TouchableOpacity>
                 <TouchableOpacity
                    style={styles.perfilContainer} // Estilo para o container da foto de perfil
                    onPress={() => setModalVisible(true)} // Abre o modal ao clicar na foto
                  >
                    <Image
                      source={usuarioLogado?.avatar ? deconvertBase64ToImage(usuarioLogado.avatar) : { uri: 'https://via.placeholder.com/150' }} // Use uma imagem padrão se não houver avatar
                      style={styles.headerPerfilImage} // Estilo para a imagem de perfil no cabeçalho
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{topicoTitle}</Text>
            </View>
            <Text style={styles.topicoDesc}>{topicoDesc}</Text>

            <FlatList
                data={mensagens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                         <TouchableWithoutFeedback onPress={() => abrirModalUsuario(item.userRef)}>
                            <View>
                                <Mensagem mensagem={item} />
                            </View>
                        </TouchableWithoutFeedback>
                         {verificarPermissaoExcluir(item.userRef) && (
                            <TouchableOpacity onPress={() => {
                                setMensagemParaDeletar(item.id);
                                setModalVisible(true);
                            }}>
                                <Text style={{ color: 'red', textAlign: 'right' }}>Excluir</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChangeText={setNovaMensagem}
                    onSubmitEditing={handleEnviarMensagem}
                    returnKeyType="send"
                />
                <BotaoPadrao onPress={handleEnviarMensagem} text="Enviar" />
            </View>
             <Modal visible={modalVisible} transparent animationType="slide">
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)} // Permite fechar clicando fora
                >
                    <TouchableWithoutFeedback>
                        {mensagemParaDeletar ? (
                            <View style={styles.modalExcluir}>
                                <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                                <Text style={styles.modalText}>Deseja realmente excluir esta mensagem?</Text>
                                <View style={styles.modalButtons}>
                                    <BotaoPadrao onPress={confirmarExclusaoMensagem} text="Sim" />
                                    <BotaoPadrao onPress={() => setModalVisible(false)} text="Não" />
                                </View>
                            </View>
                        ) : usuarioSelecionado ? (
                            <ScrollView style={styles.modalUsuario}>
                                 {/* Conteúdo do modal do usuário */}
                                <Text style={styles.modalTitle}>Informações do Usuário</Text>
                                 <Image
                                    source={usuarioLogado?.avatar ? deconvertBase64ToImage(usuarioLogado.avatar) : {uri: 'https://via.placeholder.com/150'}}
                                    style={styles.modalPerfilImage}
                                  />
                                <Text style={styles.modalText}>Nome: {usuarioLogado?.nome || 'Não disponível'}</Text>
                                <Text style={styles.modalText}>Email: {usuarioLogado?.email || 'Não disponível'}</Text>
                                <Text style={styles.modalText}>Idade: {usuarioLogado?.idade || 'Não disponível'}</Text>
                                 {/* Adicione aqui mais informações do usuário */}
                                <BotaoPadrao onPress={() => {}} text="Editar Perfil" />
                                <BotaoPadrao onPress={() => {}} text="Histórico de Doações" />
                                 <BotaoPadrao onPress={() => {}} text="Análise de Dados" />
                                <BotaoPadrao onPress={fecharModalUsuario} text="Fechar" />
                            </ScrollView>
                        ) : (
                            <View style={styles.modalExcluir}>
                                <Text style={styles.modalTitle}>Aviso</Text>
                                <Text style={styles.modalText}>Modal genérico ou vazio</Text>
                                 <BotaoPadrao onPress={() => setModalVisible(false)} text="Fechar" />
                            </View>
                        )}
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

TopicoScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            topicoId: PropTypes.string.isRequired,
            topicoTitle: PropTypes.string.isRequired,
            topicoDesc: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default TopicoScreen;
