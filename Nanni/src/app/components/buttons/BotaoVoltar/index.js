import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function BotaoVoltar({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Text style={styles.text}>Voltar</Text>
    </TouchableOpacity>
  );
}

BotaoVoltar.propTypes = {
  onPress: PropTypes.func.isRequired,
};
