import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importa as telas
import Login from "./screen/LOGIN_SCREEN/index";
import Cadastro from "./screen/CADASTRO_SCREEN/index";
import PerfilUsuario from "./screen/PERFIL";
import Forum from "./screen/FORUM_SCREEN";
import TopicoScreen from "./screen/FORUM_SCREEN/Topicos_Screen";

// Criação do Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Forum" 
          component={Forum} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TopicoScreen" 
          component={TopicoScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PerfilUsuario" 
          component={PerfilUsuario} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
