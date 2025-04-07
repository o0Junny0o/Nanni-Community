import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

export default function BotaoVoltar({onPress}){
        
    return(
        <TouchableOpacity onPress={onPress} style={styles.backButton}>
            <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton:{
        padding: 15,
        marginBottom: 15,
        alignItems:"flex-end"
    },

    text:{
        textAlign: "center",
        fontSize: 15,
        color: "#071934"
    }
})