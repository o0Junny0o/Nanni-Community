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
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: fonts.robotoMonoBold,
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.p3,
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
  buttonTxt: {
    color: colors.p6,
  },
});

const forumSeguidosStyles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.p6,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
    // Shadow:
    elevation: 6,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.robotoMonoBold,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1.25,
  },
  desc: {
    color: colors.p3,
    opacity: 0.8,
    fontFamily: fonts.roboto,
    fontSize: 14,
    letterSpacing: 1.25,
  },
});

const forumDonoStyles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.p6,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
    // Shadow:
    elevation: 6,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.monospaceExtrabold,
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1.25,
    textAlignVertical: 'center',
  },
  iconEdit: {
    paddingVertical: 5,
    paddingLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 75,
    backgroundColor: colors.overlayBackground,
    borderWidth: 0.5,
    borderColor: colors.p2,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowsOptions: {
    justifyContent: 'flex-end',
  },
  extra: {
    color: colors.p3,
    fontFamily: fonts.roboto,
    fontSize: 16,
    letterSpacing: 1.25,
    opacity: 0.7,
  },
});

export { styles, forumSeguidosStyles, forumDonoStyles };
