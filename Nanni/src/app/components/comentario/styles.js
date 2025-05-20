import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts'

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 'auto',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconReport: {
    color: colors.p5label,
    opacity: 0.75,
  },
  viewOtherUser: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  viewUser: {
    alignItems: 'flex-end',
  },
  comentarioView: {
    width: '75%',
    padding: 16,
    paddingBottom: 10,
    gap: 8,
    backgroundColor: colors.p6,
    elevation: 4,
    borderRadius: 16,
  },
  comentarioViewOtherUser: {
    borderTopLeftRadius: 0,
    paddingTop: 10,
  },
  comentarioViewUser: {
    borderTopRightRadius: 0,
    backgroundColor: colors.p5,
  },
  expandir: {
    textAlign: 'center',
    borderTopWidth: 0.75,
    opacity: 0.5,
  },
  expandirHover: {
    opacity: 1,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: fonts.roboto,
    fontSize: 16,
    letterSpacing: 1.25,
  },
  gifImage: {
    width: '100%',
    height: 100,
  },
  date: {
    textAlign: 'right',
  },
  author: {
    fontFamily: fonts.roboto,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: colors.p5,
  },
});

export default styles;
