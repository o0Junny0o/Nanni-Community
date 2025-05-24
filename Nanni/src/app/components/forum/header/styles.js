import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";


const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: colors.p3,
    },
    loadingOverlay: {
        opacity: 0.4,
    },
    header: {
        backgroundColor: colors.p3,
        gap: 15,
        paddingTop: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 3,
        borderColor: colors.p5,
    },
    forumPrincipal: {
        alignItems: 'top',
        flexDirection: 'row',
        gap: 15,
    },
    forumPrincipalSubView: {
        flexDirection: 'row',
        width: '100%',
    },
    forumPrincipalTitulos: {
        flex: 1,
    },
    forumAutorView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    doarView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 10,
        //
        backgroundColor: colors.p5,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 75,
    },
    doarBtn: {
        color: colors.p6,
    },
    doarBtnText: {
        fontSize: 14,
        fontFamily: fonts.roboto,
        fontWeight: 'bold',
    },
    configIcon: {
        color: colors.p3,
    },
    deleteIcon: {
        color: colors.aviso,
    },
    removeIcon: {
        color: colors.aviso
    },
    devOptions: {
        alignSelf: 'flex-start',
        gap: 15,
        paddingHorizontal: 7,
        paddingVertical: 12,
        borderRadius: 15,
        backgroundColor: colors.p6,
    },
    forumDoar: {
        backgroundColor: colors.p1,
        alignSelf: 'flex-start',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 75,
    },
    forumSeguir: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 75,
        backgroundColor: colors.p6,
    },
    forumSeguido: {
        backgroundColor: colors.aviso,
    },
    forumSeguirItem: {
        fontWeight: 'bold',
    },
    forumSeguidoItem: {
        color: colors.p6,
    },
    forumDescView: {
        position: 'absolute',
        width: '100%',
        gap: 20,
        paddingHorizontal: 5,
    },
    forumTitle: {
        marginBottom: 2,
        fontFamily: fonts.monospaceExtrabold,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1.25,
        color: colors.p6,
    },
    forumAutor: {
        fontFamily: fonts.monospaceExtrabold,
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1.25,
        color: colors.p5,
    },
    forumExpansor: {
        marginTop: 30,
        fontFamily: fonts.monospaceExtrabold,
        fontSize: 14,
        opacity: 0.75,
        color: colors.p6,
    },
    forumExpansorFechar: {
        marginTop: 0,
        textDecorationLine: 'underline', 
    },
    forumExpansorFecharInactive: {
        opacity: 0,
    },
    forumDesc: {
        textAlign: 'justify',
        fontFamily: fonts.roboto,
        fontSize: 16,
        color: colors.p6,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
})

export default styles