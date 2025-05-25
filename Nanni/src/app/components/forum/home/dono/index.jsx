import PropTypes from 'prop-types';
import { Pressable, Text, View } from 'react-native';
import { forumDonoStyles } from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function VForumDono({ forumName, data, onConfigForum }) {
  return (
    <View style={forumDonoStyles.container}>
      <View style={forumDonoStyles.rows}>
        <Text style={forumDonoStyles.title}>{forumName}</Text>
        <Pressable
          style={forumDonoStyles.iconConfigView}
          onPress={onConfigForum}
        >
          <Ionicons
            name="settings"
            size={24}
            style={forumDonoStyles.iconConfig}
          />
        </Pressable>
      </View>
      <View style={[forumDonoStyles.rows, forumDonoStyles.rowsOptions]}>
        {data && (
          <Text style={forumDonoStyles.extra}>
            {data.toDate().toLocaleDateString('pt-BR')}
          </Text>
        )}
      </View>
    </View>
  );
}

VForumDono.propTypes = {
  forumName: PropTypes.string.isRequired,
  onConfigForum: PropTypes.func.isRequired,
};
