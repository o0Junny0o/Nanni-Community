import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import GiphyService from "../../../../service/giphy/GiphyService";


const service = new GiphyService()
const rgx = /\[(.*?)\]/g
const servs = {
    'giphy': undefined,
}
const ks = Object.keys(servs)

export default function VComentario({texto}) {
    if(!texto || typeof texto !== 'string') { 
        console.error(`Texto inválido em comentário : ${texto} é do tipo ${typeof texto}`)
        return;
    }
    const [parsed, setParsed] = useState([])            

    // Convert:
    useEffect(() => {
        let hasGifs = false;

        const str = texto.split(rgx).reduce((obj, e) => {
            const item = { content : e }
            if(ks.some(i => e.includes(i))) {
                item.type = 'gif'
                hasGifs = true
            } else {
                item.type = 'text'
            }

            return [...obj, item]
        }, [])

        setParsed(str)
        
        if(hasGifs) {
            parsed.forEach(async (item, index) => {
                if(item.type === 'gif') {
                    try {
                        const id = item.content.split(":")[1];
                        const r = await service.getByID({ idGif: id })
                        
                        if(r) {
                            setParsed(prev => {
                                const arr = [...prev]
                                arr[index] = {...item, gif: r[0]}
                                return arr
                            })
                        } 
                    } catch(err) {
                        alert("Erro ao tentar registrar Gif")
                        console.error(err)
                    }
                }
            })
        }
    }, [texto])

    return (
        <View style={{ height: 100, width: 100}}>
            {parsed.map((item, index) => {
                if(item.type === 'gif') {
                    const uri = item.gif?.images?.original?.webp

                    
                    return uri ? (
                        <Image 
                            key={index} 
                            source={{ uri }} 
                            style={{ width: 100, height: 100}} />
                    ) : (
                        <Text key={index}>Carregando Gif...</Text>
                    )
                } 

                return (
                    <Text key={index}>{item.content}</Text>
                )
            })} 
        </View>
    )
}