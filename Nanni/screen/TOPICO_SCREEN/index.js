import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import styles from './style'; // Importe os estilos do arquivo style.js

const Topico = ({ route, navigation }) => {
  const { topicId } = route.params;
  const [topico, setTopico] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');

  const topicoFicticio = { id: topicId, titulo: 'Dúvida sobre Unity vs Godot para iniciantes', autor: 'GameDevNovato', conteudo: 'Olá pessoal, estou começando a desenvolver jogos indie e estou indeciso entre Unity e Godot...', criadoEm: 'Ontem' };
  const comentariosFicticios = [
    { id: '1', autor: 'Usuario опытный', texto: 'Eu recomendo começar com Godot, é mais simples para iniciantes!', criadoEm: 'Hoje' },
    { id: '2', autor: 'UnityPro', texto: 'Unity tem mais recursos e uma comunidade maior, mas a curva de aprendizado é maior.', criadoEm: 'Agora' },
  ];

  useEffect(() => {
    setTopico(topicoFicticio);
    setComentarios(comentariosFicticios);
  }, [topicId]);

  const renderizarComentarioItem = ({ item }) => (
    <View style={styles.itemComentario}>
      <View style={styles.cabecalhoComentario}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/30' }}
        />
        <Text style={styles.autorComentario}>{item.autor}</Text>
        <Text style={styles.dataComentario}>{item.criadoEm}</Text>
      </View>
      <Text style={styles.textoComentario}>{item.texto}</Text>
    </View>
  );

  const lidarComAdicaoDeComentario = () => {
    if (novoComentario.trim()) {
      const novoComentarioObjeto = { id: String(comentarios.length + 1), autor: 'Você', texto: novoComentario, criadoEm: 'Agora' };
      setComentarios([...comentarios, novoComentarioObjeto]);
      setNovoComentario('');
    }
  };

  if (!topico) {
    return <Text>Carregando tópico...</Text>;
  }

   return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}> {/* Aplica o backgroundColor aqui */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.containerTopico}>
          <Text style={styles.tituloTopico}>{topico.titulo}</Text>
          <View style={styles.cabecalhoTopico}>
            <Text>Criado por: {topico.autor}</Text>
            <Text>Em: {topico.criadoEm}</Text>
          </View>
          <Text style={styles.conteudoTopico}>{topico.conteudo}</Text>
        </View>

        <Text style={styles.tituloComentarios}>Comentários</Text>
        <FlatList
          data={comentarios}
          renderItem={renderizarComentarioItem}
          keyExtractor={item => item.id}
          style={styles.listaComentarios}
        />

        <View style={styles.containerAdicionarComentario}>
          <TextInput
            style={styles.inputComentario}
            placeholder="Adicionar um comentário..."
            value={novoComentario}
            onChangeText={setNovoComentario}
          />
          <TouchableOpacity style={styles.botaoEnviar} onPress={lidarComAdicaoDeComentario}>
            <Text style={styles.textoBotaoEnviar}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Topico;