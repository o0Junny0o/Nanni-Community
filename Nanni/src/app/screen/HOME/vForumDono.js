import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from "../../../utils/colors";


function vForumDono({ forumID, forumName }) {
    if(!forumName && typeof forumName !== 'string') return;
    if(!forumID) return;

    return (
        <Pressable
            onPress={(e) => Alert.alert(`Olá ${forumID}`)} >
                <View style={forumDonoStyles.container}>
                    <View style={forumDonoStyles.rows}>
                        <Text style={forumDonoStyles.title}>{forumName}</Text>
                        <Pressable
                            style={forumDonoStyles.iconEdit}
                            onPress={(e) => {
                                e.stopPropagation();
                                Alert.alert("TO CONFIG")
                            }} >
                                <Ionicons name="settings" size={24} color={colors.p3} />
                        </Pressable>
                    </View>
                    <View style={forumDonoStyles.rows}>
                        <Text style={forumDonoStyles.extra}>46 seguidores</Text>
                        <Text style={forumDonoStyles.extra}>12/12/2020</Text>
                    </View>
                </View>
        </Pressable>
    )
}


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


export default vForumDono