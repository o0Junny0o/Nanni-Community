import React, { useState } from 'react';
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

export default function TopicoScreen({ route }) {
  const { topicoTitle, topicoDesc } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const enviarMensagem = () => {
    if (mensagem.trim().length === 0) return; // Evita mensagens vazias

    setMensagens([
      ...mensagens,
      { id: mensagens.length.toString(), texto: mensagem, enviada: true },
    ]);
    setMensagem(''); // Limpa o campo após envio
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>{topicoTitle}</Text>
        <Text style={styles.descricao}>{topicoDesc}</Text>
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
      topicoTitle: PropTypes.string.isRequired,
      topicoDesc: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
