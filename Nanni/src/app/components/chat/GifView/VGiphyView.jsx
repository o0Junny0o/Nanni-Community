import { useState } from "react";
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { VGifGridStyles } from "../styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from "expo-image";

export default function VGifView(service, selection, show) {
    if(!selection || typeof selection !== 'string') return;
    if(!show || typeof show !== 'boolean') return;


    const [text, setText] = useState('')
    const [gifs, setGifs] = useState([])
    const maxLenght = Math.floor(Dimensions.get('window').width / 12) ;
    

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
        <View style={VGifGridStyles.container}>
            {/* SearchBar */}
            <View style={VGifGridStyles.inputView}>
                <TouchableOpacity
                    onPress={searchGif}>
                        <Ionicons
                            name="search" 
                            size={22}
                            style={VGifGridStyles.inputIcon} />
                </TouchableOpacity>

                <TextInput 
                    style={VGifGridStyles.inputText}
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
                                style={VGifGridStyles.inputIcon} />
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

            {/* <View style={[VGifGridStyles.resultView, {flex: 4, marginHorizontal: 'auto'}]}>
                {gifs && gifs.length > 0 ? (
                    gifs.map((g, i) => )
                ): null}
            </View> */}

            {/* Logo */}
            <View style={VGifGridStyles.logoView}>
                <Text>HELLO WORLD</Text>
            </View>
        </View>
    )
}