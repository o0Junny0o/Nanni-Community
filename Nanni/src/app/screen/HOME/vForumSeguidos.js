import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import colors from "../../../utils/colors";

function vForumSeguidos({forumID, forumName, forumDesc}) {
    if(!forumName && typeof forumName !== 'string') return;
    if(!forumDesc && typeof forumDesc !== 'string') return;
    if(!forumID) return;

    return (
        <TouchableWithoutFeedback
            onPress={() => Alert.alert(`Olá ${forumID}`)} >
                <View style={forumSeguidosStyles.container} >
                    <Text style={forumSeguidosStyles.title}>{forumName}</Text>
                    <Text style={forumSeguidosStyles.desc}>{forumDesc}</Text>
                </View>
        </TouchableWithoutFeedback>
    )
}


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


export default vForumSeguidos