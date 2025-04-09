import { StyleSheet } from 'react-native';

const colors = {
  primary: '#A349A4',
  secondary: '#42FFA3',
  text: '#000000',
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#f9f9f9',
  border: '#ccc',
  darkBlue: '#071934',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: colors.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.text,
  },
  showPasswordText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  botao: {
    width: '80%',
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoTexto: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: colors.primary,
    marginTop: 15,
    textAlign: 'center',
  },
  touchable_opacity: {
    width: '100%',
  },
  fotoPerfilContainerRectangular: {
    width: '100%', // Ocupa a largura total
    height: 80, // Altura desejada
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfilRectangular: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  fotoPerfilPlaceholderRectangular: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFotoPerfilRectangular: {
    color: colors.darkBlue,
    textAlign: 'center',
  },
});

export default styles;
