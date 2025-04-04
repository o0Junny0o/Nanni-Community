import { Animated, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    width: "100%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center', // Alinhar o botão Voltar à esquerda
    paddingTop: 30,
    paddingBottom:10, // Aumentei o paddingTop para abaixar o botão Voltar
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#163690',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#071934',
    textAlign: 'center',
    marginTop: 10, // Adicionei marginTop para afastar o título do botão Voltar
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center', // Centralizar os botões de filtro
    padding: 15
  },
  filterButton: {
    backgroundColor: '#5d90d6', // Cor do botão Novo Fórum
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: '#163690',
  },
  filterButtonText: {
    color: '#FFFFFF', // Texto branco para combinar com o botão Novo Fórum
    fontWeight: 'bold',
  },
  forumItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  forumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#071934',
  },
  forumDescription: {
    fontSize: 14,
    color: '#163690',
    marginTop: 5,
  },
  createNewForumButton: {
    backgroundColor: '#5d90d6',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createNewForumButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalPerfil:{
    flex:1,
    backgroundColor: "#1D5DB555",
    width:"100%"
  },

  modalPerfilInfos:{
    justifyContent: "center",
    alignItems:"center",
    width: "100%"
  },

  imgModalPerfil:{
    alignItems:'center',
    gap: 10
  },

  imgModalPerfil02:{
    width:300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#5d90d6",
    boxShadow: "2 2 5 2 #00000044"
  },

  userInfos:{
    width:"70%",
    margin: 50
  },

  boxInfo:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
  },

  InputText:{
    backgroundColor: "white",
    width: "70%",
    padding: 15,
    borderRadius: 15,
    boxShadow: "2 2 3  #00000033"
  },

  navigBotoes:{
    gap: 20,
    alignItems:"center",
    justifyContent:"center"
  },

  modalTopico:{
    backgroundColor: "white",
    margin:"auto",
    padding: 50,
    boxShadow: "0 4 5 1 #0003",
    borderRadius: 20,
    width: "90%",
    gap: 15,
    alignItems:"center"
  },

  modalTextInput:{
    padding: 20,
    alignItems:"center",
    borderWidth:1,
    borderColor: "#0006",
    width: "70%",
    borderRadius: 15,    
  }
});