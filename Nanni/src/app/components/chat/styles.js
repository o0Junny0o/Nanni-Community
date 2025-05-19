import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 110,
    maxHeight: 200,
    padding: 12,
    gap: 10,
    backgroundColor: colors.p3,
  },
  gestureGrabber: {
    height: 4, 
    width: "50%",
    borderRadius: 16,
    alignSelf: 'center',
    marginHorizontal: 15,
    backgroundColor: colors.p6, 
    opacity: 0.5,
  },  
  chatView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingRight: 12,
    borderRadius: 20,
    backgroundColor: colors.p6,
  },
  chatInput: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  chatIcon: {
    verticalAlign: 'top',
    paddingTop: 20,
    paddingLeft: 10,
  },
  anexoView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  anexoText: {
    fontFamily: fonts.roboto,
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.p6,
  },
  anexoImgText: {
    textDecorationLine: 'underline',
  },
});

const VGifGridStyles = StyleSheet.create({
  container: {
    marginBottom: 5,
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 16,
    paddingTop: 20,
    gap: 14,
    backgroundColor: colors.p3,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 5,
    backgroundColor: colors.p6,
  },
  inputText: {
    flex: 1,
  },
  inputIcon: {
    color: colors.p3,
    opacity: 0.56,
  },
  resultView: {
    paddingHorizontal: 10,
    maxHeight: 200,
  },
  resultEmpty: {
    height: 0,
  },
  gifs: {
    height: 150,
    width: 180,
  },
  logoView: {
    width: '100%',
    height: 36,
    alignItems: 'center',
  },
  logoMark: {
    width: '50%',
    height: '100%',
  },
});


const VChatOptionsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 10,
  },
  option: {
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.p6,
  },
})


export { styles, VGifGridStyles, VChatOptionsStyles };
