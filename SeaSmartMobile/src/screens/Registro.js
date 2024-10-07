// Registro.js
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/Constantes';
import Constants from 'expo-constants';
// Importar componentes
import Input from '../components/Inputs/Input';
import InputEmail from '../components/Inputs/InputEmail';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import SimpleButton from '../components/Buttons/SimpleButton';
import Back from '../components/Buttons/Back';

export default function SignUp({ navigation }) {
    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDui] = useState('');
    const [telefono_fijo, setTelefono_Fijo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contra, setContra] = useState('');
    const [confirmarContra, setConfirmarContra] = useState('');

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('duiCliente', dui);
            formData.append('telefonoFijo', telefono_fijo);
            formData.append('telefonoMovil', telefono);
            formData.append('claveCliente', contra);
            formData.append('confirmarClave', confirmarContra);

            const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=signUp`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
            console.log(error);
        }
    };

    return (
        <>
            <View style={{ marginTop: 15, backgroundColor: '#F7F5F4', marginLeft: 15 }}>
                <Back
                    navigation={navigation}
                />
            </View>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                    <Text style={styles.texto}>Registrar Usuario</Text>
                    <Input placeHolder='Nombre Cliente' setValor={nombre} setTextChange={setNombre} />
                    <Input placeHolder='Apellido Cliente' setValor={apellido} setTextChange={setApellido} />
                    <InputEmail placeHolder='Email Cliente' setValor={correo} setTextChange={setCorreo} />
                    <MaskedInputDui dui={dui} setDui={setDui} />
                    <MaskedInputTelefono telefono={telefono_fijo} placeholder="Teléfono fijo" setTelefono={setTelefono_Fijo} />
                    <MaskedInputTelefono telefono={telefono} placeholder="Teléfono móvil" setTelefono={setTelefono} />
                    <Input placeHolder='Contraseña' contra={true} setValor={contra} setTextChange={setContra} />
                    <Input placeHolder='Confirmar contraseña' contra={true} setValor={confirmarContra} setTextChange={setConfirmarContra} />
                    <SimpleButton textoBoton='Registrar Usuario' accionBoton={handleCreate} />
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5F4',
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    texto: {
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20
    },
    textRegistrar: {
        color: '#322C2B',
        fontWeight: '700',
        fontSize: 15
    },
    fecha: {
        fontWeight: '600',
        color: '#FFF'
    },
    fechaSeleccionar: {
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: '#A79277',
        color: "#fff",
        fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    }
});