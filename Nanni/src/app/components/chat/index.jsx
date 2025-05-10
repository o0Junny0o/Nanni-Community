import { Dimensions, LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import colors from "../../../utils/colors";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DChat() {
    const [text, setText] = useState('')
    const [showOpts, setShowOpts] = useState(false)
    const anexos = ["teste"]

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    return(
        <View>
            <SGiphyView />
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={() => setShowOpts(!showOpts)}
                    style={{ backgroundColor: 'white', height: 10}}
                />
                <View style={styles.chatView}>
                    <TextInput 
                        onChangeText={setText}
                        value={text}
                        multiline={true}
                        placeholder={"..."}
                        placeholderTextColor={colors.p5label}
                        
                        style={styles.chatInput} />

                    <Ionicons
                        name="send"
                        size={26}
                        style={styles.chatIcon}
                        color={colors.p3} />
                </View>
                {anexos && anexos.length > 0 ? (
                    <View style={styles.anexoView }>
                        <Text style={styles.anexoText}>Anexados: </Text>
                        {anexos.map(item => <Text key={item} style={[styles.anexoText, styles.anexoImgText]}>{item}</Text>)}
                    </View>
                ): null}
                {showOpts ? (
                    <View style={styles.optContainer}>
                        <TouchableOpacity
                            style={styles.optView}>
                                <Ionicons name="image" size={24} color={colors.p3} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optView}>
                                <Ionicons name="attach" size={24} color={colors.p3} />
                        </TouchableOpacity>
                    </View>
                ): null}
                
            </View>
        </View>
    )
}



function SGiphyView() {
    const [text, setText] = useState('')
    const maxLenght = Math.floor(Dimensions.get('window').width / 12) ;

    function clearText() {
        setText('')
    }

    return (
        <View style={sGiphyStyles.container}>
            {/* SearchBar */}
            <View style={sGiphyStyles.inputView}>
                <TextInput 
                    style={sGiphyStyles.inputText}
                    onChangeText={setText}
                    placeholder="Gatos de Chapéu"
                    maxLength={maxLenght}
                    value={text} />
                {text !== '' ? (
                    <TouchableOpacity
                        onPress={() => clearText()}>
                            <Ionicons
                                name="close" 
                                size={22}
                                style={sGiphyStyles.inputIcon} />
                    </TouchableOpacity>
                ) : null}
            </View>
            
            {/* Resultados */}
            <View style={sGiphyStyles.resultView}>
                <Text>AAAAAAAAAAA</Text>
            </View>

            {/* Logo */}
            <View style={sGiphyStyles.logoView}>
                <Text>HELLO WORLD</Text>
            </View>
        </View>
    )
}


const sGiphyStyles = StyleSheet.create({
    container: { 
        marginBottom: 5, 
        borderRadius: 8, 
        marginHorizontal: 5,
        padding: 16,
        paddingTop: 20,
        gap: 14,
        backgroundColor: colors.p3, 
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        backgroundColor: colors.p6,
    },
    inputText: {
        flex: 1,
    },
    inputIcon: {
        color: colors.p3,
        opacity: .56,
    },
    resultView: {
        paddingHorizontal: 10,
        backgroundColor: colors.p2,
    },
    logoView: {
        alignSelf: 'center',
        backgroundColor: colors.p6
    }
})