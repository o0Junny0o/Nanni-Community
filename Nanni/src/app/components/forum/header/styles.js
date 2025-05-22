import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";

const styles = StyleSheet.create({
    loadingOverlay: {
        opacity: 0.4,
    },
    header: {
        backgroundColor: colors.p2,
        gap: 15,
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    forumAvatar: {
        width: 40,
        height: 40,
        borderRadius: 75,
        borderWidth: 3,
        marginTop: 2,
        backgroundColor: colors.p2,
        borderColor: colors.p1,
    },
    forumPrincipal: {
        alignItems: 'top',
        flexDirection: 'row',
        gap: 15,
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
        backgroundColor: colors.p3,
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
        fontFamily: fonts.monospaceExtrabold,
        fontSize: 14,
        color: colors.p6,
    },
    forumDesc: {
        fontFamily: fonts.roboto,
        fontSize: 16,
        color: colors.p6,
    },
})

export default styles