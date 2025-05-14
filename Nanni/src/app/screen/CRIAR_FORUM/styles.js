import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    width: '100%',
    marginVertical: 20,
    // Texto:
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.25,
    color: colors.p2,
  },
  tagsPageTitle: {
    marginVertical: 20,
    marginTop: 30,
    // Texto:
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.25,
    color: colors.p2,
  },
  tagsSection: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    // Border:
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colors.p5label,
    marginVertical: 5,
  },
  textInputInactive: {
    opacity: 0.8,
  },
  multilineTextInput: {
    textAlignVertical: 'top',
    minHeight: 100,
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
});

export default styles;
