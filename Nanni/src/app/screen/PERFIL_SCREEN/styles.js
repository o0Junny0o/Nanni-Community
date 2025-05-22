import { StyleSheet } from 'react-native';

const colors = {
  background: '#F5F5F5',
  profileBackground: '#5d90d6',
  profileBorder: '#B88CB4',
  editIconBackground: '#1D5DB5',
  infoBoxBackground: '#FFFFFF',
  shadowColor: '#000000',
  infoText: '#333333',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  modalBackground: '#FFFFFF',
  inputBorder: '#CCCCCC',
  buttonBackground: '#5d90d6',
  buttonBorder: '#5d90d6',
  buttonText: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: colors.profileBorder,
  },
  imageWrapper: {
  position: 'relative',
  width: 150,
  height: 150,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.editIconBackground,
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: 'column',
    width: '80%',
    marginTop: 30,
    alignSelf: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.infoBoxBackground,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: colors.infoText,
  },
  infoLabel: {
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalOverlay,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.modalBackground,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    backgroundColor: colors.buttonBackground,
  },
  saveButton: {
    backgroundColor: colors.buttonBackground,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
  logoutButton: {
    padding: 10,
  },
  linkText: {
    color: '#5D90D6',
    fontSize: 20,
    marginBottom: 15,
  },
  linkButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  historicoItem: {
    marginBottom: 10,
    lineHeight: 50,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.buttonBorder,
    width: '100%',
  },
  iconContainer: {
    width: 24,
    padding: 4, // Para melhor visualização
    borderRadius: 4, // Opcional
  },
});

export default styles;
