import React, { useContext, useEffect, createRef } from 'react';
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
import { requestNotificationPermissions } from './src/utils/Notifications';
import { Feather } from '@expo/vector-icons';
// import { bulkFromJSON } from './src/scripts/jogos';
//import { converterDataISOparaTimestamp } from './src/scripts/conversão';

// Importa as telas
import Login from './src/app/screen/LOGIN_SCREEN/index';
import Cadastro from './src/app/screen/CADASTRO_SCREEN/index';
import CARREGAMENTO_SCREEN from './src/app/screen/CARREGAMENTO_SCREEN/index';
import RecuperarSenha from './src/app/screen/RECUPERAR_SENHA_SCREEN/index';
import PerfilUsuario from './src/app/screen/PERFIL_SCREEN/index';
import Forum from './src/app/screen/FORUM_SCREEN/index';
import TopicoScreen from './src/app/screen/TOPICOS_SCREEN/index';
import ANALITYCS_SCREEN from './src/app/screen/ANALITYCS_SCREEN/index';
import HomeScreen from './src/app/screen/HOME/index';
import DOACAO from './src/app/screen/DOACAO_SCREEN/index';


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

export const navigationRef = createRef();

export default function App() {
  // Solicita permissões ao iniciar o app
  useEffect(() => {
    // bulkFromJSON();
    //converterDataISOparaTimestamp()
    requestNotificationPermissions();
  }, []);
  return (
    <ConnectionProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
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
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Cadastro" component={Cadastro} />
      <AuthStack.Screen name="RecuperarSenha" component={RecuperarSenha} />
    </AuthStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <TabStack.Navigator
      initialRouteName="Home"
      screenOptions={customTabBarStyle}
    >
      <TabStack.Screen
        name="Perfil"
        component={PerfilUsuario}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <TabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <TabStack.Screen 
        name="Explorar" 
        component={ExplorarScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
}

// Stack as telas principais
function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Tabs"
    >
      <MainStack.Screen name="Tabs" component={TabNavigator} />
      <MainStack.Screen name="ConfigurarForum" component={ConfigurarForumScreen} />
      <MainStack.Screen name="Analytics" component={ANALITYCS_SCREEN} />
      <MainStack.Screen name="Forum" component={Forum} />
      <MainStack.Screen name="TopicoScreen" component={TopicoScreen} />
      <MainStack.Screen name="PerfilUsuario" component={PerfilUsuario} />
      <MainStack.Screen name="DOACAO" component={DOACAO} />
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
