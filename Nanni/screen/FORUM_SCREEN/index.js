import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Modal, TextInput, Image } from 'react-native';
import { styles } from './style'; // Importe os estilos do arquivo style.js
import BotaoPadrao from '../../src/componentes/BotaoPadrao';

const Forum = ({ navigation }) => {
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    maisVistos: false,
    maisRecentes: false,
  });

  const [topico, setTopico] = useState([])
  const [topicoTitle, setTopicoTitle] = useState('')
  const [topicoDesc, setTopicoDesc] = useState('')
  const [modal, setModal] = useState(false)
  const [modalPerfil, setModalPerfil] = useState(false)

  const CriarNovoTopico = () => {
    if(topicoTitle.trim() === '' || topicoDesc.trim() === ''){
      alert('Preencha todos os campos!')
      return;
    }

    const novoTopico = {
      id: Date.now(),
      title: topicoTitle,
      describe: topicoDesc
    }
    setTopico([...topico, novoTopico])
    setTopicoDesc('')
    setTopicoTitle('')
    setModal(false)
  }

  const aplicarFiltros = () => {
    let topicosFiltrados = [...topico];

    if (filtrosAtivos.maisVistos) {
      topicosFiltrados.sort((a, b) => b.id - a.id);
    } else if (filtrosAtivos.maisRecentes) {
      topicosFiltrados.sort((a, b) => new Date(b.id) - new Date(a.id));
    }

    return topicosFiltrados;
  };

  const handleFiltrar = (filtro) => {
    setFiltrosAtivos(prevState => ({
      maisVistos: filtro === 'maisVistos' ? !prevState.maisVistos : false,
      maisRecentes: filtro === 'maisRecentes' ? !prevState.maisRecentes : false,
    }));
  };

  const topicosFiltrados = aplicarFiltros();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, width: "100%"}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>FÓRUM</Text>
          {/** Adicionar a foto de perfil */}
          <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario') }>
            <Image source={require('../../assets/perfil2.png')} style={{width:60, height:60, backgroundColor:"#ddeeff", borderRadius:50}} />
          </TouchableOpacity>
        </View>

          {
            (topico.length == 0) ? (
              <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text>Ainda não existem Tópicos</Text>
              </View>
            ) : (
              <View style={{flex:1}}>
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
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={topicosFiltrados}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.forumItem}
                      onPress={() => navigation.navigate('TopicoScreen', { topícoId: item.id, topicoTitle: item.title, topicoDesc: item.describe })}
                    >
                      <Text style={styles.forumName}>{item.title}</Text>
                      <Text style={styles.forumDescription}>Descrição: {item.describe}</Text>
                      <Text style={styles.forumDescription}>id: {item.id}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )
          }

        <Modal visible={modal} transparent={true}>

          <View style={{flex:1,backgroundColor: '#0007'}}>

            <View style={{flex: 1}}>
              <TouchableOpacity style={{flex: 1}} onPress={() => setModal(false)}></TouchableOpacity>
            </View>
            
            <View style={styles.modalTopico}>
              <Text style={{fontSize:20}}>Criar Tópico</Text>
              <TextInput style={styles.modalTextInput} placeholder='Nome do Tópico' onChangeText={setTopicoTitle} value={topicoTitle} />
              <TextInput style={styles.modalTextInput} placeholder='Descrição' onChangeText={setTopicoDesc} value={topicoDesc} />
              
              <BotaoPadrao onPress={() => CriarNovoTopico()} text={'Criar novo tópico'} />
              <BotaoPadrao onPress={() => setModal(false)} text={'Cancelar'} />
            </View>

            <View  style={{flex: 1}}>
              <TouchableOpacity style={{flex: 1}} onPress={() => setModal(false)}></TouchableOpacity>
            </View>

          </View>
        </Modal>

        <TouchableOpacity
          style={styles.createNewForumButton}
          onPress={() => setModal(true)}
        >
          <Text style={styles.createNewForumButtonText}>Novo Tópico</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forum;