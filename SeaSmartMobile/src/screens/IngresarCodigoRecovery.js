import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';
import Back from '../components/Buttons/Back';

export default function IngresarCodigoRecovery({ route, navigation }) {

    const ip = Constantes.IP;
    const [codigo, setCodigo] = useState('');

    const verificarCodigo = () => {

        if (codigo == route.params.codigo) {
            navigation.navigate('RestablecerContraRecovery', {
                id: JSON.stringify(route.params.id)
            });
        } else {
            Alert.alert('El código es incorrecto');
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
                <Text style={{ fontSize: 20, marginRight: 15 }}>Paso 2</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    width: Dimensions.get('window').width / 1.1,
                }}
            />
            <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', marginTop: 150, marginBottom: 5 }}>Ingrese el código de recuperación {'\n'}enviado a su correo</Text>
            <TextInput
                style={styles.input}
                label="Código de recuperación"
                value={codigo}
                onChangeText={setCodigo}
                mode="outlined"
                outlineColor="white"
                theme={{
                    colors: {
                        primary: '#4593EE'
                    }
                }}
            />
            <SimpleButton textoBoton={'Verificar código'} accionBoton={verificarCodigo} />
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