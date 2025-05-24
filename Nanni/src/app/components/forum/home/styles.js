import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";

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
    fontSize: 18,
    letterSpacing: 1.25,
    textAlignVertical: 'center',
  },
  iconConfigView: {
    paddingVertical: 5,
    paddingLeft: 10,
  },
  iconConfig: {
    color: colors.p3,
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
    fontSize: 14,
    letterSpacing: 1.25,
    opacity: 0.7,
  },
});


export { forumDonoStyles, forumSeguidosStyles }