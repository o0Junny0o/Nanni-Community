import React, { createContext, useState, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

const ConnectionContext = createContext({
  isConnected: true,
  retry: () => {},
});

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  const retry = async () => {
    const { isConnected: status } = await NetInfo.fetch();
    setIsConnected(status);
  };

  return (
    <ConnectionContext.Provider value={{ isConnected, retry, setIsConnected }}>
      {children}
    </ConnectionContext.Provider>
  );
};

ConnectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
