import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './src/screens/Inicio.js'
import Login from './src/screens/Login.js'
import Registro from './src/screens/Registro.js'
import Producto from './src/screens/Producto.js';
import Direcciones from './src/screens/Direcciones.js'
import VerProductos from './src/screens/VerProductos.js';
import TabNavigator from './src/navigation/TabNavigator.js';
import NavStack from './src/navigation/NavStack';
import DetallesPedido from './src/screens/DetallesPedidos.js';
import EnviarCorreoRecovery from './src/screens/EnviarCorreoRecovery.js';
import IngresarCodigoRecovery from './src/screens/IngresarCodigoRecovery.js';
import RestablecerContraRecovery from './src/screens/RestablecerContraRecovery.js';

export default function App() {

  // appIsReady: Variable para indicar si la aplicación ya está lista
  // setAppIsReady: Función para actualizar la variable appIsReady
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect: Hook que, de forma predeterminada, se ejecuta después del primer renderizado 
  // y después de cada actualización
  useEffect(() => {
    // Función asíncrona que simula la inicialización de la aplicación
    async function inicia() {
      try {
        // Retrasar el lanzamiento de la aplicación por 4 segundos
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        // Mostrar error en caso de existir
        console.warn(e);
      } finally {
        // Cambiar valor de la variable para indicar que la aplicación está lista
        setAppIsReady(true);
      }
    }
    // Llamar a la función inicia
    inicia();
  }, []); // El segundo argumento vacío [] asegura que el efecto se ejecute solo una vez después del primer renderizado


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {appIsReady ? (
        // Si la aplicación está lista, muestra el componente stack.
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Direcciones" component={Direcciones} />
          <Stack.Screen name="Productos" component={VerProductos} />
          <Stack.Screen name="Producto" component={Producto} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="DetallePedido" component={DetallesPedido} />
          <Stack.Screen name="EnviarCorreoRecovery" component={EnviarCorreoRecovery} />
          <Stack.Screen name="IngresarCodigoRecovery" component={IngresarCodigoRecovery} />
          <Stack.Screen name="RestablecerContraRecovery" component={RestablecerContraRecovery} />
        </Stack.Navigator>) : 
        // Si la aplicación no está lista, muestra el componente NavStack
        (<NavStack />)}
    </NavigationContainer>
  );
}