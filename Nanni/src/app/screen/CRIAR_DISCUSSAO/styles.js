import { StyleSheet } from 'react-native';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    color: colors.p6,
    //
  },
  loading: {
    opacity: 0.5,
  },
  title: {
    width: '100%',
    marginBottom: 40,
    // Texto:
    fontFamily: fonts.monospaceExtrabold,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    color: colors.p2,
    // underline:
    borderBottomWidth: 2,
    borderBottomColor: colors.p2,
    paddingBottom: 5,
  },
  inputView: {
    flex: 1,
    gap: 10,
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    // Border:
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.p5label,
    marginVertical: 5,
  },
  multilineTextInput: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  assistiveText: {
    fontFamily: fonts.roboto,
    color: colors.aviso,
  },
  section: {
    marginTop: 30,
    // Texto:
    fontFamily: fonts.robotoMonoBold,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.25,
    color: colors.p2,
  },
  button: {
    width: '80%',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: colors.p3,
  },
  buttonTxt: {
    color: colors.p6,
  },
  tag: {
    backgroundColor: colors.p5,
    alignSelf: 'flex-start',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 16,
    // Texto:
    fontFamily: fonts.roboto,
    fontSize: 16,
    letterSpacing: 1.25,
    textAlign: 'left',
  },
});

export default styles;
