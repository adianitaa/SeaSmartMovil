import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/Constantes'

const DireccionCard = ({ item, accionBoton, updateDataDireccion }) => {

    const ip = Constantes.IP;

    const handleDeleteDireccion = async (idDireccion) => {
        try {
            // Mostrar un mensaje de confirmación antes de eliminar
            Alert.alert(
                'Confirmación',
                '¿Está seguro de que desea eliminar la dirección?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {
                            const formData = new FormData();
                            formData.append('idDireccion', idDireccion);
                            const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=deleteRow`, {
                                method: 'POST',
                                body: formData
                            });
                            const data = await response.json();
                            
                            if (data.status) {
                                Alert.alert('Dirección eliminada' , 'Dirección eliminada correctamente');
                                // Llamar a la función de actualización para actualizar la lista
                                updateDataDireccion(prevData => prevData.filter(item => item.id_direccion !== idDireccion));
                            } else {
                                Alert.alert('Error al eliminar del carrito', data.error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert("Ocurrió un error al eliminar del carrito")
        }
    };


    return (
        <View style={styles.itemContainer}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 5, }}>
                <TouchableOpacity
                    onPress={() => accionBoton(item.id_direccion, item.direccion)}
                >
                    <Image source={require('../../../assets/editar.png')} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ borderColor: 'red', backgroundColor: 'red', borderWidth: 2, borderRadius: 20, alignSelf: 'flex-end' }}
                    onPress={() => handleDeleteDireccion(item.id_direccion)}
                >
                    <Image source={require('../../../assets/borrar_icono.png')} style={{ height: 35, width: 35, }} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 15 }}>{item.direccion}</Text>
        </View>

    );
};

export default DireccionCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E', // Brown color for the title
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        gap: 3,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    modifyButton: {
        borderWidth: 1,
        borderColor: '#8F6B58',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#8F6B58', // Light brown color for modify button
        marginVertical: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    finalButton: {
        backgroundColor: '#A0522D', // Sienna color for final action buttons
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    finalButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
