import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

export default function BotaoEditar({onPress}){
        
    return(
        <TouchableOpacity onPress={onPress} style={styles.EditButton} activeOpacity={0.7}>
            <Text style={styles.text}>Editar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    EditButton:{
        padding: 15,
        margin: 5,
        alignItems:"flex-end",
        backgroundColor: "#aaa6",
        width: 70,
        borderRadius: 15,
        boxShadow: "2 2 3 #00000033"
    },

    text:{
        textAlign: "center",
        fontSize: 15,
        color: "#071934"
    }
})