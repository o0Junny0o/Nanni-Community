import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Button, Pressable } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useConnection } from '../app/components/contexts/ConexaoContext';

export const ConnectionMonitor = () => {
  const { isConnected, setIsConnected, retry } = useConnection();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Modal
      visible={!isConnected}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <Pressable style={styles.modalOverlay} onPress={() => {}}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Sem conexão com a internet</Text>
          <Text style={styles.message}>
            Verifique sua conexão e tente novamente
          </Text>
          <Button title="Tentar reconectar" onPress={retry} />
        </View>
      </Pressable>
    </Modal>
  );
};

const colors = {
  background_modalContent: 'white',
  background_modalContainer: 'rgba(0,0,0,0.5)',
  preto: '#000',
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background_modalContainer,
  },
  modalContainer: {
    backgroundColor: colors.background_modalContent,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
