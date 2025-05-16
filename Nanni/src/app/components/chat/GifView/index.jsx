import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { VGifGridStyles } from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import GiphyService from '../../../../service/giphy/GiphyService';
import PropTypes from 'prop-types';


const typeServices = { 
  "giphy": () => new GiphyService(),
  "tenor": () => new GiphyService(),
}


export default function VGifView({ type, selection, toggle }) {
  const service = typeServices[type]?.()
  if(!service) {
    console.error(`${type} está incorreto`)
    return;
  }  
  
  const [text, setText] = useState('');
  const [gifs, setGifs] = useState([]);
  const maxLenght = Math.floor(Dimensions.get('window').width / 12); 

  

  function clearText() {
    setText('');
  }

  async function searchGif() {
    const r = await service.getSearch({ q: text, limit: 12, offset: 0 });
    setGifs(r);
  }

  function getGif(id) {
    selection(id);
    toggle(false);
  }

  return (
    <View style={VGifGridStyles.container}>
      {/* SearchBar */}
      <View style={VGifGridStyles.inputView}>
        <TouchableOpacity onPress={searchGif}>
          <Ionicons name="search" size={22} style={VGifGridStyles.inputIcon} />
        </TouchableOpacity>

        <TextInput
          style={VGifGridStyles.inputText}
          onChangeText={setText}
          placeholder="Gatos de Chapéu"
          onSubmitEditing={searchGif}
          maxLength={maxLenght}
          value={text}
        />

        {text !== '' ? (
          <TouchableOpacity onPress={clearText}>
            <Ionicons name="close" size={22} style={VGifGridStyles.inputIcon} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Resultados */}
      <FlatList
        keyExtractor={(item, index) => index}
        data={gifs}
        numColumns={2}
        style={gifs.length > 0 && { height: 200 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => getGif(item.id)}>
            <Image
              source={item.images.original.webp}
              style={VGifGridStyles.gifs}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      />

      {/* Logo */}
      <View style={VGifGridStyles.logoView}>
        <Image
          source={service.getLogo() ?? ''}
          style={VGifGridStyles.logoMark}
          contentFit="contain"
        />
      </View>
    </View>
  );
}


VGifView.propTypes = {
  type: PropTypes.string.isRequired,
  selection: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
}