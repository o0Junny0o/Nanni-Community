import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontFamily: "Roboto Mono",
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.p3
    },
    pageTitle: {
        width: "100%",
        marginBottom: 40,
        // Texto:
        fontFamily: "Roboto Mono",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1.25,
        textTransform: "uppercase",
        color: colors.p2,
        // underline:
        borderBottomWidth: 2,
        borderBottomColor: colors.p2,
        paddingBottom: 5,
    },
    section: {
        height: "auto",
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
        color: colors.p6
    }
})


export default styles