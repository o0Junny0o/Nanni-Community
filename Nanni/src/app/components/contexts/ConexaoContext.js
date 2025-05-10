import React, { createContext, useState, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const ConnectionContext = createContext({
  isConnected: true,
  retry: () => {},
});

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  const retry = debounce(async () => {
    const { isConnected: status } = await NetInfo.fetch();
    setIsConnected(status);
  }, 1000); // Espera 1 segundo entre chamadas

  return (
    <ConnectionContext.Provider value={{ isConnected, setIsConnected, retry }}>
      {children}
    </ConnectionContext.Provider>
  );
};

ConnectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
