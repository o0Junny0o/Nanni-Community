import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export const useAuthCheck = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate('AuthStack', { screen: 'Login' });
    }
  }, [user, navigation]);
};
