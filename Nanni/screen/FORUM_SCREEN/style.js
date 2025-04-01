import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinhar o botão Voltar à esquerda
    marginBottom: 20,
    paddingTop: 20, // Aumentei o paddingTop para abaixar o botão Voltar
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
});