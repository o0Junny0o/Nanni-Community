import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  pageTitle: {
    width: '100%',
    marginBottom: 40,
    // Texto:
    fontFamily: 'Roboto Mono',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.p2,
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: colors.p6,
  },
  searchBarText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
    letterSpacing: 1.25,
    color: colors.text,
  },
  searchTools: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  searchFilterPicker: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    width: 0,
    height: 0,
    opacity: 0.0,
  },
  filterCIndicativa: {
    backgroundColor: colors.overlayBackground,
    color: colors.text,
    fontFamily: 'Roboto',
  },
  searchTagView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 3,
    borderRadius: 15,
    gap: 5,
    backgroundColor: colors.p1,
  },
  searchTagViewEssential: {
    backgroundColor: colors.aviso,
  },
  searchTagText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: colors.p6,
  },
});

const explorarItemStyles = StyleSheet.create({
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
    fontFamily: 'Roboto Mono',
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
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
  tagView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  tagBody: {
    width: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    // Texto:
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 1.25,
    // Cor:
    color: colors.p6,
    backgroundColor: colors.p5,
  },
});

export { styles, explorarItemStyles };
