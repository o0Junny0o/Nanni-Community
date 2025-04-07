import React from "react"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

export default function BotaoPadrao(props){
        
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.EditButton} activeOpacity={0.7}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    EditButton:{
        padding: 15,
        alignItems:"center",
        backgroundColor: "#5d90d6",
        width: "70%",
        borderRadius: 15,
        boxShadow: "2 2 3 #00000033",
    },

    text:{
        textAlign: "center",
        fontSize: 15,
        color: "#FFF"
    }
})