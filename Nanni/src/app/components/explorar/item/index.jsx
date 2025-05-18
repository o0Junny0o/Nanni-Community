import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { deconvertBase64ToImage } from "../../../../utils/Base64Image";
import styles from "./styles";
import PropTypes from "prop-types";
import Forum from "../../../../model/Forum";

export default function VExplorarItem({forum, navigation}) {
  if(!forum.forumID) return;
  
  return (
    <TouchableWithoutFeedback onPress={() => navigation.push('Forum', { 
      forumID: forum.forumID,
      forumPath: forum.getForumPath()
     })}>
      <View style={styles.container}>
        <View style={styles.rows}>
          <Image
            source={deconvertBase64ToImage(forum.avatar) ?? ''}
            style={styles.avatar}
          />
          <Text style={styles.title}>{forum.forumName}</Text>
        </View>
        <Text style={styles.desc}>{forum.forumDesc}</Text>

        {explorarItem_tags(
          forum.tagsDisponiveis,
          forum.classificacaoIndicativa,
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

function explorarItem_tags(tags, indicativa) {
  if (!Array.isArray(tags)) tags = Array(tags);

  return (
    <View style={[styles.tagView]}>
      <Text
        style={[styles.tagBody, styles.tagBodyIndicativa]}
      >
        {indicativa}
      </Text>
      {tags.map((tag, index) => (
        <Text key={index} style={styles.tagBody}>
          {tag}
        </Text>
      ))}
    </View>
  );
}


VExplorarItem.propTypes = {
    forum: PropTypes.instanceOf(Forum).isRequired,
    navigation: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
}

explorarItem_tags.propTypes = {
    tag: PropTypes.array.isRequired,
    indicativa: PropTypes.string.isRequired,
}