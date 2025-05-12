import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import styles from "./styles";
import { useEffect, useState } from "react";
import colors from "../../../utils/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import Comentario from "../../../model/Comentario";
import GiphyService from "../../../service/giphy/GiphyService";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { func } from "prop-types";


export default function DChat({ discussaoPath, useRef }) {
    if(!discussaoPath || !useRef) return;

    const [loading, setLoading] = useState(false)
    
    const [text, setText] = useState('')
    const [anexos, setAnexos] = useState([])
    const [gif, setGif] = useState('')

    const [showOpts, setShowOpts] = useState(false)
    const [showGiphy, setShowGiphy] = useState(false)

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)


    

    useEffect(() => {
        setText(prev => prev + `[giphy:${gif}]`)
    }, [gif])

    async function anexoPicker() {
        try {
            let anexo = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })

            if(!anexo.canceled) {
                const k = anexo.assets[0].fileName
                const v = anexo.assets[0].uri

                setAnexos([{
                    name: k,
                    uri: v
                }])
            }
        } catch(err) {
            alert("Erro ao tentar anexar imagem")
            console.error(err)
        }
    }


    async function enviarMensagem() {
        if(text.length < 2) return;

        try {
            setLoading(true)
            
            const comentario = new Comentario({
                mensagem: text,
                userRef: useRef,
                anexo: anexos,
                discussaoPath: discussaoPath,
            })

            const resp = await comentario.create()
            if(resp) {
                setText('')
            } else {
                console.error("Erro ao enviar mensagem")
            }
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return interpretComentario("teste: [giphy:fxKXUUfX0PINvdxWaJ] abd")
    //     <View>
            
    //         {showGiphy ? <SGiphyView selection={setGif} show={setShowGiphy} /> : null}
    //         <View style={styles.container}>
    //             <TouchableOpacity 
    //                 onPress={() => setShowOpts(!showOpts)}
    //                 style={{ backgroundColor: 'white', height: 5, marginHorizontal: 20}}
    //             />
    //             <View style={styles.chatView}>
    //                 <TextInput 
    //                     onChangeText={setText}
    //                     value={text}
    //                     multiline={true}
    //                     placeholder={"..."}
    //                     placeholderTextColor={colors.p5label}
                        
    //                     style={styles.chatInput} />
                    
    //                 <Ionicons
    //                     name="send"
    //                     size={26}
    //                     style={styles.chatIcon}
    //                     onPress={enviarMensagem}
    //                     color={colors.p3} />
    //             </View>
    //             {anexos && anexos.length > 0 ? (
    //                 <View style={styles.anexoView}>
    //                     <Text style={styles.anexoText}>Anexados: </Text>
    //                     {anexos.map((v, i) => <Text key={i} style={[styles.anexoText, styles.anexoImgText]}>{v.name}</Text>)}
    //                 </View>
    //             ): null}
    //             {showOpts ? (
    //                 <View style={styles.optContainer}>
    //                     <TouchableOpacity
    //                         onPress={() => setShowGiphy(!showGiphy)}
    //                         style={styles.optView}>
    //                             <Ionicons name="image" size={24} color={colors.p3} />
    //                     </TouchableOpacity>
    //                     <TouchableOpacity
    //                         onPress={anexoPicker}
    //                         style={styles.optView}>
    //                             <Ionicons name="attach" size={24} color={colors.p3} />
    //                     </TouchableOpacity>
    //                 </View>
    //             ): null}
                
    //         </View>
    //     </View>
    // )
}

const rgx = /\[giphy:(.*?)\]/g
const idSize = 18

function interpretComentario(comentario) {
    if(typeof comentario !== 'string') return;

    
    const service = new GiphyService()

    useEffect(() => {
        async function run() {
            const str = [...comentario.split(rgx)]

            for(s of str) {
                console.log(s)
            }
        }

        run()
    }, [comentario])

    async function VComentario(key, source) {
        if(source.length == idSize) {
            const r = await service.getByID({ idGif: source })
            
            if(r) {
                setGifs(prev => [...prev, r])
                const i = gifs.lastIndexOf()
                return (<Image source={gifs[i].images.original.webp} style={{ height: 100, width: 100 }} />)
            }
        }

        console.log(source)
        return (<Text key={key}>{source}</Text>)
    }

    return str ?
        (
            <View style={{ flex: 1, backgroundColor: 'red'}}>
                {str.length > 1 ? (
                    <Text>{str[0]}</Text>
                ) : (
                    <FlatList   
                        keyExtractor={(item, index) => index.toString()}
                        data={str}
                        
                        renderItem={({item, index}) =>  <VComentario source={item} key={index} />}/>
                )}
            </View>
        ) : null
}


function SGiphyView({selection, show}) {
    const [text, setText] = useState('')
    const [gifs, setGifs] = useState([])
    const maxLenght = Math.floor(Dimensions.get('window').width / 12) ;
    const service = new GiphyService()

    function clearText() {
        setText('')
    }

    async function searchGif() {
        const r = await service.getSearch({ q: text, limit: 1, offset: 0 })
        setGifs(r)
    }

    function getGif(id) {
        selection(id)
        show(false)
    }

    return (
        <View style={sGiphyStyles.container}>
            {/* SearchBar */}
            <View style={sGiphyStyles.inputView}>
                <TouchableOpacity
                    onPress={searchGif}>
                        <Ionicons
                            name="search" 
                            size={22}
                            style={sGiphyStyles.inputIcon} />
                </TouchableOpacity>

                <TextInput 
                    style={sGiphyStyles.inputText}
                    onChangeText={setText}
                    placeholder="Gatos de Chapéu"
                    onSubmitEditing={searchGif}
                    maxLength={maxLenght}
                    value={text} />

                {text !== '' ? (
                    <TouchableOpacity
                        onPress={clearText}>
                            <Ionicons
                                name="close" 
                                size={22}
                                style={sGiphyStyles.inputIcon} />
                    </TouchableOpacity>
                ) : null}
            </View>
            
            {/* Resultados */}
            <FlatList
                keyExtractor={(item, index) => index}
                data={gifs}
                numColumns={3}
                style={{ backgroundColor: 'red'}}
                
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        onPress={() => getGif(item.id)}>
                            <Image 
                                source={item.images.original.webp} 
                                style={{ height: 100, width: 100, backgroundColor: colors.p3 }} 
                            />
                    </TouchableOpacity>                    
            )} />

            {/* <View style={[sGiphyStyles.resultView, {flex: 4, marginHorizontal: 'auto'}]}>
                {gifs && gifs.length > 0 ? (
                    gifs.map((g, i) => )
                ): null}
            </View> */}

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
        gap: 5,
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