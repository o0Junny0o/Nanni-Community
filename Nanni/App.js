import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConnectionProvider } from './src/app/components/contexts/ConexaoContext';
import { ConnectionMonitor } from './src/hooks/MonitorConexao';
import {
  AuthProvider,
  AuthContext,
} from './src/app/components/contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/app/components/toasts/ToastConfig';

// Importa as telas
import Login from './src/app/screen/LOGIN_SCREEN/index';
import Cadastro from './src/app/screen/CADASTRO_SCREEN/index';
import Home from './src/app/screen/HOME_SCREEN/index';
import CARREGAMENTO_SCREEN from './src/app/screen/CARREGAMENTO_SCREEN/index';
import RecuperarSenha from './src/app/screen/RECUPERAR_SENHA_SCREEN/index';

// Criação dos Stacks
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export default function App() {
  return (
    <ConnectionProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </AuthProvider>
      <ConnectionMonitor />
    </ConnectionProvider>
  );
}

// Stack para telas de autenticação (Login, Cadastro e recuperação de senha)
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Cadastro" component={Cadastro} />
      <AuthStack.Screen name="RecuperarSenha" component={RecuperarSenha} />
    </AuthStack.Navigator>
  );
}

// Stack as telas principais
function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <CARREGAMENTO_SCREEN />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainStack" component={MainNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
