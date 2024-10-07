import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';

export default function Login({ navigation }) {

  const ip = Constantes.IP;
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [sesion, setSesion] = useState(false);

  // La acción useFocusEffect se ejecuta una vez que la pantalla se ha terminado de cargar (Similar a useEffect).
  useFocusEffect(
    // La función useCallBack ejecuta el código dentro de ella cada vez que se termina de cargar la pantalla.
    React.useCallback(() => {
      // Llamada a la función para validar la sesión del usuario.
      validarSesion();
    }, [])
  );

  // Función que permite validar la sesión del usuario.
  const validarSesion = async () => {
    try {
      // Se realiza la petición a la API para verificar si el usuario tiene una sesión iniciada.
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=validarSesion`, {
        method: 'GET'
      });

      // Se almacena la respuesta en formato json en la constante.
      const data = await response.json();

      // Si la respuesta es satisfactoria se ejecuta el código.
      if (data.status) {
        // Se actualiza el estado de la sesión.
        setSesion(true);
        // Se redirige hacia la pantalla de inicio.
        navigation.navigate('TabNavigator');
      } else {
        setSesion(false);
      }
    } catch (error) {
    }
  }

  // Función que permite inicar la sesión de un usuario.
  const handlerLogin = async () => {
    try {
      if (!sesion) {
        // Se inicializa la variable donde se almacenarán las credenciales del usuario.
        const formData = new FormData();
        // Se almacena el correo en la constante.
        formData.append('correo', correo);
        // Se almacena la contraseña en la constante.
        formData.append('contra', contra);

        // Se realiza la petición a la API.
        const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logIn`, {
          method: 'POST',
          body: formData
        });

        // Se almacena en la constante la respuesta en formato json.
        const data = await response.json();

        // Si la respuesta es satisfactoria se ejecuta el código.
        if (data.status) {
          // Se vacían los campos.
          setContra('');
          setCorreo('');
          // Se redirige hacia la pantalla de inicio.
          navigation.navigate('TabNavigator', { message: 'Inicio de sesión exitoso' });
        } else if (data.error == 'Acción no disponible dentro de la sesión') {
          navigation.navigate('TabNavigator');
        } else {
          Alert.alert('Error de sesión', data.error);
        }
      } else {
        console.log(sesion);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  // Función que permite redirigir al usuario hacia la pantalla de registro.
  const irRegistrar = () => {
    navigation.navigate('Registro');
  };

  // Función que permite redirigir al usuario hacia el apartado de recuperación de contraseña.
  const irRecuperar = () => {
    navigation.navigate('EnviarCorreoRecovery');
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 250, width: 250 }}
        source={require('../../assets/icon1.png')}
      />
      <Text style={{ fontSize: 25, fontWeight: '600' }}>Inicia Sesión</Text>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>para poder ingresar</Text>
      <TextInput
        style={styles.input}
        label="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        mode="outlined"
        outlineColor="white"
        theme={{
          colors: {
            primary: '#4593EE'
          }
        }}
      />
      <TextInput
        style={styles.input}
        label="Contraseña"
        value={contra}
        onChangeText={setContra}
        secureTextEntry
        mode="outlined"
        outlineColor="white"
        theme={{
          colors: {
            primary: '#4593EE'
          }
        }}
      />
      <SimpleButton textoBoton={'Iniciar Sesión'} accionBoton={handlerLogin} />

      <TouchableOpacity onPress={irRegistrar} style={{ marginTop: 40 }}>
        <Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: Dimensions.get('window').width / 1.5,
        }}
      />
      <TouchableOpacity onPress={irRecuperar}>
        <Text style={styles.textRegistrar}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  textRegistrar: {
    color: '#322C2B',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10
  },
  input: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#3E88DE',
  },
  textoBoton: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});