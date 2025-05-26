import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
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
  section: {
    height: 'auto',
    marginBottom: 40,
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: colors.p3,
  },
  buttonCenter: { 
    alignSelf: 'center',
    margin: 0,
    marginLeft: 23,
  },
  buttonTxt: {
    color: colors.p6,
  },
  toHomeContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  toHomeOUTxt: {
    fontFamily: fonts.monospaceExtrabold,
    fontSize: 22,
    letterSpacing: 1.25,
    fontWeight: "bold",
  },
  toHomeTxt: { 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
