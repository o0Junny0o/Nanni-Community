import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";
import fonts from "../../../../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.p6,
        padding: 16,
        margin: 10,
        borderRadius: 5,
        borderWidth: 0.25,
        borderColor: colors.border,
        elevation: 4,
    },
    principal: {
        flexDirection: 'row',
        width: '100%',
    },
    titulosView: {
        flex: 1,
    },
    titulo: {
        fontSize: 18,
        fontFamily: fonts.robotoMonoBold,
        fontWeight: 'bold',
    },
    mensagem: {
        fontSize: 14,
        fontFamily: fonts.roboto,
        marginTop: 5,
    },
    tag: {
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        color: colors.p6,
        backgroundColor: colors.p5,
    },
    date: {
        fontSize: 15,
        opacity: 0.7,
        textAlign: 'right',
    },
    iconsView: {
        flexDirection: 'row',
        gap: 10,
    },
    removeIcon: {
        color: colors.aviso,
    },
    editIcon: {
        color: colors.p2,
    },
})


export default styles;