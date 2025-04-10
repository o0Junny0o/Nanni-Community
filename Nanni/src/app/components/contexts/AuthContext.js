import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../../../service/firebase/conexao';
import PropTypes from 'prop-types';

// Criação do contexto
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        // eslint-disable-next-line
        console.error('Erro de autenticação:', error);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
