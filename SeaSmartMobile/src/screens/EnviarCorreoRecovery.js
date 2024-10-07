import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';
import Back from '../components/Buttons/Back';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';

export default function EnviarCorreoRecovery({ navigation }) {

    const ip = Constantes.IP;
    const [correo, setCorreo] = useState('');

    // Función que permite validar la sesión del usuario.
    const enviarCorreo = async () => {
        try {
            // Se verifica que el campo no esté vacío.
            if (correo.trim() == "") {
                Alert.alert('Ingrese un correo electrónico');
            } else {
                // Se inicializa la variable donde se almacenará el correo del usuario.
                const formData = new FormData();
                // Se almacena el correo del usuario en la constante.
                formData.append('correoCliente', correo);
                // Se realiza la petición a la API para verificar el correo del usuario.
                const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=verificarCorreo`, {
                    method: 'POST',
                    body: formData
                });

                // Se almacena la respuesta en formato json en la constante.
                const data = await response.json();

                // Si la respuesta es satisfactoria se ejecuta el código.
                if (data.status) {
                    // irIngresarCodigo(data.dataset.id_cliente, data.dataset.nombre_cliente, data.dataset.apellido_cliente, data.dataset.correo_cliente);
                    // Variable donde se almacenará el id.
                    let resultado = '';
                    // Se definen los caracteres que se utilizarán en el id.
                    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    // Se almacena la longitud de la cadena de caracteres en el string.
                    const longitudCaracteres = caracteres.length;
                    // Se inicializa la variable.
                    let contador = 0;
                    // Se realiza una iteración para obtener un nuevo caracter por cada iteración.
                    while (contador < 10) {
                        // Se almacena el caracter random en la variable.
                        resultado += caracteres.charAt(Math.floor(Math.random() * longitudCaracteres));
                        contador += 1;
                    }

                    let nombres = JSON.stringify(data.dataset.nombre_cliente);

                    let apellidos = JSON.stringify(data.dataset.apellido_cliente);

                    let nombreArray = nombres.split(" ");

                    let apellidoArray = apellidos.split(" ");

                    let nombreCapitalizado = "";

                    let apellidoCapitalizado = "";

                    for (var i = 0; i < nombreArray.length; i++) {

                        nombreCapitalizado += " " + nombreArray[i].charAt(0).toUpperCase() + nombreArray[i].substring(1);
                    }

                    for (var i = 0; i < apellidoArray.length; i++) {

                        apellidoCapitalizado += " " + apellidoArray[i].charAt(0).toUpperCase() + apellidoArray[i].substring(1);
                    }

                    let params = {
                        correo: data.dataset.correo_cliente,
                        code: resultado,
                        to_name: nombreCapitalizado + " " + apellidoCapitalizado
                    }

                    const response = await send('service_vzkz32o', 'template_9ew81bd', params, { publicKey: "3qr6YQfs6w83ANZna" }).then(Alert.alert("Código de recuperación enviado", "Revise su bandeja de entrada"));

                    if(response.text == 'OK'){
                        
                        navigation.navigate('IngresarCodigoRecovery', {
                            id: data.dataset.id_cliente,
                            codigo: resultado
                        });
                    } else{
                        Alert.alert('No se pudo enviar el correo, inténtelo de nuevo más tarde');
                    }
                } else {
                    Alert.alert('Correo incorrecto', 'No se encontró una cuenta vinculada con el correo ingresado');
                }
            }
        } catch (error) {
            console.log(error);
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
                <Text style={{ fontSize: 20, marginRight: 15 }}>Paso 1</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    width: Dimensions.get('window').width / 1.1,
                }}
            />
            <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', marginTop: 150 }}>Ingrese el correo electrónico{'\n'} afiliado a su cuenta</Text>
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
            <SimpleButton textoBoton={'Verificar correo'} accionBoton={enviarCorreo} />
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