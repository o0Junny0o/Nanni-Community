import { StyleSheet } from 'react-native';

const colors = {
  background: '#F5F5F5',
  primary: '#5d90d6',
  primaryDark: '#163690',
  textDark: '#071934',
  white: '#FFFFFF',
  border: '#E0E0E0',
  shadowLight: '#00000033',
  shadowMedium: '#0003',
  modalOverlay: '#1D5DB555',
  modalImageShadow: '#00000044',
  inputBorder: '#0006',
  lightBlue: '#ddeeff',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 10,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    padding: 15,
  },
  filterButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: colors.primaryDark,
  },
  filterButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  forumItem: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  forumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  forumDescription: {
    fontSize: 14,
    color: colors.primaryDark,
    marginTop: 5,
  },
  createNewForumButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createNewForumButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalPerfil: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    width: '100%',
  },
  modalPerfilInfos: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imgModalPerfil: {
    alignItems: 'center',
    rowGap: 10, // substituindo gap por rowGap (suportado no RN >= 0.71)
  },
  imgModalPerfil02: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primary,
    elevation: 5, // sombra para Android
    shadowColor: colors.modalImageShadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  userInfos: {
    width: '70%',
    margin: 50,
  },
  boxInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InputText: {
    backgroundColor: colors.white,
    width: '70%',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: colors.shadowLight,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  navigBotoes: {
    rowGap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTopico: {
    backgroundColor: colors.white,
    padding: 50,
    borderRadius: 20,
    width: '90%',
    rowGap: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  modalTextInput: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    width: '70%',
    borderRadius: 15,
  },

  perfilImage: {
    width: 60,
    height: 60,
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
  },
  noTopicsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTopicsText: {
    fontSize: 16,
    color: colors.textDark,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlayTouchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  fullFlex: {
    flex: 1,
  },
});

export default styles;
