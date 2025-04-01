import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { styles } from './style'; // Importe os estilos do arquivo style.js

const Forum = ({ navigation }) => {
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    maisVistos: false,
    maisRecentes: false,
  });
  const [foruns, setForuns] = useState([
    { id: '1', name: 'Geral', description: 'Discussões gerais sobre jogos indie.', views: 150, createdAt: '2024-01-15' },
    { id: '2', name: 'Desenvolvimento', description: 'Ajuda e dicas para desenvolver jogos independentes.', views: 200, createdAt: '2024-02-01' },
    { id: '3', name: 'Anúncios', description: 'Anuncie seu jogo indie aqui!', views: 100, createdAt: '2024-03-01' },
    { id: '4', name: 'Feedback', description: 'Peça e dê feedback em jogos em desenvolvimento.', views: 120, createdAt: '2024-03-10' },
  ]);

  const aplicarFiltros = () => {
    let forunsFiltrados = [...foruns];

    if (filtrosAtivos.maisVistos) {
      forunsFiltrados.sort((a, b) => b.views - a.views);
    } else if (filtrosAtivos.maisRecentes) {
      forunsFiltrados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return forunsFiltrados;
  };

  const handleFiltrar = (filtro) => {
    setFiltrosAtivos(prevState => ({
      maisVistos: filtro === 'maisVistos' ? !prevState.maisVistos : false,
      maisRecentes: filtro === 'maisRecentes' ? !prevState.maisRecentes : false,
    }));
  };

  const forunsFiltrados = aplicarFiltros();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Fóruns de Jogos Indie</Text>
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filtrosAtivos.maisVistos && styles.filterButtonActive]}
              onPress={() => handleFiltrar('maisVistos')}
            >
              <Text style={styles.filterButtonText}>Mais Vistos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filtrosAtivos.maisRecentes && styles.filterButtonActive]}
              onPress={() => handleFiltrar('maisRecentes')}
            >
              <Text style={styles.filterButtonText}>Mais Recentes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={forunsFiltrados}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.forumItem}
              onPress={() => navigation.navigate('ForumTopicos', { forumId: item.id, forumName: item.name })}
            >
              <Text style={styles.forumName}>{item.name}</Text>
              <Text style={styles.forumDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity
          style={styles.createNewForumButton}
          onPress={() => navigation.navigate('NovoForum')}
        >
          <Text style={styles.createNewForumButtonText}>Novo Fórum</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forum;