import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import TagNormalize from '../../../utils/TagNormalize';

export default function ExplorarScreen({ navigation }) {
  const foruns = [
    {
      forumID: '132',
      forumName: 'Teste',
      forumDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel aliquam arcu. Quisque tristique ultricies laoreet. Cras pretium odio vitae nisi venenatis condimentum. Maecenas molestie pellentesque odio eget euismod. Donec dignissim ante urna, eu sodales lorem rhoncus et. ',
    },
    {
      forumID: '564',
      forumName: 'Olá',
      forumDesc: 'Testeste',
      forumTags: ['+18', '+16'],
    },
  ];

  const [textSearch, setTextSearch] = useState();
  const [tagsSearch, setTagsSearch] = useState(['a', 'b']);

  function searchForuns() {}

  function addSearchTag(tag) {
    if (!tag || typeof tag !== 'string') return;

    setTextSearch('');
    const textTag = TagNormalize(tag);
    if (tagsSearch.find((v) => v === textTag)) return;

    setTagsSearch((prev) => [...prev, TagNormalize(tag)]);
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
        <View style={styles.searchTools}>
          <FlatList
            data={tagsSearch}
            style={styles.searchTagList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={(e) => removeSearchTag(item)}
                style={styles.searchTagView}
              >
                <Ionicons name="close" size={16} color={colors.p6} />
                <Text style={styles.searchTagText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <Ionicons name="filter" size={20} color={colors.p3} />
        </View>
      </View>

      <FlatList
        keyExtractor={(item) => item.forumID}
        data={foruns}
        renderItem={({ item }) => explorarItem(item)}
      ></FlatList>
    </SafeAreaView>
  );
}

// TODO: Adicionar Classificação Indicativa
function explorarItem(forum) {
  if (!forum) return;

  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert('Teste')}>
      <View style={explorarItemStyles.container}>
        <View style={explorarItemStyles.rows}>
          <Text style={explorarItemStyles.title}>{forum.forumName}</Text>
        </View>
        <Text style={explorarItemStyles.desc}>{forum.forumDesc}</Text>

        {explorarItem_tags(forum.forumTags)}
      </View>
    </TouchableWithoutFeedback>
  );
}

function explorarItem_tags(tags) {
  if (!tags) return;
  if (!Array.isArray(tags)) tags = Array(tags);

  return (
    <View style={explorarItemStyles.tagView}>
      {tags.map((tag, index) => (
        <Text key={index} style={explorarItemStyles.tagBody}>
          {tag}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  pageTitle: {
    width: '100%',
    marginBottom: 40,
    // Texto:
    fontFamily: 'Roboto Mono',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.p2,
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: colors.p6,
  },
  searchBarText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
    letterSpacing: 1.25,
    color: colors.text,
  },
  searchTools: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  searchTagList: {
    flex: 1,
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },

  searchTagView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    gap: 5,
    backgroundColor: colors.p1,
  },
  searchTagText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: colors.p6,
  },
});

const explorarItemStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.p6,
    padding: 20,
    marginBottom: 20,
    // Shadow:
    elevation: 6,
  },
  rows: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto Mono',
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: colors.text,
  },
  desc: {
    width: '100%',
    minHeight: 20,
    maxHeight: 50,
    marginVertical: 15,
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 1.25,
    color: colors.text,
  },
  tagView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 5,
  },
  tagBody: {
    width: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    // Texto:
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 1.25,
    // Cor:
    color: colors.p6,
    backgroundColor: colors.p5,
  },
});
