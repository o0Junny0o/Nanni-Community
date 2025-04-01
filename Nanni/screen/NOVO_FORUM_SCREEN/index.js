import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import styles from './style';

const NovoForum = ({ navigation }) => {
  const [nomeDoForum, setNomeDoForum] = useState('');
  const [descricaoDoForum, setDescricaoDoForum] = useState('');

  const lidarComCriacaoDoForum = () => {
    if (nomeDoForum.trim() && descricaoDoForum.trim()) {
      console.log('Novo fórum:', { nomeDoForum, descricaoDoForum });
      Alert.alert('Sucesso', 'Fórum criado com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, preencha o nome e a descrição do fórum.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Criar Novo Fórum</Text>

        <Text style={styles.label}>Nome do Fórum:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Desenvolvimento, Anúncios, etc."
          value={nomeDoForum}
          onChangeText={setNomeDoForum}
        />

        <Text style={styles.label}>Descrição do Fórum:</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Descreva o tema do fórum."
          multiline
          numberOfLines={5}
          value={descricaoDoForum}
          onChangeText={setDescricaoDoForum}
        />

        <TouchableOpacity style={styles.botaoCriar} onPress={lidarComCriacaoDoForum}>
          <Text style={styles.textoBotaoCriar}>Criar Fórum</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovoForum;