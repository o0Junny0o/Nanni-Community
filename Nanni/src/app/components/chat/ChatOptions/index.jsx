import { Image, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { VChatOptionsStyles } from '../styles';
import colors from '../../../../styles/colors';

export default function VChatOptions({ opcoes }) {
  return (
    <View style={VChatOptionsStyles.container}>
      {opcoes.map((item, index) => {
        if (item.onPress) {
          return (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={VChatOptionsStyles.option}
            >
              {item.icone ? (
                <Ionicons name={item.icone} size={24} color={colors.p3} />
              ) : (
                <Image
                  source={item.image}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          );
        }

        return;
      })}
    </View>
  );
}

VChatOptions.propTypes = {
  opcoes: PropTypes.arrayOf(
    PropTypes.shape({
      icone: PropTypes.string,
      onPress: PropTypes.func.isRequired,
      extras: PropTypes.object,
    }),
  ).isRequired,
};
