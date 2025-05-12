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

const forumSeguidosStyles = StyleSheet.create({
    container: {
        width: "100%",
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
        fontFamily: "Roboto Mono",
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 1.25,
    },
    desc: {
        color: colors.p3,
        opacity: 0.8,
        fontFamily: "Roboto",
        fontSize: 14,
        letterSpacing: 1.25,
    }
})

const forumDonoStyles = StyleSheet.create({
    container: {
        width: "100%",
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
        fontFamily: "Roboto Mono",
        fontWeight: "bold",
        fontSize: 20,
        letterSpacing: 1.25,
        textAlignVertical: "center"
    },
    iconEdit: {
        paddingVertical: 5,
        paddingLeft: 10,
    },
    avatar: { 
        width: 60, 
        height: 60, 
        borderRadius: 75, 
        backgroundColor: colors.overlayBackground, 
        borderWidth: .5, 
        borderColor: colors.p2,
    },
    rows: {
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    extra: {
        color: colors.p3,
        fontFamily: "Roboto",
        fontSize: 16,
        letterSpacing: 1.25,
        opacity: .7,
    }
})

export {styles, forumSeguidosStyles, forumDonoStyles}