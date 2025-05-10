import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useConnection } from '../app/components/contexts/ConexaoContext';

import ConnectionLostModal from '../app/components/modals/QUEDA_NET_MODAL/index';

export const ConnectionMonitor = () => {
  const { isConnected, setIsConnected, retry } = useConnection();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, [setIsConnected]);

  return (
    <ConnectionLostModal isVisible={!isConnected} onRequestClose={retry} />
  );
};
