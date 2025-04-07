import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export const useAuthCheck = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      });
    }
  }, [user, navigation]);
};
