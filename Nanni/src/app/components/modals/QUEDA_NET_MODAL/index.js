import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { styles } from './style';
import PropTypes from 'prop-types';

// Componente reutilizável para o Modal de Conexão
const ConnectionLostModal = ({ isVisible, onRequestClose }) => {
  const [countdown, setCountdown] = useState(0);

  // Efeito para limpar o countdown quando o modal é fechado
  useEffect(() => {
    if (!isVisible) {
      setCountdown(0);
    }
  }, [isVisible]);

  // Timer mais preciso com cleanup
  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown]);

  const handleReconnect = () => {
    if (countdown === 0) {
      setCountdown(10);
      onRequestClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onRequestClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar modal de erro de conexão"
      >
        {Platform.OS === 'android' && <View style={styles.statusBarOverlay} />}

        {/* Conteúdo principal do modal */}
        <View style={styles.modalContent}>
          <Image
            source={require('../../../../assets/NoWifi.png')}
            style={styles.icon}
            accessibilityRole="image"
            accessibilityLabel="Ícone de conexão perdida"
            importantForAccessibility="yes"
          />

          <Text style={styles.title}>Sem conexão com a internet! ⚠️</Text>

          <Text style={styles.message}>
            Verifique sua conexão com a internet e tente novamente.
          </Text>

          <TouchableOpacity
            style={[styles.button, countdown > 0 && styles.disabledButton]}
            onPress={handleReconnect}
            disabled={countdown > 0}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={
              countdown > 0
                ? `Nova tentativa disponível em ${countdown} segundos`
                : 'Tentar reconexão'
            }
          >
            <Text style={styles.buttonText}>
              {countdown > 0
                ? `Nova tentativa em ${countdown}s`
                : 'TENTAR RECONECTAR'}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

ConnectionLostModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ConnectionLostModal;
