import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.p6,
    padding: 20,
    marginBottom: 20,
    // Shadow:
    elevation: 6,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.robotoMonoBold,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: colors.text,
  },
  avatar: {
    minHeight: 40,
    minWidth: 40,
    borderRadius: 72,
    marginRight: 12,
    backgroundColor: colors.p2,
  },
  desc: {
    width: '100%',
    minHeight: 20,
    maxHeight: 50,
    marginVertical: 15,
    fontFamily: fonts.roboto,
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
  tagView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 5,
  },
  tagBody: {
    width: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    // Texto:
    fontFamily: fonts.roboto,
    fontSize: 14,
    letterSpacing: 1.25,
    // Cor:
    color: colors.p6,
    backgroundColor: colors.p5,
  },
  tagBodyIndicativa: {
    backgroundColor: colors.aviso,
  },
});

export default styles;
