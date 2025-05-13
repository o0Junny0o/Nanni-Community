import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 110,
        maxHeight: 200,
        padding: 12,
        gap: 10, 
        backgroundColor: colors.p3,
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
        fontFamily: "Roboto",
        fontSize: 14,
        letterSpacing: 1.25,
        color: colors.p6,
    },
    anexoImgText: {
        textDecorationLine: 'underline',
    },
    optContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 10,
    },
    optView: { 
        padding: 12, 
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: colors.p6, 
    },
})





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
        opacity: .56,
    },
    resultView: {
        paddingHorizontal: 10,
        backgroundColor: colors.p2,
    },
    logoView: {
        alignSelf: 'center',
        backgroundColor: colors.p6
    }
})

export { styles, VGifGridStyles}