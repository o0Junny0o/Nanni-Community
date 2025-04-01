import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import styles from './style';

const NovoTopico = ({ navigation }) => {
  const [tituloDoTopico, setTituloDoTopico] = useState('');
  const [conteudoDoTopico, setConteudoDoTopico] = useState('');

  const lidarComCriacaoDoTopico = () => {
    if (tituloDoTopico.trim() && conteudoDoTopico.trim()) {
      console.log('Novo tópico:', { tituloDoTopico, conteudoDoTopico });
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, preencha o título e o conteúdo do tópico.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Criar Novo Tópico</Text>

        <Text style={styles.label}>Título do Tópico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dúvida com animações, Anúncio do meu jogo, etc."
          value={tituloDoTopico}
          onChangeText={setTituloDoTopico}
        />

        <Text style={styles.label}>Conteúdo do Tópico:</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Digite o conteúdo do tópico."
          multiline
          numberOfLines={5}
          value={conteudoDoTopico}
          onChangeText={setConteudoDoTopico}
        />

        <TouchableOpacity style={styles.botaoCriar} onPress={lidarComCriacaoDoTopico}>
          <Text style={styles.textoBotaoCriar}>Criar Tópico</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovoTopico;