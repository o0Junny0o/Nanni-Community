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

export { styles };