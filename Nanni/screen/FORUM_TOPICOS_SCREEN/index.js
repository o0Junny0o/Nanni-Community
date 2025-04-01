import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style'; // Importe os estilos do arquivo styles.js

const ForumTopicos = ({ route, navigation }) => {
  const { idForum, nomeForum } = route.params;

  const topicos = [
    { id: '1', titulo: 'Dúvida sobre Unity vs Godot para iniciantes', autor: 'GameDevNovato', criadoEm: 'Ontem' },
    { id: '2', titulo: 'Anunciando meu novo jogo de plataforma 2D!', autor: 'IndieDevBR', criadoEm: 'Hoje' },
    { id: '3', titulo: 'Feedback no protótipo do meu RPG', autor: 'RPGmakerFan', criadoEm: 'Agora' },
  ];

  const renderizarItemTopico = ({ item }) => (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={() => navigation.navigate('Topico', { idTopico: item.id })}
    >
      <Text style={styles.topicTitle}>{item.titulo}</Text>
      <Text style={styles.topicInfo}>Por {item.autor} em {item.criadoEm}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.forumTitle}>{nomeForum}</Text>
      <FlatList
        data={topicos}
        renderItem={renderizarItemTopico}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={styles.createNewTopicButton}
        onPress={() => navigation.navigate('NovoTopico')}
      >
        <Text style={styles.createNewTopicButtonText}>Novo Tópico</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForumTopicos;