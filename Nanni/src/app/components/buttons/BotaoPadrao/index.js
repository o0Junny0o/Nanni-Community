import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function BotaoPadrao(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.EditButton}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

BotaoPadrao.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
