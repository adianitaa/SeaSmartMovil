import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';
import Back from '../components/Buttons/Back';

export default function RestablecerContraRecovery({ route, navigation }) {

    const ip = Constantes.IP;
    const [contra, setContra] = useState('');
    const [confirmarContra, setConfirmarContra] = useState('');

    // Función que permite restablecer la contraseña del usuario.
    const restablecerContra = async () => {
        try {
            if (contra.trim() == '' || confirmarContra.trim() == '') {
                Alert.alert('Asegúrese de rellenar los campos');
            } else if (contra.trim() != confirmarContra.trim()) {
                Alert.alert('Contraseñas diferentes', 'Las contraseñas son distintas');
            } else {
                // Se inicializa la constante dónde se almacenará la contraseña nueva y el id del cliente.
                const formData = new FormData();
                formData.append('idCliente', parseInt(parseInt(route.params.id.replace(/[^0-9]/g, ''))));
                // Se almacenan los valores de los parámetros en la constante.
                formData.append('contraCliente', contra);
                formData.append('confirmarContra', confirmarContra);
                // Se realiza la petición para restablecer la contraseña del cliente.
                const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=restablecerContra`, {
                    method: 'POST',
                    body: formData
                });

                // Se almacena la respuesta en la constante en formato JSON.
                const data = await response.json();
                console.log(parseInt(route.params.id.replace(/[^0-9]/g, '')));
                // Si la respuesta es satisfactoria se ejecuta el código.
                if (data.status) {
                    // Se muestra el mensaje y se retorna al inicio de sesión.
                    Alert.alert('Contraseña restablecida correctamente');
                    navigation.navigate('Login');
                }
                // Si la respuesta no es satisfactoria se ejecuta el código.
                else {
                    // Se muestra el mensaje en consola.
                    console.log("No se pudo restablecer la contraseña")
                }
            }
        } catch (error) {
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 15, marginLeft: 15, alignSelf: 'flex-start' }}>
                <Back
                    navigation={navigation}
                />
            </View>
            <View style={{ alignSelf: 'flex-start', marginLeft: 15, flexDirection: 'row', justifyContent: '' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>Recuperación de contraseña</Text>
                <Text style={{ fontSize: 20, marginRight: 15 }}>Paso 3</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    width: Dimensions.get('window').width / 1.1,
                }}
            />
            <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', marginTop: 150, marginBottom: 5 }}>Ingrese su nueva contraseña</Text>
            <TextInput
                style={styles.input}
                label="Nueva contraseña"
                value={contra}
                onChangeText={setContra}
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
                label="Confirmar contraseña"
                value={confirmarContra}
                onChangeText={setConfirmarContra}
                mode="outlined"
                outlineColor="white"
                theme={{
                    colors: {
                        primary: '#4593EE'
                    }
                }}
            />
            <SimpleButton textoBoton={'Restablecer contraseña'} accionBoton={restablecerContra} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5F4',
        alignItems: 'center',
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
        marginBottom: 5
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