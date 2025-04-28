import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import forumQuery from '../../../hooks/forum/forumQuery';

export default function TopicoScreen({ route }) {
  const { topicoId } = route.params;
  const [topicoDetalhes, setTopicoDetalhes] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDetalhesDoTopico = async () => {
      setLoading(true);
      setError(null);
      try {
        const detalhes = await forumQuery({ forumID: topicoId });
        if (detalhes) {
          setTopicoDetalhes(detalhes);
        } else {
          setError('Tópico não encontrado.');
        }
      } catch (e) {
        setError('Erro ao carregar detalhes do tópico.');
        console.error('Erro ao buscar tópico:', e);
      } finally {
        setLoading(false);
      }
    };

    carregarDetalhesDoTopico();
  }, [topicoId]);

  const enviarMensagem = () => {
    if (mensagem.trim().length === 0) return; // Evita mensagens vazias

    setMensagens([
      ...mensagens,
      { id: mensagens.length.toString(), texto: mensagem, enviada: true },
    ]);
    setMensagem(''); // Limpa o campo após envio
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Carregando Tópico...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Erro ao Carregar Tópico</Text>
          <Text style={styles.descricao}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!topicoDetalhes) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Tópico não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>{topicoDetalhes.forumName}</Text>
        <Text style={styles.descricao}>{topicoDetalhes.forumDesc}</Text>
      </View>

      {/* Lista de mensagens */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.mensagem,
              item.enviada ? styles.enviada : styles.recebida,
            ]}
          >
            <Text style={styles.mensagemTexto}>{item.texto}</Text>
          </View>
        )}
        style={styles.chatArea}
      />

      {/* Entrada de mensagem */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#666"
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

TopicoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      topicoId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};