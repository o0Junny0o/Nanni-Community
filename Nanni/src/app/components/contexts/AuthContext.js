import React, { createContext, useEffect, useState, useContext } from 'react';
import { db, auth } from '../../../service/firebase/conexao';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import { USUARIOS_COLLECTION } from '../../../model/refsCollection';

// Criação do contexto
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDoc = await getDoc(
            doc(db, USUARIOS_COLLECTION, authUser.uid),
          );
          setUser((prev) => ({
            ...prev,
            ...authUser,
            cargo: userDoc.data().cargo,
          }));
        } catch (e) {
          console.error('Erro ao buscar dados do usuário:', e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

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
