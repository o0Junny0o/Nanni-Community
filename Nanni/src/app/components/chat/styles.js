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


export default styles