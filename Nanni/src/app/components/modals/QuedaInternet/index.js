import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Componente reutilizável para o Modal de Conexão
const ConnectionLostModal = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Image source={require('./assets/NoWifi.png')} style={styles.icon} />
          <Text style={styles.modalTitle}>Atenção!</Text>
          <Text style={styles.modalText}>
            Você perdeu a conexão com a internet. Verifique sua conexão.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>TENTE RECONECTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QuedaInternet;
