import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import GiphyService from "../../../service/giphy/GiphyService";
import styles from "./styles";
import { Timestamp } from "firebase/firestore";



const service = new GiphyService()
const rgx = /\[(.*?)\]/g
const servs = {
    'giphy': undefined,
}
const ks = Object.keys(servs)

export default function VComentario({mensagem, data, username, isFromUser = false}) {
    if(!mensagem || typeof mensagem !== 'string') { 
        console.error(`mensagem inválida em comentário : ${mensagem} é do tipo ${typeof mensagem}`)
        return;
    }

    if(!data || !(data instanceof Timestamp)) {
        console.error(`data inválida em comentário : ${data} é do tipo ${typeof data}`)
        return;
    }

    if(!isFromUser) {
        if(!username || typeof username !== 'string') {
            console.error(`username inválido em comentário : ${username} é do tipo ${typeof username}`)
            return;
        }
    }

    const [parsed, setParsed] = useState([])     
    const [hasGifs, setHasGifs] = useState(false)
    // const [expandido, setExpandido] = useState(false)
    // const [hoverExpandido, setHoverExpandido] = useState(false)

    // Convert:
    useEffect(() => {
        let hGis = false
        const str = mensagem.split(rgx).reduce((obj, e) => {
            const item = { content : e }
            if(ks.some(i => e.includes(i))) {
                item.type = 'gif'
                hGis = true;
            } else {
                item.type = 'text'
            }

            return [...obj, item]
        }, [])

        setParsed(str)
        setHasGifs(hGis)
    }, [mensagem])

    useEffect(() => {
        if(hasGifs) {
            parsed.forEach(async (item, index) => {
                if(item.type === 'gif' && !item.gif) {
                    try {
                        const id = item.content.split(":")[1];
                        const r = await service.getByID({ idGif: id })
                        
                        if(r) {
                            setParsed(prev => {
                                const arr = [...prev]
                                arr[index] = {...item, gif: r[0]}
                                return arr
                            })

                            console.log(parsed[index])
                        } 
                    } catch(err) {
                        alert("Erro ao tentar registrar Gif")
                        console.error(err)
                    }
                }
            })
        }
    }, [hasGifs, parsed])

    return (
        <View style={[styles.view, isFromUser ? styles.viewUser : styles.viewOtherUser]}>
            <View style={[styles.comentarioView, isFromUser ? styles.comentarioViewUser : styles.comentarioViewOtherUser]}>
                {!isFromUser ? (
                    <Text style={styles.author}>{username}</Text>
                ) : null} 
                {parsed.map((item, index) => {
                    if(item.type === 'gif') {
                        const uri = item.gif?.images?.original?.webp

                        return uri ? (
                            <Image 
                                key={index} 
                                source={{ uri }} 
                                style={styles.gifImage}
                                contentFit="contain" />
                        ) : (
                            <Text key={index}>Carregando Gif...</Text>
                        )
                    } 

                    return (
                        <Text key={index} style={styles.text}>{item.content}</Text>
                    )
                })} 
                <Text style={styles.date}>
                    {data.toDate().toLocaleDateString("pt-BR")}
                </Text>
                {/* {!expandido && (
                    <Pressable 
                        onPressIn={() => setHoverExpandido(true)}
                        onPressOut={() => setHoverExpandido(false)}
                        onPress={() => setExpandido(true)} >
                            <Text style={[styles.expandir, expandido && styles.expandirHover]}>
                                Ler Mais
                            </Text>
                    </Pressable>
                )} */}
            </View>
        </View>
    )
}