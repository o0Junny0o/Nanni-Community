import { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import typeServices from '../../../../utils/typeServices';
import IAPIServices from '../../../../service/IAPIServices';



export default function VGifView({ type, selection, toggle }) {
  // [Classe Service]  
  const [typeState, setTypeState] = useState(type)
  const service = typeServices[typeState]?.()

  if(!(service instanceof IAPIServices)) {
    console.error(`${type} está incorreto :: ${typeof type}`)
    return (<></>);
  }  


  // [Propriedades da View]
  const [text, setText] = useState('');
  const [gifs, setGifs] = useState([]);
  const maxLenght = Math.floor(Dimensions.get('window').width / 12); 

  // [Funções da View]
  function clearText() {
    setText('');
  }

  useEffect(() => {
    clearText()
    setGifs([])
    setTypeState(type)
  }, [type])

  async function searchGif() {
    const res = await service.search({ q: text, limit: 5 });
    setGifs(service.openResp(res));
  }

  function getGif(id) {
    selection(id);
    toggle(false);
  }


  // [Estrutura da View]
  return (
    <View style={VGifGridStyles.container}>
      {/* SearchBar */}
      <View style={VGifGridStyles.inputView}>
        {/* Botão de Procurar */}
        <TouchableOpacity onPress={searchGif}>
          <Ionicons name="search" size={22} style={VGifGridStyles.inputIcon} />
        </TouchableOpacity>

        {/* Input de Texto */}
        <TextInput
          style={VGifGridStyles.inputText}
          onChangeText={setText}
          placeholder={service.getSearchPlaceholder() ?? '...'}
          onSubmitEditing={searchGif}
          maxLength={maxLenght}
          value={text}
        />

        {/* Botão para apagar texto */}
        {text !== '' && (
          <TouchableOpacity onPress={clearText}>
            <Ionicons name="close" size={22} style={VGifGridStyles.inputIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Resultados */}
      {gifs.length > 0 && typeState === type && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={gifs}
            numColumns={2}
            style={gifs.length > 0 && VGifGridStyles.resultView}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => getGif(item.id)}>
                <Image
                  source={service.toSource(item) ?? ''}
                  style={VGifGridStyles.gifs}
                  contentFit="contain"
                />
              </TouchableOpacity>
            )}
          />
        )
      }

      {/* Logo */}
      <View style={VGifGridStyles.logoView}>
        <Image
          source={service.getLogo()}
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