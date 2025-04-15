import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Modal,
    TextInput,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './styles'; // Make sure this path is correct
import PropTypes from 'prop-types';
import BotaoPadrao from '../../components/buttons/BotaoPadrao/index'; // Corrected import
import { useAuth } from '../../components/contexts/AuthContext'; // Corrected import
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/Conexao'; // Corrected import
import forumList from '../../../hooks/forum/forumList'; // Corrected import
import forumCreate from '../../../hooks/forum/forumCreate'; // Corrected import
import forumDelete from '../../../hooks/forum/forumDelete'; // Corrected import
import forumUpdate from '../../../hooks/forum/forumUpdate'; // Corrected import
import Forum from '../../../model/Forum'; // Corrected import
import { deconvertBase64ToImage } from '../../../utils/Base64Image'; // Corrected import
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ScrollView } from 'react-native';

// Componente de Modal fora do ForumScreen
const CriarTopicoModal = ({ visible, onClose, onCreate }) => {
    const [topicoTitle, setTopicoTitle] = useState('');
    const [topicoDesc, setTopicoDesc] = useState('');

    const handleCreate = () => {
        if (topicoTitle.trim() === '' || topicoDesc.trim() === '') {
            alert('Preencha todos os campos!');
            return;
        }
        onCreate(topicoTitle, topicoDesc);
        setTopicoTitle('');
        setTopicoDesc('');
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableOpacity
                onPressOut={onClose}
                style={styles.modalContainer}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.modalTopico}>
                        <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                            <Text style={{ color: 'blue' }}>Voltar</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Criar Tópico</Text>
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="Nome do Tópico"
                            onChangeText={setTopicoTitle}
                            value={topicoTitle}
                        />
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="Descrição"
                            onChangeText={setTopicoDesc}
                            value={topicoDesc}
                        />
                        <BotaoPadrao onPress={handleCreate} text="Criar novo tópico" />
                        <BotaoPadrao onPress={onClose} text="Cancelar" />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

CriarTopicoModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

const ForumScreen = ({ navigation }) => {
    const { user, signOut } = useAuth();
    const [filtrosAtivos, setFiltrosAtivos] = useState({
        maisVistos: false,
        maisRecentes: false,
    });
    const [topicos, setTopicos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
    const [topicoParaEditar, setTopicoParaEditar] = useState(null);
    const [nomeEditado, setNomeEditado] = useState('');
    const [descricaoEditada, setDescricaoEditada] = useState('');
    const [userData, setUserData] = useState(null); // State para armazenar os dados do usuário

    const carregarTopicosDoForum = useCallback(async () => {
        try {
            const listaDeTopicos = await forumList(5); // Correct usage
            setTopicos(listaDeTopicos.map(topico => ({ ...topico })));
        } catch (error) {
            console.error('Erro ao carregar tópicos:', error);
            alert('Erro ao carregar os tópicos do fórum.');
        }
    }, []);

    const carregarDadosUsuario = useCallback(async () => {
        try {
            if (!user?.uid) return;

            const userRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) return;

            const data = docSnap.data();
            setUserData(data); // Armazena os dados do usuário
            if (data.avatar) {
                setFotoPerfil(deconvertBase64ToImage(data.avatar) || '');
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar perfil');
        }
    }, [user?.uid]);

    useEffect(() => {
        carregarDadosUsuario();
        carregarTopicosDoForum();
    }, [carregarDadosUsuario, carregarTopicosDoForum]);

    const handleCriarNovoTopico = useCallback(async (title, desc) => {
        try {
            const novoForumData = new Forum({
                userRef: user.uid,
                forumName: title,
                forumDesc: desc,
                forumRating: 'pg',
            });

            const sucesso = await forumCreate(novoForumData); // Correct usage

            if (sucesso) {
                alert('Tópico criado com sucesso!');
                carregarTopicosDoForum();
            } else {
                alert('Erro ao criar o tópico. Tente novamente.');
            }
        } catch (error) {
            console.error("Error creating topic", error);
            alert('An unexpected error occurred while creating the topic.');
        }
    }, [user?.uid, carregarTopicosDoForum]);

    const aplicarFiltros = useCallback(() => {
        let topicosFiltrados = [...topicos];

        if (filtrosAtivos.maisVistos) {
            topicosFiltrados.sort(
                (a, b) => (b?.forumRating || 0) - (a?.forumRating || 0),
            );
        } else if (filtrosAtivos.maisRecentes) {
            topicosFiltrados.sort(
                (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0),
            );
        }

        return topicosFiltrados;
    }, [topicos, filtrosAtivos]);

    const handleFiltrar = (filtro) => {
        setFiltrosAtivos((prevState) => ({
            maisVistos: filtro === 'maisVistos' ? !prevState.maisVistos : false,
            maisRecentes: filtro === 'maisRecentes' ? !prevState.maisRecentes : false,
        }));
    };

    const topicosFiltrados = aplicarFiltros();

    const handleExcluirAtualizarTopico = useCallback(async (forumID, action, newName, newDesc) => {
        try {
            let sucesso = false;
            let message = '';

            if (action === 'delete') {
                sucesso = await forumDelete({ forumID }); // Correct usage
                message = `Tópico excluído com sucesso!`;
            } else if (action === 'update') {
                if (!newName || !newDesc) {
                    alert('Preencha nome e descrição para atualizar.');
                    return;
                }
                sucesso = await forumUpdate(forumID, user.uid, newName, newDesc); // Correct usage
                message = `Tópico atualizado com sucesso!`;
            }

            if (sucesso) {
                alert(message);
                await carregarTopicosDoForum();
            } else {
                alert(`Erro ao ${action === 'delete' ? 'excluir' : 'atualizar'} o tópico. Verifique as permissões.`);
            }
        } catch (error) {
            console.error(`Error during ${action}:`, error);
            alert(`An unexpected error occurred during ${action}.`);
        }
    }, [user?.uid, carregarTopicosDoForum]);

    const handleEditarTopico = useCallback((item) => {
        setTopicoParaEditar(item);
        setNomeEditado(item?.forumName || '');
        setDescricaoEditada(item?.forumDesc || '');
        setModalEditarVisivel(true);
    }, []);

    const confirmarEditarTopico = useCallback(() => {
        if (topicoParaEditar?.forumID) {
            handleExcluirAtualizarTopico(topicoParaEditar.forumID, 'update', nomeEditado, descricaoEditada);
            setModalEditarVisivel(false);
            setTopicoParaEditar(null);
            setNomeEditado('');
            setDescricaoEditada('');
        }
    }, [handleExcluirAtualizarTopico, nomeEditado, descricaoEditada, topicoParaEditar?.forumID]);

    const cancelarEditarTopico = useCallback(() => {
        setModalEditarVisivel(false);
        setTopicoParaEditar(null);
        setNomeEditado('');
        setDescricaoEditada('');
    }, []);

    // Adicionada função para deslogar
    const handleLogout = () => {
        signOut();
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>FÓRUM</Text>
                <Menu>
                    <MenuTrigger trigger={<Image source={fotoPerfil} style={styles.perfilImage} />}>
                        <MenuOptions>
                            <ScrollView>
                                {userData && (
                                    <>
                                        <MenuOption disabled={true}>
                                            <Text style={{ fontWeight: 'bold' }}>{userData.nome}</Text>
                                        </MenuOption>
                                        <MenuOption disabled={true}>
                                            <Text>{userData.email}</Text>
                                        </MenuOption>
                                        <MenuOption disabled={true}>
                                            <Text>Idade: {userData.idade}</Text>
                                        </MenuOption>
                                    </>
                                )}
                                <MenuOption onSelect={() => navigation.navigate('PerfilUsuario')} text="Ver Perfil" />
                                <MenuOption onSelect={() => { }} text="Editar Perfil" />
                                <MenuOption onSelect={() => { }} text="Histórico de Doações" />
                                <MenuOption onSelect={() => { }} text="Análise de Dados" />
                                <MenuOption onSelect={handleLogout} text="Logout" />
                            </ScrollView>
                        </MenuOptions>
                    </MenuTrigger>
                </Menu>
            </View>

            {topicos.length === 0 ? (
                <View style={styles.noTopicsContainer}>
                    <Text style={styles.noTopicsText}>Ainda não existem Tópicos</Text>
                </View>
            ) : (
                <View style={styles.fullFlex}>
                    <View style={styles.filterButtonsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filtrosAtivos.maisVistos && styles.filterButtonActive,
                            ]}
                            onPress={() => handleFiltrar('maisVistos')}
                        >
                            <Text style={styles.filterButtonText}>Mais Vistos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filtrosAtivos.maisRecentes && styles.filterButtonActive,
                            ]}
                            onPress={() => handleFiltrar('maisRecentes')}
                        >
                            <Text style={styles.filterButtonText}>Mais Recentes</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={topicosFiltrados}
                        keyExtractor={(item) => item?.forumID}
                        renderItem={({ item }) => (
                            <View style={styles.forumItem}>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() =>
                                        navigation.navigate('TopicoScreen', {
                                            topicoId: item?.forumID,
                                            topicoTitle: item?.forumName,
                                            topicoDesc: item?.forumDesc,
                                        })
                                    }
                                >
                                    <Text style={styles.forumName}>{item?.forumName}</Text>
                                    <Text style={styles.forumDescription}>
                                        Descrição: {item?.forumDesc}
                                    </Text>
                                    <Text style={styles.forumDescription}>
                                        ID: {item?.forumID}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ marginLeft: 10 }}
                                        onPress={() => handleEditarTopico(item)}
                                    >
                                        <Text style={{ color: 'blue', marginTop: 5 }}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ marginLeft: 10 }}
                                        onPress={() => handleExcluirAtualizarTopico(item?.forumID, 'delete')}
                                    >
                                        <Text style={{ color: 'red', marginTop: 5 }}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}

            <CriarTopicoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreate={handleCriarNovoTopico}
            />

            <Modal visible={modalEditarVisivel} transparent animationType="slide">
                <TouchableOpacity
                    onPressOut={cancelarEditarTopico}
                    style={styles.modalContainer}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalTopico}>
                            <Text style={styles.modalTitle}>Editar Tópico</Text>
                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Novo Nome do Tópico"
                                onChangeText={setNomeEditado}
                                value={nomeEditado}
                            />
                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Nova Descrição"
                                onChangeText={setDescricaoEditada}
                                value={descricaoEditada}
                            />
                            <BotaoPadrao onPress={confirmarEditarTopico} text="Salvar Edições" />
                            <BotaoPadrao onPress={cancelarEditarTopico} text="Cancelar" />
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            <TouchableOpacity
                style={styles.createNewForumButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.createNewForumButtonText}>Novo Tópico</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

ForumScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default ForumScreen;
