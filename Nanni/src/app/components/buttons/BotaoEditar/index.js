import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function BotaoEditar({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.EditButton}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>Editar</Text>
    </TouchableOpacity>
  );
}

BotaoEditar.propTypes = {
  onPress: PropTypes.func.isRequired,
};
