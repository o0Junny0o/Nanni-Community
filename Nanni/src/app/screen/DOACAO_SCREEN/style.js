import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    gap: 10,
    marginTop: 60,    
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    marginBottom: 30,
    fontSize: 24,
    fontFamily: fonts.monospaceExtrabold,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.p2,
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.roboto,
    color: colors.text,
  },
  input: {
    padding: 12,
    paddingVertical: 16,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    fontFamily: fonts.roboto,
    borderColor: colors.p5label,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    color: '#333',
    borderColor: '#ddd', // Light border
    borderWidth: 1,
  },
  doarButton: {
    backgroundColor: colors.p2, 
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  doarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    marginTop: 20,    
    opacity: 0.6,
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
  },
});

export { styles };
