import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// Importa tus componentes de pantalla aquí
import Inicio from '../screens/Inicio';
import Carrito from '../screens/Carrito';
import Pedidos from '../screens/Pedidos';
import Perfil from '../screens/Perfil';
const Tab = createBottomTabNavigator();

const TabNavigator = ( navigation ) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header
        tabBarActiveTintColor: '#0D3EED', // Color de los íconos activos
        tabBarInactiveTintColor: '#A4A3A3', // Color de los íconos inactivos
        tabBarStyle: { backgroundColor: '#F7F5F4', height: 60, borderTopWidth: 0 },
        tabBarLabelStyle: {fontSize: 15}, // Estilo de la barra de pestañas
        tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Mi carrito') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Mis pedidos') {
            iconName = focused ? 'truck' : 'truck';
          } else if (route.name === 'Mi perfil') {
            iconName = focused ? 'user' : 'user';
          }
          return <Feather name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Mi carrito"
        component={Carrito}
        options={{ title: 'Mi carrito' }}
      />
      <Tab.Screen
        name="Mis pedidos"
        component={Pedidos}
        options={{ title: 'Mis pedidos' }}
      />
      <Tab.Screen
        name="Mi perfil"
        component={Perfil}
        options={{ title: 'Mi perfil' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
