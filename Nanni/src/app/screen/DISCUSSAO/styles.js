import { StyleSheet } from "react-native";
import colors from "../../../styles/colors"
import fonts from "../../../styles/fonts";

const paddingHorizontal = 16

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.p6,
    },
    container: {
        flex : 1,
    },
    chatView: {
        paddingHorizontal,
        paddingTop: 25,
        paddingBottom: 20,
        letterSpacing: 1.25,
    },
    chatContainer: {
        gap: 12
    },
    chatTitle: {
        paddingBottom: 15,
        // Texto:
        fontFamily: fonts.robotoMonoBold,
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
        color: colors.p2,
    },
    discView: {
        minHeight: 120,
        paddingHorizontal,
        paddingVertical: 16,
        gap: 10,
        backgroundColor: colors.p1,        
    },
    discTitle: {
        // Texto:
        fontFamily: fonts.monospaceExtrabold,
        fontWeight: 'bold',
        fontSize: 22,
        textTransform: 'uppercase',
    },
    discDescricao: {
        // Texto:
        fontFamily: fonts.roboto,
        fontSize: 18,
        paddingHorizontal: 4,
    },
    discData: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        // Texto:
        fontFamily: fonts.roboto,
        fontSize: 16,
    },
})


export default styles;