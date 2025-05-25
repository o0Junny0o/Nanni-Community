import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { forumSeguidosStyles } from '../styles';

export default function VForumSeguido({ forumID, forumName, forumDesc, path }) {
  if (!forumName && typeof forumName !== 'string') return;
  if (!forumDesc && typeof forumDesc !== 'string') return;
  if (typeof path !== 'string') return;
  if (!forumID) return;

  return (
    <View style={forumSeguidosStyles.container}>
      <Text style={forumSeguidosStyles.title}>{forumName}</Text>
      <Text style={forumSeguidosStyles.desc}>{forumDesc}</Text>
    </View>
  );
}

VForumSeguido.propTypes = {
  forumID: PropTypes.string.isRequired,
  forumName: PropTypes.string.isRequired,
  forumDesc: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
