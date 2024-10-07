import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import SimpleButton from '../components/Buttons/SimpleButton';
import * as Constantes from '../utils/Constantes';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputEmail from '../components/Inputs/InputEmail';
import Input from '../components/Inputs/Input';

export default function Perfil({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefono_fijo, setTelefono_Fijo] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const ip = Constantes.IP;

  // Función que permite cerrar la sesión de un cliente.
  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  // Función que permite obtener la información del cliente por medio de una consulta.
  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=readProfile`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.status) {
        let nombre = data.dataset.nombre_cliente;
        let apellido = data.dataset.apellido_cliente;

        // Capitalizar nombres
        let nombreArray = nombre.split(" ");
        let nombreCapitalizado = "";
        for (var i = 0; i < nombreArray.length; i++) {
          nombreCapitalizado += " " + nombreArray[i].charAt(0).toUpperCase() + nombreArray[i].substring(1);
        }

        // Capitalizar apellidos
        let apellidoArray = apellido.split(" ");
        let apellidoCapitalizado = "";
        for (var i = 0; i < apellidoArray.length; i++) {
          apellidoCapitalizado += " " + apellidoArray[i].charAt(0).toUpperCase() + apellidoArray[i].substring(1);
        }

        setNombre(nombreCapitalizado.trim());
        setApellido(apellidoCapitalizado.trim());
        setCorreo(data.dataset.correo_cliente);
        setDui(data.dataset.dui_cliente);
        setTelefono(data.dataset.telefono_movil);
        setTelefono_Fijo(data.dataset.telefono_fijo);
        setIdCliente(data.dataset.id_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', error.toString());
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('idCliente', idCliente);
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('correoCliente', correo);
      formData.append('duiCliente', dui);
      formData.append('telefonoCliente', telefono);
      formData.append('telefonoFijoCliente', telefono_fijo);
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=editProfile`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil, reiniciar');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.subtitle}>En este apartado podrás editar tu perfil</Text>

      <View style={styles.inputContainer}>
        <Input
          placeHolder={'Nombre'}
          setValor={nombre}
          setTextChange={setNombre}
          contra={false}
          boolean={1}
          isEditing={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeHolder={'Apellido'}
          setValor={apellido}
          setTextChange={setApellido}
          contra={false}
          boolean={1}
          isEditing={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <InputEmail
          placeHolder={'Correo'}
          setValor={correo}
          setTextChange={setCorreo}
          boolean={1}
          isEditing={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaskedInputDui
          dui={dui}
          setDui={setDui}
          boolean={1}
          isEditing={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaskedInputTelefono
          telefono={telefono}
          setTelefono={setTelefono}
          boolean={1}
          isEditing={isEditing}
          placeholder={'Teléfono móvil'}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaskedInputTelefono
          telefono={telefono_fijo}
          setTelefono={setTelefono_Fijo}
          boolean={1}
          isEditing={isEditing}
          placeholder={'Teléfono fijo'}
        />
      </View>

      {isEditing ? (
        <SimpleButton
        textoBoton='Guardar cambios'
        accionBoton={handleSaveChanges}
      />
      ) : (
        <SimpleButton
        textoBoton='Editar perfil'
        accionBoton={handleEditToggle}
        colorBoton={'#28a745'}
      />
      )}

      <SimpleButton
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
        colorBoton={'#d9543f'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5F4',
    padding: 20,
    alignItems: 'center',
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});
