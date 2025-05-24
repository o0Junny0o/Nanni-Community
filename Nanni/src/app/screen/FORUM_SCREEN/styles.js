import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.p6,
    width: '100%',
  },
  titleDisc: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.robotoMonoBold,
    color: colors.p3,
    paddingBottom: 15,
  },
  footerList: {
    paddingHorizontal: 50,
    paddingBottom: 90,
    paddingTop: 20,
    opacity: 0.5,
    // Texto:
    fontFamily: fonts.roboto,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.text,
  },
  createNewForumButton: {
    position: 'absolute',
    alignItems: 'center',
    width: '50%',
    bottom: 20,
    right: 0,
    margin: 10,
    fontFamily: fonts.roboto,
    backgroundColor: colors.p3,
    paddingVertical: 12,
    borderRadius: 5,
  },
  createNewForumButtonText: {
    color: colors.p6,
    fontFamily: fonts.robotoMonoBold,
    fontWeight: 'bold',
    fontSize: 16,
  },
  fullFlex: {
    flex: 1,
    position: 'relative',
    padding: 20,
  },
  discListGap: {
    gap: 10,
  },
});

export default styles;
