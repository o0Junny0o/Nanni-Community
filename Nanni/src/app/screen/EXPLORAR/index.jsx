import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import TagNormalize from '../../../utils/TagNormalize';
import forumList from '../../../hooks/forum/forumList';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import Forum from '../../../model/Forum';
import PropTypes from 'prop-types';
import VExplorarItem from '../../components/explorar/item';

export default function ExplorarScreen({ navigation }) {
  const [foruns, setForuns] = useState([]);

  const [textSearch, setTextSearch] = useState('');
  const [tagsSearch, setTagsSearch] = useState([]);

  // Botão de Filtro de Tags
  const [preTags, setPreTags] = useState(['teste']);
  const cIndicativaTags = [...Forum.classificacaoIndicativa];
  const refPickerFiltro = useRef();

  function openPickerFiltro() {
    refPickerFiltro?.current.focus();
  }

  useEffect(() => {
    async function run() {
      if (tagsSearch.length < 1) {
        setForuns(await forumList({ qLimit: 10, qOrderBy: true }));
      } else {
        const [indicativa, comum] = tagsSearch.reduce(
          ([p, f], e) =>
            cIndicativaTags.includes(e) ? [[...p, e], f] : [p, [...f, e]],
          [[], []],
        );

        if (foruns.length > 0) {
          const arr = [...new Set(foruns.flatMap((fr) => fr.tagsDisponiveis))];
          setPreTags(arr);
        }
      }
    }

    run();
  }, [tagsSearch]);

  function addSearchTag(tag) {
    if (!tag || typeof tag !== 'string') return;

    setTextSearch('');

    if (cIndicativaTags.includes(tag)) {
      if (!tagsSearch.includes(tag)) {
        setTagsSearch((prev) => [...prev, tag]);
      }
    } else {
      const textTag = TagNormalize(tag);
      if (tagsSearch.find((v) => v === textTag)) return;

      setTagsSearch((prev) => [...prev, TagNormalize(tag)]);
    }
  }

  function removeSearchTag(item) {
    if (tagsSearch.length > 1) {
      const nTags = tagsSearch.filter((i) => i !== item);
      setTagsSearch(nTags);
    } else {
      setTagsSearch([]);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.pageTitle}>Explorar Fóruns</Text>
      <View>
        {/* SearchBar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarText}
            placeholder="Tag"
            onChangeText={setTextSearch}
            onSubmitEditing={addSearchTag}
            value={textSearch}
          />
          <TouchableWithoutFeedback onPress={(e) => addSearchTag(textSearch)}>
            <Ionicons name="add" size={24} color={colors.p3} />
          </TouchableWithoutFeedback>
        </View>

        {/* Tags */}
        <View>
          <View style={styles.searchTools}>
            <FlatList
              data={tagsSearch}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={(e) => removeSearchTag(item)}
                  style={[
                    styles.searchTagView,
                    cIndicativaTags.includes(item)
                      ? styles.searchTagViewEssential
                      : null,
                  ]}
                >
                  <Ionicons name="close" size={14} color={colors.p6} />
                  <Text style={styles.searchTagText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Pressable
              onPress={() => {
                openPickerFiltro();
              }}
            >
              <Ionicons name="filter" size={20} color={colors.p3} />
            </Pressable>
          </View>
          <Picker
            ref={refPickerFiltro}
            enabled={Array.isArray(preTags) && preTags.length > 0}
            style={styles.searchFilterPicker}
            mode={'dropdown'}
            onValueChange={(item) => addSearchTag(item)}
          >
            {cIndicativaTags.map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
                style={styles.filterCIndicativa}
              />
            ))}
            {preTags.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Lista de Foruns */}
      <FlatList
        keyExtractor={(item) => item.forumID}
        data={foruns}
        renderItem={({ item }) => (
          <VExplorarItem forum={item} navigation={navigation} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listVazia}>...Lista Vázia...</Text>
        )}
      />
    </SafeAreaView>
  );
}

ExplorarScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
