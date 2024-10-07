import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/Constantes'

const CarritoCard = ({ item, accionBotonDetalle, updateDataDetalleCarrito }) => {

    const ip = Constantes.IP;

    const handleDeleteDetalleCarrito = async (idDetalleProducto, idDetallePedido) => {
        try {
            // Mostrar un mensaje de confirmación antes de eliminar
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que deseas eliminar este elemento del carrito?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {
                            const formData = new FormData();
                            formData.append('idDetalleProducto', idDetalleProducto);
                            formData.append('idDetallePedido', idDetallePedido);
                            const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=removeDetail`, {
                                method: 'POST',
                                body: formData
                            });
                            
                            const data = await response.json();
                            
                            if (data.status) {
                                Alert.alert('Producto eliminado correctamente del carrito');
                                // Llamar a la función de actualización para actualizar la lista
                                updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle_producto !== idDetalleProducto));
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
            <TouchableOpacity style={{ borderColor: 'red', borderWidth: 2, borderRadius: 20, width: 35, height: 32, alignSelf: 'flex-end' }}
                onPress={() => handleDeleteDetalleCarrito(item.id_detalle_producto, item.id_detalle_pedido)}
            >
                <Image source={require('../../../assets/menos.png')} style={{ height: 30, width: 30, }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 15 }}>{item.nombre_producto}</Text>
            <Image source={{ uri: ip + '/SeaSmart/api/images/detalles_productos/' + item.imagen_producto }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
            {item.talla_producto != 0 && 
                <Text style={styles.itemText}>Talla: {item.talla_producto}</Text>
            }
            {item.color_producto != 0 && 
                <Text style={styles.itemText}>Color: {item.color_producto}</Text>
            }
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Text style={styles.itemText}>Cantidad: {item.cantidad_producto}</Text>
                <TouchableOpacity
                    onPress={() => accionBotonDetalle(item.id_detalle, item.cantidad_producto)}
                >
                    <Image source={require('../../../assets/editar.png')} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
            </View>
            <Text style={styles.itemText}>Precio: ${item.precio_producto}</Text>
            <Text style={styles.itemText}>SubTotal: ${(parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto)).toFixed(2)}</Text>
        </View>

    );
};

export default CarritoCard;

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
        backgroundColor: '#F2DBDC',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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
