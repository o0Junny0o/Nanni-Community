import React, { useContext, useEffect } from 'react';
import { NavigationContainer, useLinkBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConnectionProvider } from './src/app/components/contexts/ConexaoContext';
import { ConnectionMonitor } from './src/hooks/MonitorConexao';
import {
  AuthProvider,
  AuthContext,
} from './src/app/components/contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/app/components/toasts/ToastConfig';
import { requestNotificationPermissions } from './src/utils/Notifications';

// Importa as telas
import Login from './src/app/screen/LOGIN_SCREEN/index';
import Cadastro from './src/app/screen/CADASTRO_SCREEN/index';
import CARREGAMENTO_SCREEN from './src/app/screen/CARREGAMENTO_SCREEN/index';
import RecuperarSenha from './src/app/screen/RECUPERAR_SENHA_SCREEN/index';
import PerfilUsuario from './src/app/screen/PERFIL_SCREEN/index';
import Forum from './src/app/screen/FORUM_SCREEN/index';
import TopicoScreen from './src/app/screen/TOPICOS_SCREEN/index';
import HomeScreen from './src/app/screen/HOME/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar a Tabbar
import customTabBarStyle from './src/app/components/TabBarStyle';
import ExplorarScreen from './src/app/screen/EXPLORAR';
import ConfigurarForumScreen from './src/app/screen/CRIAR_FORUM';

// Criação dos Stacks
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const TabStack = createBottomTabNavigator();

export default function App() {
  // Solicita permissões ao iniciar o app
  useEffect(() => {
    requestNotificationPermissions();
  }, []);
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



function TabNavigator() {
  return (
    <TabStack.Navigator screenOptions={customTabBarStyle}>
      <TabStack.Screen name="Home" component={HomeScreen} />
      <TabStack.Screen name="Explorar" component={ExplorarScreen} />
    </TabStack.Navigator>
  )
}

// Stack as telas principais
function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Tabs" component={TabNavigator} />
      <MainStack.Screen name="ConfigurarForum" component={ConfigurarForumScreen} />
    </MainStack.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <CARREGAMENTO_SCREEN />;
  }

  const isEmailVerified = user?.emailVerified;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user && isEmailVerified ? (
        <Stack.Screen name="MainStack" component={MainNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
