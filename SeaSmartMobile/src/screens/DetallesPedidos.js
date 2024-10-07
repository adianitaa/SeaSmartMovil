import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Constantes from '../utils/Constantes';
import Back from '../components/Buttons/Back';

export default function DetallesPedido({ route }) {
    const { pedidoId } = route.params;
    const ip = Constantes.IP;
    const [pedido, setPedido] = useState([]);
    const navigation = useNavigation();

    const getDetallesPedido = async () => {
        try {
            const formData = new FormData();
            formData.append('idPedido', pedidoId);
            const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=readDetails`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status) {
                setPedido(data.dataset);
            } else {
                console.log("No hay detalle del pedido realizado");
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
        }
    };

    useEffect(() => {
        setPedido([]);
        getDetallesPedido();
    }, []);

    if (!pedido || pedido.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Cargando detalles del pedido...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Back
                navigation={navigation}
            />
            <View style={styles.container2}>
                <Text style={[styles.title, {fontSize: 20}]}>Detalles de su pedido</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {pedido.map((detalle, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.title}>Producto {index + 1}</Text>
                        <Text style={styles.detail}>Nombre: {detalle.nombre_producto}</Text>
                        <Text style={styles.detail}>Cantidad: {detalle.cantidad_producto}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Color de fondo gris claro
        paddingTop: 25,
        paddingHorizontal: 10
    },
    container2: {
        alignItems: 'center', // Centrar horizontalmente
        marginVertical: 10, // Margen arriba y abajo para más separación
    },
    scrollContainer: {
        paddingHorizontal: 10, // Padding horizontal para los lados
        marginTop: -10, // Acerca las tarjetas al título
    },
    card: {
        backgroundColor: '#ffffff', // Color de fondo blanco
        borderRadius: 10, // Bordes redondeados
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000', // Sombra negra
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#92DCF1', // Texto celeste
    },
    detail: {
        fontSize: 16,
        color: '#333333', // Texto gris oscuro
        marginBottom: 5,
    },
    backButton: {
        position: 'absolute',
        top: 25,
        left: 20,
        backgroundColor: '#92DCF1', // Color de fondo del botón
        borderRadius: 25, // Redondeado
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Para que esté por encima de otros elementos
    },
});